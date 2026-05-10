// Wavey Audio Navigator advanced speed and pitch controls.
function canUseAdvancedSoundControls() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  return Boolean(AudioContextClass && window.AudioWorkletNode);
}

async function ensureAdvancedSoundNode() {
  if (!state.audioContext || !state.gainNode) {
    return null;
  }

  if (!canUseAdvancedSoundControls() || !state.audioContext.audioWorklet) {
    state.soundTouchStatus = "unsupported";
    syncAdvancedSoundUi();
    return null;
  }

  if (state.soundTouchNode) {
    updateAdvancedSoundNodeParameters();
    return state.soundTouchNode;
  }

  if (state.soundTouchStatus === "failed" || state.soundTouchStatus === "unsupported") {
    return null;
  }

  try {
    state.soundTouchStatus = "loading";
    syncAdvancedSoundUi();
    if (!state.soundTouchModulePromise) {
      state.soundTouchModulePromise = state.audioContext.audioWorklet.addModule(SOUNDTOUCH_PROCESSOR_URL);
    }
    await state.soundTouchModulePromise;

    const node = new AudioWorkletNode(state.audioContext, SOUNDTOUCH_PROCESSOR_NAME, {
      numberOfInputs: 1,
      numberOfOutputs: 1,
      outputChannelCount: [2],
    });
    node.connect(state.gainNode);
    state.soundTouchNode = node;
    state.soundTouchStatus = "ready";
    updateAdvancedSoundNodeParameters();
    reroutePlaybackSourcesToAdvancedSound();
    syncAdvancedSoundUi();
    return node;
  } catch (error) {
    console.warn("Advanced sound controls are unavailable.", error);
    state.soundTouchError = error?.message || "SoundTouch AudioWorklet failed to load.";
    state.soundTouchStatus = "failed";
    state.soundTouchNode = null;
    syncMediaElementPitchHandling();
    syncAdvancedSoundUi();
    return null;
  }
}

function reroutePlaybackSourcesToAdvancedSound() {
  if (!state.soundTouchNode) {
    return;
  }

  [state.audioSource, state.mediaElementSource].forEach((source) => {
    if (!source) {
      return;
    }
    try {
      source.disconnect();
      source.connect(state.soundTouchNode);
    } catch (error) {
      // A source may already be stopped or detached while the worklet finishes loading.
    }
  });
}

function updateAdvancedSoundNodeParameters() {
  const node = state.soundTouchNode;
  if (!node || !state.audioContext) {
    syncMediaElementPitchHandling();
    syncAdvancedSoundUi();
    return;
  }

  const now = state.audioContext.currentTime;
  setAudioParamValue(node.parameters.get("pitch"), 1, now);
  setAudioParamValue(node.parameters.get("tempo"), 1, now);
  setAudioParamValue(node.parameters.get("rate"), 1, now);
  setAudioParamValue(node.parameters.get("playbackRate"), state.playbackRate, now);
  setAudioParamValue(node.parameters.get("pitchSemitones"), state.pitchSemitones, now);
  syncMediaElementPitchHandling();
  syncAdvancedSoundUi();
}

function setAudioParamValue(param, value, now) {
  if (!param) {
    return;
  }
  if (typeof param.setTargetAtTime === "function") {
    param.setTargetAtTime(value, now, 0.01);
  } else {
    param.value = value;
  }
}

function syncMediaElementPitchHandling() {
  if (!state.mediaElement) {
    return;
  }

  const useSoundTouch = Boolean(state.soundTouchNode);
  state.mediaElement.preservesPitch = !useSoundTouch;
  state.mediaElement.mozPreservesPitch = !useSoundTouch;
  state.mediaElement.webkitPreservesPitch = !useSoundTouch;
}

function openAdvancedSoundPanel() {
  if (!canUseAdvancedSoundControls()) {
    return;
  }

  state.advancedSoundOpen = true;
  state.advancedSoundMinimized = false;
  syncAdvancedSoundUi();
  positionAdvancedSoundPanel();
  ensureAudioGraph().catch(() => {
    state.soundTouchStatus = "failed";
    syncAdvancedSoundUi();
  });
}

function closeAdvancedSoundPanel() {
  state.advancedSoundOpen = false;
  state.advancedSoundMinimized = false;
  syncAdvancedSoundUi();
}

function minimizeAdvancedSoundPanel() {
  state.advancedSoundOpen = true;
  state.advancedSoundMinimized = true;
  syncAdvancedSoundUi();
  positionAdvancedSoundChip();
}

