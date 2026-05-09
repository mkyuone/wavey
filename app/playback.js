// AudioNavigator playback, seeking, and transport controls.
function seekToNextAudio() {
  const current = getCurrentTime();
  const currentRegion = state.regions.find((item) => item.start <= current && item.end >= current);
  const targetTime = currentRegion ? currentRegion.end + SEEK_EPSILON : current + SEEK_EPSILON;
  const region = state.regions.find((item) => item.start > targetTime);
  if (region) {
    setCurrentTime(region.start);
  }
}

async function togglePlayback() {
  if (!hasLoadedMedia()) {
    return;
  }

  if (state.isPlaying) {
    pausePlayback();
  } else {
    await startPlayback();
  }
}

function handleKeyboardControls(event) {
  if (event.defaultPrevented || isSettingsOpen() || !hasLoadedMedia()) {
    return;
  }

  if (event.code === "Space") {
    if (shouldIgnorePlaybackShortcut(event.target)) {
      return;
    }

    event.preventDefault();
    togglePlayback();
    return;
  }

  if (shouldIgnoreShortcut(event.target)) {
    return;
  }

  if (event.key === "ArrowLeft") {
    event.preventDefault();
    seekBy(-state.jumpAmount);
    return;
  }

  if (event.key === "ArrowRight") {
    event.preventDefault();
    seekBy(state.jumpAmount);
    return;
  }

  if (event.key === "ArrowDown") {
    event.preventDefault();
    seekToNextAudio();
  }
}

function shouldIgnorePlaybackShortcut(target) {
  return Boolean(target?.closest("input:not([type='range']), select, textarea, [contenteditable='true']"));
}

function shouldIgnoreShortcut(target) {
  return Boolean(target?.closest("input, select, textarea, button, [contenteditable='true']"));
}

function seekFromPointer(event) {
  const rect = canvas.getBoundingClientRect();
  const ratio = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
  setCurrentTime(ratio * getAnalysisDuration());
}

function seekBy(seconds) {
  if (!getMediaDuration()) {
    return;
  }
  setCurrentTime(getCurrentTime() + seconds);
}

function setCurrentTime(seconds) {
  if (!getMediaDuration()) {
    return;
  }

  hideWaveformSeekHint();
  const duration = getMediaDuration();
  const wasPlaying = state.isPlaying;
  state.playbackOffset = clampTime(seconds, duration);
  if (wasPlaying) {
    restartPlaybackAtCurrentTime();
  }
  updateTimeUi();
  drawWaveform();
}

function updateTimeUi() {
  const duration = getMediaDuration();
  const current = getCurrentTime();
  const currentText = formatTime(current);
  const durationLabel = formatTime(duration);
  const timelineValue = duration ? String(Math.round((current / duration) * 1000)) : "0";

  if (state.lastCurrentTimeText !== currentText) {
    currentTime.textContent = currentText;
    state.lastCurrentTimeText = currentText;
  }

  if (state.lastDurationText !== durationLabel) {
    durationText.textContent = durationLabel;
    state.lastDurationText = durationLabel;
  }

  if (state.lastTimelineValue !== timelineValue) {
    timeline.value = timelineValue;
    updateRangeFill(timeline);
    state.lastTimelineValue = timelineValue;
  }
}

function getAnalysisDuration() {
  return getFiniteDuration(state.analysisDuration) || state.audioBuffer?.duration || 0;
}

function getMediaDuration() {
  return getFiniteDuration(state.mediaDuration) || getAnalysisDuration();
}

function clampTime(seconds, duration) {
  return Math.min(Math.max(seconds || 0, 0), duration);
}

function clampNumber(value, min, max) {
  if (!Number.isFinite(value)) {
    return min;
  }
  return Math.min(Math.max(value, min), max);
}

function getFiniteDuration(duration) {
  return Number.isFinite(duration) && duration > 0 ? duration : 0;
}

async function ensureAudioGraph() {
  if (!state.audioContext) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    state.audioContext = new AudioContextClass();
    state.gainNode = state.audioContext.createGain();
    state.boostShaperNode = state.audioContext.createWaveShaper();
    state.limiterNode = state.audioContext.createDynamicsCompressor();
    state.limiterNode.threshold.value = -1;
    state.limiterNode.knee.value = 0;
    state.limiterNode.ratio.value = 20;
    state.limiterNode.attack.value = 0.003;
    state.limiterNode.release.value = 0.12;
    state.boostShaperNode.curve = createBoostCurve(1);
    state.boostShaperNode.oversample = "2x";
    state.gainNode.connect(state.boostShaperNode);
    state.boostShaperNode.connect(state.limiterNode);
    state.limiterNode.connect(state.audioContext.destination);
  }

  if (state.audioContext.state === "suspended") {
    await state.audioContext.resume();
  }

  updateOutputGain();
}

