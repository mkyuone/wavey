// Wavey Audio Navigator event wiring and startup.
setAppHeightVariable();
if (APP_VERSION_CHANNEL) {
  document.documentElement.dataset.buildChannel = APP_VERSION_CHANNEL;
}
registerPwaServiceWorker();

installButton.addEventListener("click", promptPwaInstall);
pwaUpdateRestart.addEventListener("click", restartPwaForUpdate);
settingsButton.addEventListener("click", openSettings);
settingsClose.addEventListener("click", closeSettings);
licenseButton.addEventListener("click", openLicenses);
licenseClose.addEventListener("click", closeLicenses);
settingsBackdrop.addEventListener("click", (event) => {
  if (event.target === settingsBackdrop) {
    closeSettings();
  }
});
licenseBackdrop.addEventListener("click", (event) => {
  if (event.target === licenseBackdrop) {
    closeLicenses();
  }
});

themeOptions.forEach((option) => {
  option.addEventListener("change", () => {
    if (option.checked) {
      setTheme(option.value);
    }
  });
});

[silenceThresholdInput, minSilenceInput, minAudibleInput].forEach((input) => {
  input.addEventListener("input", updateDetectionSetting);
});

resetSettings.addEventListener("click", resetDefaultSettings);

languageControl.addEventListener("click", (event) => {
  if (event.target.closest(".custom-menu")) {
    return;
  }
  setLanguageMenuOpen(languageMenu.classList.contains("is-hidden"));
});

languageSelect.addEventListener("click", (event) => {
  event.stopPropagation();
  setLanguageMenuOpen(languageMenu.classList.contains("is-hidden"));
});

languageSelect.addEventListener("keydown", (event) => {
  if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    setLanguageMenuOpen(true);
    getSelectedLanguageOption()?.focus();
  }
});

languageOptions.forEach((option) => {
  option.addEventListener("click", () => {
    setLanguage(option.dataset.value);
    setLanguageMenuOpen(false);
    languageSelect.focus();
  });

  option.addEventListener("keydown", (event) => {
    handleLanguageOptionKeydown(event, option);
  });
});

fileInput.addEventListener("change", (event) => {
  const [file] = event.target.files;
  if (file) {
    loadFile(file);
  }
});

dropOpenButton.addEventListener("click", () => {
  fileInput.click();
});

document.addEventListener("dragenter", handleGlobalDragEnter);
document.addEventListener("dragover", handleGlobalDragOver);
document.addEventListener("dragleave", handleGlobalDragLeave);
document.addEventListener("drop", handleGlobalDrop);
window.addEventListener("blur", hideGlobalDropOverlay);

playButton.addEventListener("click", togglePlayback);

jumpBack.addEventListener("click", () => {
  seekBy(-state.jumpAmount);
});

jumpForward.addEventListener("click", () => {
  seekBy(state.jumpAmount);
});

jumpAmount.addEventListener("click", () => {
  setJumpMenuOpen(jumpAmountMenu.classList.contains("is-hidden"));
});

jumpAmount.addEventListener("keydown", (event) => {
  if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    setJumpMenuOpen(true);
    getSelectedJumpOption()?.focus();
  }
});

jumpAmountOptions.forEach((option) => {
  option.addEventListener("click", () => {
    setJumpAmount(Number(option.dataset.value));
    setJumpMenuOpen(false);
    jumpAmount.focus();
  });

  option.addEventListener("keydown", (event) => {
    handleJumpOptionKeydown(event, option);
  });
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".jump-amount-wrap")) {
    setJumpMenuOpen(false);
  }
  if (!event.target.closest(".language-control")) {
    setLanguageMenuOpen(false);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    if (isLicensesOpen()) {
      closeLicenses();
      return;
    }
    if (isSettingsOpen()) {
      closeSettings();
      return;
    }
    if (state.advancedSoundOpen && !state.advancedSoundMinimized) {
      closeAdvancedSoundPanel();
      return;
    }
    setJumpMenuOpen(false);
    setLanguageMenuOpen(false);
    if (document.activeElement?.closest(".jump-amount-wrap")) {
      jumpAmount.focus();
    } else if (document.activeElement?.closest(".language-control")) {
      languageSelect.focus();
    }
  }
});

if (colorSchemeQuery?.addEventListener) {
  colorSchemeQuery.addEventListener("change", handleColorSchemeChange);
} else if (colorSchemeQuery?.addListener) {
  colorSchemeQuery.addListener(handleColorSchemeChange);
}