function restoreAdvancedSoundPanel() {
  state.advancedSoundOpen = true;
  state.advancedSoundMinimized = false;
  syncAdvancedSoundUi();
  positionAdvancedSoundPanel();
}

function resetAdvancedSoundControls() {
  setPlaybackSpeed(1);
  setPitchSemitones(0);
}

function setPitchSemitones(value, { ensureNode = true } = {}) {
  state.pitchSemitones = Math.round(clampNumber(value, PITCH_MIN_SEMITONES, PITCH_MAX_SEMITONES));
  updateAdvancedSoundNodeParameters();
  if (ensureNode && !state.soundTouchNode) {
    ensureAdvancedSoundNode().catch(() => {});
  }
}

function syncAdvancedSoundUi() {
  if (!advancedSoundButton) {
    return;
  }

  const canUse = canUseAdvancedSoundControls();
  const failed = state.soundTouchStatus === "failed" || state.soundTouchStatus === "unsupported";
  const loading = state.soundTouchStatus === "loading";
  const controlsAvailable = canUse && !failed;
  const speedText = `${state.playbackRate.toFixed(2)}x`;
  const pitchText = `${state.pitchSemitones > 0 ? "+" : ""}${state.pitchSemitones} st`;

  advancedSoundButton.classList.toggle("is-hidden", !canUse);
  advancedSoundButton.disabled = loading;
  advancedSoundPanel.classList.toggle("is-hidden", !state.advancedSoundOpen || state.advancedSoundMinimized);
  advancedSoundChip.classList.toggle("is-hidden", !state.advancedSoundOpen || !state.advancedSoundMinimized);
  advancedSoundPanel.classList.toggle("is-unsupported", failed);
  advancedSoundPad.classList.toggle("is-disabled", !controlsAvailable);
  advancedSoundDot.disabled = !controlsAvailable;
  advancedSoundUnsupported.classList.toggle("is-hidden", controlsAvailable);
  advancedSpeedValue.textContent = speedText;
  advancedPitchValue.textContent = pitchText;
  advancedSoundChipValue.textContent = `${speedText} / ${pitchText}`;
  advancedSoundDot.style.left = `${getAdvancedSpeedRatio() * 100}%`;
  advancedSoundDot.style.top = `${getAdvancedPitchRatio() * 100}%`;
  advancedSoundDot.setAttribute("aria-valuetext", `${speedText}, ${pitchText}`);
}

function getAdvancedSpeedRatio() {
  const min = Number(speedSlider.min);
  const max = Number(speedSlider.max);
  return (state.playbackRate - min) / (max - min);
}

function getAdvancedPitchRatio() {
  return (PITCH_MAX_SEMITONES - state.pitchSemitones) / (PITCH_MAX_SEMITONES - PITCH_MIN_SEMITONES);
}

function positionAdvancedSoundPanel() {
  if (advancedSoundPanel.classList.contains("is-hidden")) {
    return;
  }

  requestAnimationFrame(() => {
    const bounds = getAdvancedSoundBounds();
    const panelWidth = advancedSoundPanel.offsetWidth || 236;
    const panelHeight = advancedSoundPanel.offsetHeight || 236;
    const fallbackX = bounds.width - panelWidth - 14;
    const fallbackY = Math.min(96, bounds.height - panelHeight - 14);
    state.advancedSoundPanelX = clampNumber(state.advancedSoundPanelX ?? fallbackX, 12, Math.max(12, bounds.width - panelWidth - 12));
    state.advancedSoundPanelY = clampNumber(state.advancedSoundPanelY ?? fallbackY, 12, Math.max(12, bounds.height - panelHeight - 12));
    advancedSoundPanel.style.left = `${state.advancedSoundPanelX}px`;
    advancedSoundPanel.style.top = `${state.advancedSoundPanelY}px`;
  });
}

function positionAdvancedSoundChip() {
  if (advancedSoundChip.classList.contains("is-hidden")) {
    return;
  }

  requestAnimationFrame(() => {
    const bounds = getAdvancedSoundBounds();
    const chipWidth = advancedSoundChip.offsetWidth || 136;
    const chipHeight = advancedSoundChip.offsetHeight || 36;
    const x = Math.max(12, bounds.width - chipWidth - 14);
    const y = Math.max(12, bounds.height - chipHeight - 14);
    advancedSoundChip.style.left = `${x}px`;
    advancedSoundChip.style.top = `${y}px`;
  });
}