async function ensureMediaElementAudioGraph() {
  if (!state.mediaElement) {
    return false;
  }

  await ensureAudioGraph();
  if (!state.mediaElementSource) {
    state.mediaElementSource = state.audioContext.createMediaElementSource(state.mediaElement);
    state.mediaElementSource.connect(state.gainNode);
  }
  state.mediaElement.volume = 1;
  updateOutputGain();
  return true;
}

async function startPlayback() {
  if (!hasLoadedMedia()) {
    return;
  }

  if (state.playbackOffset >= getMediaDuration() - SEEK_EPSILON) {
    state.playbackOffset = 0;
  }

  if (usesMediaElementPlayback()) {
    if (!await startMediaElement()) {
      return;
    }
  } else {
    await ensureAudioGraph();
    if (!startAudioSource()) {
      return;
    }
  }

  if (!hasLoadedMedia()) {
    return;
  }

  state.isPlaying = true;
  setPlayButton(true);
  startDrawingLoop();
}

function pausePlayback() {
  if (!state.isPlaying) {
    return;
  }

  state.playbackOffset = getCurrentTime();
  state.isPlaying = false;
  stopActivePlaybackSource();
  setPlayButton(false);
  cancelAnimationFrame(state.animationFrame);
  updateTimeUi();
  drawWaveform();
}

function stopPlayback() {
  state.isPlaying = false;
  state.playbackOffset = 0;
  stopActivePlaybackSource();
  setPlayButton(false);
  cancelAnimationFrame(state.animationFrame);
}

function restartPlaybackAtCurrentTime() {
  if (state.playbackOffset >= getMediaDuration() - SEEK_EPSILON) {
    finishPlayback();
    return;
  }

  if (usesMediaElementPlayback()) {
    setMediaElementCurrentTime(state.playbackOffset);
    state.mediaElement.play().catch(() => {
      state.isPlaying = false;
      setPlayButton(false);
      cancelAnimationFrame(state.animationFrame);
    });
  } else {
    stopAudioSource();
    startAudioSource();
  }
}

function startAudioSource() {
  if (!state.audioContext || !state.audioBuffer || !state.gainNode) {
    return false;
  }

  const duration = getMediaDuration();
  const offset = clampTime(state.playbackOffset, duration);
  if (offset >= duration) {
    finishPlayback();
    return false;
  }

  const source = state.audioContext.createBufferSource();
  source.buffer = state.audioBuffer;
  source.playbackRate.value = state.playbackRate;
  source.connect(state.gainNode);
  source.addEventListener("ended", () => {
    if (state.audioSource !== source || !state.isPlaying) {
      return;
    }

    finishPlayback();
  });

  state.audioSource = source;
  state.playbackOffset = offset;
  state.playbackStartedAt = state.audioContext.currentTime;
  source.start(0, offset);
  return true;
}

function stopAudioSource() {
  if (!state.audioSource) {
    return;
  }

  const source = state.audioSource;
  state.audioSource = null;
  source.disconnect();
  try {
    source.stop();
  } catch (error) {
    // Already stopped sources can throw in some browsers.
  }
}

function stopActivePlaybackSource() {
  if (usesMediaElementPlayback()) {
    stopMediaElement();
  } else {
    stopAudioSource();
  }
}

function finishPlayback() {
  state.isPlaying = false;
  stopActivePlaybackSource();
  state.playbackOffset = getMediaDuration();
  setPlayButton(false);
  cancelAnimationFrame(state.animationFrame);
  updateTimeUi();
  drawWaveform();
}

function getCurrentTime() {
  const duration = getMediaDuration();
  if (usesMediaElementPlayback()) {
    if (!state.isPlaying) {
      return clampTime(state.playbackOffset, duration);
    }
    return clampTime(state.mediaElement?.currentTime || state.playbackOffset, duration);
  }

  if (!state.isPlaying || !state.audioContext) {
    return clampTime(state.playbackOffset, duration);
  }

  const elapsed = (state.audioContext.currentTime - state.playbackStartedAt) * state.playbackRate;
  return clampTime(state.playbackOffset + elapsed, duration);
}

function updateOutputGain() {
  const volume = Number(volumeSlider.value);
  const volumeGain = volume / 100;

  volumeValue.textContent = `${volume}%`;
  updateVolumeIcon(volume);
  updateRangeFill(volumeSlider);

  if (state.gainNode) {
    state.gainNode.gain.setTargetAtTime(volumeGain, state.audioContext.currentTime, 0.01);
    updateBoostCurve(volumeGain);
    updateBoostLimiter(volumeGain);
  }
  if (state.mediaElement) {
    state.mediaElement.volume = state.mediaElementSource ? 1 : clampNumber(volumeGain, 0, 1);
  }
}

function updateVolumeIcon(volume) {
  if (!volumeIcon) {
    return;
  }

  if (volume <= 0) {
    volumeIcon.textContent = "volume_off";
  } else if (volume < 40) {
    volumeIcon.textContent = "volume_mute";
  } else {
    volumeIcon.textContent = "volume_up";
  }
  volumeIcon.toggleAttribute("data-volume-boosted", volume > 100);
}