window.addEventListener("beforeinstallprompt", (event) => {
  if (!isPwaInstallContext()) {
    return;
  }

  event.preventDefault();
  state.hasInstalledRelatedPwa = false;
  state.deferredInstallPrompt = event;
  syncInstallButton();
});

window.addEventListener("appinstalled", () => {
  state.deferredInstallPrompt = null;
  state.hasInstalledRelatedPwa = true;
  syncInstallButton();
});
window.addEventListener("pageshow", refreshPwaInstallState);

if ("launchQueue" in window) {
  window.launchQueue.setConsumer(handlePwaLaunchFiles);
}

speedSlider.addEventListener("input", updatePlaybackSpeed);
advancedSoundButton.addEventListener("click", openAdvancedSoundPanel);
advancedSoundClose.addEventListener("click", closeAdvancedSoundPanel);
advancedSoundMinimize.addEventListener("click", minimizeAdvancedSoundPanel);
advancedSoundChip.addEventListener("click", restoreAdvancedSoundPanel);
advancedSoundReset.addEventListener("click", resetAdvancedSoundControls);
advancedSoundHandle.addEventListener("pointerdown", beginAdvancedSoundPanelDrag);
advancedSoundHandle.addEventListener("pointermove", moveAdvancedSoundPanel);
advancedSoundHandle.addEventListener("pointerup", endAdvancedSoundPanelDrag);
advancedSoundHandle.addEventListener("pointercancel", endAdvancedSoundPanelDrag);
advancedSoundPad.addEventListener("pointerdown", beginAdvancedSoundPadDrag);
advancedSoundPad.addEventListener("pointermove", moveAdvancedSoundPad);
advancedSoundPad.addEventListener("pointerup", endAdvancedSoundPadDrag);
advancedSoundPad.addEventListener("pointercancel", endAdvancedSoundPadDrag);
advancedSoundDot.addEventListener("keydown", handleAdvancedSoundDotKeydown);

volumeSlider.addEventListener("input", updateOutputGain);
nextAudio.addEventListener("click", seekToNextAudio);


timeline.addEventListener("input", () => {
  const duration = getMediaDuration();
  if (!duration) {
    return;
  }
  hideWaveformSeekHint();
  setCurrentTime((Number(timeline.value) / 1000) * duration);
});

updateRangeFill(timeline);
updateRangeFill(volumeSlider);
updateRangeFill(speedSlider);

canvas.addEventListener("pointerdown", (event) => {
  if (!hasLoadedMedia()) {
    return;
  }
  canvas.setPointerCapture(event.pointerId);
  state.isPointerSeeking = true;
  hideWaveformSeekHint();
  hideWaveformHover();
  seekFromPointer(event);
});

canvas.addEventListener("pointermove", (event) => {
  if (state.isPointerSeeking) {
    seekFromPointer(event);
    return;
  }
  updateWaveformHover(event);
});

canvas.addEventListener("pointerup", (event) => {
  state.isPointerSeeking = false;
  updateWaveformHover(event);
});

canvas.addEventListener("pointercancel", hideWaveformHover);
canvas.addEventListener("pointerleave", hideWaveformHover);

waveformWrap.addEventListener("contextmenu", (event) => {
  event.preventDefault();
});

window.addEventListener("resize", updateAppViewport);
window.addEventListener("orientationchange", updateAppViewport);
window.visualViewport?.addEventListener("resize", updateAppViewport);
window.visualViewport?.addEventListener("scroll", updateAppViewport);
document.addEventListener("keydown", handleKeyboardControls);
if ("ResizeObserver" in window) {
  const layoutResizeObserver = new ResizeObserver(() => {
    scheduleResizeCanvas();
    scheduleViewportWarningSync();
    constrainAdvancedSoundUi();
  });
  layoutResizeObserver.observe(appShell);
  layoutResizeObserver.observe(waveformWrap);
}
applyTheme();
syncSettingsControls();
syncAppVersion();
syncAdvancedSoundUi();
setLanguage(state.language, false);
applyLanguage();
hydratePersistentSettings().catch(() => {
  state.settingsStorageHydrated = true;
});
Object.assign(window.WaveyNavigator, {
  state,
  loadFile,
  setLanguage,
  setTheme,
  drawWaveform,
  updateAppViewport,
  setPlaybackSpeed,
  setPitchSemitones,
});