function constrainAdvancedSoundUi() {
  if (state.advancedSoundOpen && !state.advancedSoundMinimized) {
    positionAdvancedSoundPanel();
  } else if (state.advancedSoundOpen) {
    positionAdvancedSoundChip();
  }
}

function getAdvancedSoundBounds() {
  return {
    width: Math.max(1, playerPanel.clientWidth),
    height: Math.max(1, playerPanel.clientHeight),
  };
}

function beginAdvancedSoundPanelDrag(event) {
  if (event.button !== 0 || event.target.closest("button")) {
    return;
  }

  event.preventDefault();
  advancedSoundHandle.setPointerCapture(event.pointerId);
  state.advancedSoundDrag = {
    pointerId: event.pointerId,
    startX: event.clientX,
    startY: event.clientY,
    originX: state.advancedSoundPanelX || advancedSoundPanel.offsetLeft,
    originY: state.advancedSoundPanelY || advancedSoundPanel.offsetTop,
  };
}

function moveAdvancedSoundPanel(event) {
  const drag = state.advancedSoundDrag;
  if (!drag || drag.pointerId !== event.pointerId) {
    return;
  }

  const bounds = getAdvancedSoundBounds();
  const panelWidth = advancedSoundPanel.offsetWidth || 236;
  const panelHeight = advancedSoundPanel.offsetHeight || 236;
  state.advancedSoundPanelX = clampNumber(drag.originX + event.clientX - drag.startX, 12, Math.max(12, bounds.width - panelWidth - 12));
  state.advancedSoundPanelY = clampNumber(drag.originY + event.clientY - drag.startY, 12, Math.max(12, bounds.height - panelHeight - 12));
  advancedSoundPanel.style.left = `${state.advancedSoundPanelX}px`;
  advancedSoundPanel.style.top = `${state.advancedSoundPanelY}px`;
}

function endAdvancedSoundPanelDrag(event) {
  if (state.advancedSoundDrag?.pointerId === event.pointerId) {
    state.advancedSoundDrag = null;
  }
}

function beginAdvancedSoundPadDrag(event) {
  if (advancedSoundPad.classList.contains("is-disabled")) {
    return;
  }

  event.preventDefault();
  advancedSoundPad.setPointerCapture(event.pointerId);
  state.advancedSoundPadDrag = true;
  updateAdvancedSoundFromPad(event);
}

function moveAdvancedSoundPad(event) {
  if (state.advancedSoundPadDrag) {
    updateAdvancedSoundFromPad(event);
  }
}

function endAdvancedSoundPadDrag() {
  state.advancedSoundPadDrag = false;
}

function updateAdvancedSoundFromPad(event) {
  const rect = advancedSoundPad.getBoundingClientRect();
  const xRatio = clampNumber((event.clientX - rect.left) / rect.width, 0, 1);
  const yRatio = clampNumber((event.clientY - rect.top) / rect.height, 0, 1);
  const minSpeed = Number(speedSlider.min);
  const maxSpeed = Number(speedSlider.max);
  const speedStep = Number(speedSlider.step || 0.25);
  const speed = roundToStep(minSpeed + (maxSpeed - minSpeed) * xRatio, speedStep);
  const pitch = Math.round(PITCH_MAX_SEMITONES - (PITCH_MAX_SEMITONES - PITCH_MIN_SEMITONES) * yRatio);

  setPlaybackSpeed(speed);
  setPitchSemitones(pitch);
}

function roundToStep(value, step) {
  if (!step) {
    return value;
  }
  return Number((Math.round(value / step) * step).toFixed(2));
}

function handleAdvancedSoundDotKeydown(event) {
  if (advancedSoundPad.classList.contains("is-disabled")) {
    return;
  }

  const speedStep = Number(speedSlider.step || 0.25);
  if (event.key === "ArrowLeft") {
    event.preventDefault();
    setPlaybackSpeed(state.playbackRate - speedStep);
  } else if (event.key === "ArrowRight") {
    event.preventDefault();
    setPlaybackSpeed(state.playbackRate + speedStep);
  } else if (event.key === "ArrowUp") {
    event.preventDefault();
    setPitchSemitones(state.pitchSemitones + 1);
  } else if (event.key === "ArrowDown") {
    event.preventDefault();
    setPitchSemitones(state.pitchSemitones - 1);
  } else if (event.key === "Home") {
    event.preventDefault();
    resetAdvancedSoundControls();
  }
}