function updateBoostCurve(volumeGain) {
  if (!state.boostShaperNode) {
    return;
  }

  const boostKey = volumeGain > 1 ? `boost-${Math.round(volumeGain * 100)}` : "linear";
  if (state.boostCurveKey === boostKey) {
    return;
  }

  state.boostShaperNode.curve = createBoostCurve(volumeGain);
  state.boostCurveKey = boostKey;
}

function updateBoostLimiter(volumeGain) {
  if (!state.limiterNode || !state.audioContext) {
    return;
  }

  const now = state.audioContext.currentTime;
  const isBoosted = volumeGain > 1;
  state.limiterNode.threshold.setTargetAtTime(isBoosted ? -3 : -1, now, 0.01);
  state.limiterNode.knee.setTargetAtTime(isBoosted ? 14 : 0, now, 0.01);
  state.limiterNode.ratio.setTargetAtTime(isBoosted ? 6 : 20, now, 0.01);
}

function createBoostCurve(volumeGain) {
  const sampleCount = 2048;
  const curve = new Float32Array(sampleCount);
  if (volumeGain <= 1) {
    for (let index = 0; index < sampleCount; index += 1) {
      curve[index] = (index / (sampleCount - 1)) * 2 - 1;
    }
    return curve;
  }

  const drive = 1 + Math.min(volumeGain - 1, 2) * 0.85;
  const normalizer = Math.tanh(drive);
  for (let index = 0; index < sampleCount; index += 1) {
    const input = (index / (sampleCount - 1)) * 2 - 1;
    curve[index] = Math.tanh(input * drive) / normalizer;
  }
  return curve;
}

function updatePlaybackSpeed() {
  const speed = Number(speedSlider.value);
  if (state.isPlaying) {
    state.playbackOffset = getCurrentTime();
    state.playbackStartedAt = state.audioContext?.currentTime || 0;
  }

  state.playbackRate = speed;
  if (state.audioSource) {
    state.audioSource.playbackRate.value = speed;
  }
  if (state.mediaElement) {
    state.mediaElement.playbackRate = speed;
  }

  speedValue.textContent = `${speed.toFixed(2)}x`;
  updateRangeFill(speedSlider);
}

function hasLoadedMedia() {
  return Boolean(state.audioBuffer || state.mediaElement || getAnalysisDuration());
}

function usesMediaElementPlayback() {
  return state.playbackBackend === "media" && Boolean(state.mediaElement);
}

async function startMediaElement() {
  const element = state.mediaElement;
  if (!element) {
    return false;
  }

  const duration = getMediaDuration();
  const offset = clampTime(state.playbackOffset, duration);
  if (offset >= duration) {
    finishPlayback();
    return false;
  }

  element.playbackRate = state.playbackRate;

  try {
    await waitForPlaybackMediaMetadata(element);
    if (!await ensureMediaElementAudioGraph()) {
      return false;
    }
    setMediaElementCurrentTime(offset);
    state.playbackOffset = offset;
    await element.play();
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

function stopMediaElement() {
  const element = state.mediaElement;
  if (!element) {
    return;
  }

  element.pause();
}

function setMediaElementCurrentTime(seconds) {
  const element = state.mediaElement;
  if (!element) {
    return;
  }

  try {
    element.currentTime = clampTime(seconds, getMediaDuration());
  } catch (error) {
    // Some media elements reject seeks before metadata is fully ready.
  }
}

function waitForPlaybackMediaMetadata(element) {
  if (element.readyState >= HTMLMediaElement.HAVE_METADATA) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    const cleanup = () => {
      element.removeEventListener("loadedmetadata", handleLoadedMetadata);
      element.removeEventListener("error", handleError);
    };
    const handleLoadedMetadata = () => {
      cleanup();
      resolve();
    };
    const handleError = () => {
      cleanup();
      reject(new Error("Could not load media metadata."));
    };

    element.addEventListener("loadedmetadata", handleLoadedMetadata, { once: true });
    element.addEventListener("error", handleError, { once: true });
    element.load();
  });
}

function setJumpAmount(seconds) {
  state.jumpAmount = seconds;
  jumpAmount.value = String(seconds);
  jumpAmountValue.textContent = `${seconds}s`;
  jumpAmountOptions.forEach((option) => {
    option.setAttribute("aria-selected", String(Number(option.dataset.value) === seconds));
  });
}

function setPlayButton(isPlaying) {
  const label = translate(isPlaying ? "pause" : "play");
  const icon = isPlaying ? "pause" : "play_arrow";
  const iconElement = playButton.querySelector(".ui-icon");
  const labelElement = playButton.querySelector("span:last-child");

  playButton.setAttribute("aria-label", label);

  if (iconElement) {
    iconElement.textContent = icon;
  }

  if (labelElement) {
    labelElement.textContent = label;
  }
}
