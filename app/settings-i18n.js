// AudioNavigator settings, localization, and general UI helpers.
function setLanguage(language, shouldApply = true) {
  const fallbackLanguage = translations[language] ? language : "en";
  const selectedOption = languageOptions.find((option) => option.dataset.value === fallbackLanguage);
  state.language = fallbackLanguage;
  languageSelect.value = fallbackLanguage;
  languageValue.textContent = selectedOption?.textContent || "English";
  languageOptions.forEach((option) => {
    option.setAttribute("aria-selected", String(option.dataset.value === fallbackLanguage));
  });

  if (shouldApply) {
    applyLanguage();
    persistSettings();
  }
}

function openSettings() {
  settingsBackdrop.classList.remove("is-hidden");
  settingsBackdrop.setAttribute("aria-hidden", "false");
  setLanguageMenuOpen(false);
  setJumpMenuOpen(false);
  scheduleViewportWarningSync();
  settingsClose.focus();
}

function closeSettings() {
  closeLicenses({ restoreFocus: false });
  settingsBackdrop.classList.add("is-hidden");
  settingsBackdrop.setAttribute("aria-hidden", "true");
  setLanguageMenuOpen(false);
  scheduleViewportWarningSync();
  settingsButton.focus();
}

function isSettingsOpen() {
  return !settingsBackdrop.classList.contains("is-hidden");
}

function openLicenses() {
  licenseBackdrop.classList.remove("is-hidden");
  licenseBackdrop.setAttribute("aria-hidden", "false");
  setLanguageMenuOpen(false);
  setJumpMenuOpen(false);
  scheduleViewportWarningSync();
  licenseClose.focus();
}

function closeLicenses({ restoreFocus = true } = {}) {
  if (!isLicensesOpen()) {
    return;
  }

  licenseBackdrop.classList.add("is-hidden");
  licenseBackdrop.setAttribute("aria-hidden", "true");
  scheduleViewportWarningSync();

  if (restoreFocus) {
    licenseButton.focus();
  }
}

function isLicensesOpen() {
  return !licenseBackdrop.classList.contains("is-hidden");
}

function setTheme(theme) {
  state.settings.theme = ["auto", "dark", "light"].includes(theme) ? theme : DEFAULT_SETTINGS.theme;
  applyTheme();
  syncThemeControls();
  persistSettings();
}

function applyTheme() {
  if (state.settings.theme === "auto") {
    document.documentElement.removeAttribute("data-theme");
  } else {
    document.documentElement.dataset.theme = state.settings.theme;
  }
  handleColorSchemeChange();
}

function syncSettingsControls() {
  syncThemeControls();
  silenceThresholdInput.value = String(state.settings.silenceThreshold);
  minSilenceInput.value = String(state.settings.minSilenceSeconds);
  minAudibleInput.value = String(state.settings.minAudibleSeconds);
  updateSettingsOutputs();
}

function syncAppVersion() {
  document.querySelectorAll("[data-app-version]").forEach((element) => {
    element.textContent = APP_VERSION_LABEL;
  });
}

function syncThemeControls() {
  themeOptions.forEach((option) => {
    option.checked = option.value === state.settings.theme;
  });
}

function updateDetectionSetting() {
  state.settings.silenceThreshold = clampNumber(Number(silenceThresholdInput.value), 0.005, 0.08);
  state.settings.minSilenceSeconds = clampNumber(Number(minSilenceInput.value), 1, 30);
  state.settings.minAudibleSeconds = clampNumber(Number(minAudibleInput.value), 0.1, 3);
  updateSettingsOutputs();
  persistSettings();
  reanalyzeSilenceSettings();
}

function updateSettingsOutputs() {
  silenceThresholdValue.textContent = state.settings.silenceThreshold.toFixed(3);
  minSilenceValue.textContent = `${state.settings.minSilenceSeconds.toFixed(0)}s`;
  minAudibleValue.textContent = `${state.settings.minAudibleSeconds.toFixed(1)}s`;
  updateRangeFill(silenceThresholdInput);
  updateRangeFill(minSilenceInput);
  updateRangeFill(minAudibleInput);
}

function resetDefaultSettings() {
  const fallbackLanguage = getLanguagePreference().language;
  state.settings = { ...DEFAULT_SETTINGS };
  setLanguage(fallbackLanguage, false);
  applyTheme();
  syncSettingsControls();
  applyLanguage();
  persistSettings();
  reanalyzeSilenceSettings();
}

function reanalyzeSilenceSettings() {
  if (!state.audioBuffer || !state.rmsFrames.length) {
    return;
  }
  updateAutoThreshold();
  analyzeRegions();
  drawWaveform();
}

function handleColorSchemeChange() {
  syncThemeColor();
  clearWaveformCache();
  drawWaveform();
}

function syncThemeColor() {
  if (!themeColorMeta) {
    return;
  }

  const resolvedTheme = state.settings.theme === "auto"
    ? (colorSchemeQuery?.matches ? "dark" : "light")
    : state.settings.theme;
  themeColorMeta.setAttribute("content", PWA_THEME_COLORS[resolvedTheme] || PWA_THEME_COLORS.light);
}

function getThemeColor(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

function setJumpMenuOpen(isOpen) {
  jumpAmountMenu.classList.toggle("is-hidden", !isOpen);
  jumpAmount.setAttribute("aria-expanded", String(isOpen));
}

function getSelectedJumpOption() {
  return jumpAmountOptions.find((option) => option.getAttribute("aria-selected") === "true");
}

function handleJumpOptionKeydown(event, option) {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    option.click();
    return;
  }

  if (event.key === "ArrowDown" || event.key === "ArrowUp") {
    event.preventDefault();
    const direction = event.key === "ArrowDown" ? 1 : -1;
    const currentIndex = jumpAmountOptions.indexOf(option);
    const nextIndex = (currentIndex + direction + jumpAmountOptions.length) % jumpAmountOptions.length;
    jumpAmountOptions[nextIndex].focus();
  }
}

function setLanguageMenuOpen(isOpen) {
  if (languageControl.classList.contains("is-hidden")) {
    isOpen = false;
  }

  languageMenu.classList.toggle("is-hidden", !isOpen);
  languageSelect.setAttribute("aria-expanded", String(isOpen));
}

function getSelectedLanguageOption() {
  return languageOptions.find((option) => option.getAttribute("aria-selected") === "true");
}

function handleLanguageOptionKeydown(event, option) {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    option.click();
    return;
  }

  if (event.key === "ArrowDown" || event.key === "ArrowUp") {
    event.preventDefault();
    const direction = event.key === "ArrowDown" ? 1 : -1;
    const currentIndex = languageOptions.indexOf(option);
    const nextIndex = (currentIndex + direction + languageOptions.length) % languageOptions.length;
    languageOptions[nextIndex].focus();
  }
}

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) {
    return "0:00";
  }

  const totalSeconds = Math.max(0, Math.floor(seconds));
  const minutes = Math.floor(totalSeconds / 60);
  const remainingSeconds = totalSeconds % 60;
  const hours = Math.floor(minutes / 60);
  const visibleMinutes = minutes % 60;

  if (hours > 0) {
    return `${hours}:${String(visibleMinutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
  }

  return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
}

function formatFileSize(bytes) {
  if (bytes < 1024 * 1024) {
    return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function translate(key, params = {}) {
  const dictionary = translations[state.language] || translations.en;
  const fallback = translations.en[key] || key;
  const template = dictionary[key] || fallback;
  return Object.entries(params).reduce(
    (text, [name, value]) => text.replaceAll(`{${name}}`, value),
    template,
  );
}

function getSettingsPayload() {
  return {
    language: state.language,
    theme: state.settings.theme,
    silenceThreshold: state.settings.silenceThreshold,
    minSilenceSeconds: state.settings.minSilenceSeconds,
    minAudibleSeconds: state.settings.minAudibleSeconds,
  };
}

function getExtensionStorageArea() {
  return globalThis.browser?.storage?.local || globalThis.chrome?.storage?.local || null;
}

function getExtensionStorageError() {
  return globalThis.chrome?.runtime?.lastError || null;
}

function readExtensionSettings() {
  const storage = getExtensionStorageArea();
  if (!storage?.get) {
    return Promise.resolve(null);
  }

  if (globalThis.browser?.storage?.local === storage) {
    return storage
      .get(STORAGE_KEY)
      .then((result) => result?.[STORAGE_KEY] || null)
      .catch(() => null);
  }

  return new Promise((resolve) => {
    try {
      storage.get(STORAGE_KEY, (result) => {
        if (getExtensionStorageError()) {
          resolve(null);
          return;
        }
        resolve(result?.[STORAGE_KEY] || null);
      });
    } catch (error) {
      resolve(null);
    }
  });
}

function writeExtensionSettings(payload) {
  const storage = getExtensionStorageArea();
  if (!storage?.set) {
    return;
  }

  try {
    const writeResult = storage.set({ [STORAGE_KEY]: payload }, () => {});
    if (writeResult?.catch) {
      writeResult.catch(() => {});
    }
  } catch (error) {
    try {
      const writeResult = storage.set({ [STORAGE_KEY]: payload });
      if (writeResult?.catch) {
        writeResult.catch(() => {});
      }
    } catch (innerError) {
      // Extension storage can be unavailable without the storage permission.
    }
  }
}

function applySavedSettings(settings) {
  state.language = settings.language;
  state.settings = {
    theme: settings.theme,
    silenceThreshold: settings.silenceThreshold,
    minSilenceSeconds: settings.minSilenceSeconds,
    minAudibleSeconds: settings.minAudibleSeconds,
  };
  setLanguage(settings.language, false);
  applyTheme();
  syncSettingsControls();
  applyLanguage();
  reanalyzeSilenceSettings();
}

async function hydratePersistentSettings() {
  const stored = await readExtensionSettings();
  state.settingsStorageHydrated = true;

  if (state.settingsChangedBeforeHydration) {
    return;
  }

  if (!stored) {
    persistSettings({ markDirty: false });
    return;
  }

  applySavedSettings(normalizeStoredSettings(stored, getLanguagePreference().language));
}

function persistSettings({ markDirty = true } = {}) {
  if (markDirty && !state.settingsStorageHydrated) {
    state.settingsChangedBeforeHydration = true;
  }

  const payload = getSettingsPayload();
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(payload),
    );
  } catch (error) {
    // Storage can be unavailable in restrictive browser contexts.
  }

  writeExtensionSettings(payload);
}

function applyLanguage() {
  document.documentElement.lang = state.language;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    if (element.id === "fileName" && state.audioBuffer) {
      return;
    }
    element.textContent = translate(element.dataset.i18n);
  });

  document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
    element.setAttribute("aria-label", translate(element.dataset.i18nAria));
  });

  if (state.errorKey) {
    setError(state.errorKey);
  } else if (state.audioBuffer) {
    setAnalysisStatus();
  } else {
    setStatus(state.statusKey, state.statusParams);
  }

  if (!loadingOverlay.classList.contains("is-hidden")) {
    loadingTitle.textContent = translate(state.busyTitleKey);
    loadingDetail.textContent = translate(state.busyDetailKey, state.busyDetailParams);
  }

  updatePlayControlWidth();
  setPlayButton(state.isPlaying);
  scheduleViewportWarningSync();
}

function updatePlayControlWidth() {
  const labels = [translate("play"), translate("pause")];
  const probe = playButton.cloneNode(true);

  probe.style.position = "absolute";
  probe.style.inset = "0 auto auto 0";
  probe.style.visibility = "hidden";
  probe.style.pointerEvents = "none";
  probe.style.width = "max-content";
  probe.style.setProperty("--play-control-width", "max-content");
  document.body.append(probe);

  const width = labels.reduce((widest, label) => {
    probe.querySelector("span:last-child").textContent = label;
    return Math.max(widest, Math.ceil(probe.getBoundingClientRect().width));
  }, 0);

  probe.remove();
  playButton.style.setProperty("--play-control-width", `${Math.max(128, width)}px`);
}

function setStatus(key, params = {}) {
  state.statusKey = key;
  state.statusParams = params;
  state.errorKey = "";
  statusText.textContent = translate(key, params);
  statusText.classList.remove("is-error");
  dropError.textContent = "";
  dropError.classList.add("is-hidden");
}

function setError(key) {
  state.errorKey = key;
  const message = translate(key);
  statusText.textContent = message;
  statusText.classList.add("is-error");
  dropError.textContent = message;
  dropError.classList.toggle("is-hidden", dropZone.classList.contains("is-hidden"));
}

function handleGlobalDragEnter(event) {
  if (!hasDraggedFiles(event)) {
    return;
  }
  event.preventDefault();
  state.globalDragDepth += 1;
  showGlobalDropOverlay();
  scheduleGlobalDragReset();
}

function handleGlobalDragOver(event) {
  if (!hasDraggedFiles(event)) {
    return;
  }
  event.preventDefault();
  event.dataTransfer.dropEffect = "copy";
  showGlobalDropOverlay();
  scheduleGlobalDragReset();
}

function handleGlobalDragLeave(event) {
  if (!hasDraggedFiles(event)) {
    return;
  }
  event.preventDefault();
  if (isLeavingWindow(event)) {
    hideGlobalDropOverlay();
    return;
  }
  state.globalDragDepth = Math.max(0, state.globalDragDepth - 1);
  if (state.globalDragDepth === 0) {
    hideGlobalDropOverlay();
  }
}

function handleGlobalDrop(event) {
  if (!hasDraggedFiles(event)) {
    return;
  }
  event.preventDefault();
  const [file] = event.dataTransfer.files || [];
  hideGlobalDropOverlay();
  if (file) {
    loadFile(file);
  }
}

function hasDraggedFiles(event) {
  return [...(event.dataTransfer?.types || [])].includes("Files");
}

function isLeavingWindow(event) {
  return event.clientX <= 0
    || event.clientY <= 0
    || event.clientX >= window.innerWidth
    || event.clientY >= window.innerHeight;
}

function showGlobalDropOverlay() {
  globalDropOverlay.classList.remove("is-hidden");
  globalDropOverlay.setAttribute("aria-hidden", "false");
  dropZone.classList.add("is-dragging");
  scheduleGlobalDragReset();
}

function hideGlobalDropOverlay() {
  state.globalDragDepth = 0;
  window.clearTimeout(state.globalDragResetTimer);
  state.globalDragResetTimer = 0;
  globalDropOverlay.classList.add("is-hidden");
  globalDropOverlay.setAttribute("aria-hidden", "true");
  dropZone.classList.remove("is-dragging");
}

function scheduleGlobalDragReset() {
  window.clearTimeout(state.globalDragResetTimer);
  state.globalDragResetTimer = window.setTimeout(() => {
    hideGlobalDropOverlay();
  }, 700);
}

function maybeShowWaveformSeekHint() {
  if (!state.audioBuffer || !state.peaks.length || hasSeenWaveformSeekHint()) {
    return;
  }

  markWaveformSeekHintSeen();
  waveformSeekHint.classList.remove("is-hidden");
  waveformSeekHint.setAttribute("aria-hidden", "false");
  window.clearTimeout(state.waveformHintTimer);
  state.waveformHintTimer = window.setTimeout(hideWaveformSeekHint, 5200);
}

function hideWaveformSeekHint() {
  window.clearTimeout(state.waveformHintTimer);
  state.waveformHintTimer = 0;
  waveformSeekHint.classList.add("is-hidden");
  waveformSeekHint.setAttribute("aria-hidden", "true");
}

function hasSeenWaveformSeekHint() {
  try {
    return localStorage.getItem(WAVEFORM_HINT_STORAGE_KEY) === "seen";
  } catch (error) {
    return false;
  }
}

function markWaveformSeekHintSeen() {
  try {
    localStorage.setItem(WAVEFORM_HINT_STORAGE_KEY, "seen");
  } catch (error) {
    // Private or restricted storage should not block the hint.
  }
}

function setBusy(isBusy, titleKey = "processingAudio", detailKey = "preparingWaveform", detailParams = {}, progress = null) {
  state.busyTitleKey = titleKey;
  state.busyDetailKey = detailKey;
  state.busyDetailParams = detailParams;
  loadingTitle.textContent = translate(titleKey);
  loadingDetail.textContent = translate(detailKey, detailParams);
  loadingProgressTrack.classList.toggle("is-indeterminate", progress === null);

  if (progress === null) {
    loadingProgressBar.style.width = "";
  } else {
    const percent = Math.min(100, Math.max(0, Math.round(progress)));
    loadingProgressBar.style.width = `${percent}%`;
  }

  loadingOverlay.classList.toggle("is-hidden", !isBusy);
  scheduleViewportWarningSync();
}

function setBusyProgress(progress) {
  const percent = Math.min(100, Math.max(0, progress));
  loadingProgressTrack.classList.remove("is-indeterminate");
  loadingProgressBar.style.width = `${percent}%`;
}

function updateRangeFill(input) {
  const min = Number(input.min || 0);
  const max = Number(input.max || 100);
  const value = Number(input.value || min);
  const range = max - min;
  const percent = range > 0 ? ((value - min) / range) * 100 : 0;
  const boundedPercent = Math.min(100, Math.max(0, percent));
  const thumbSize = Number.parseFloat(getComputedStyle(input).getPropertyValue("--range-thumb-size")) || 18;
  const thumbOffset = (thumbSize / 2) - ((boundedPercent / 100) * thumbSize);
  input.style.setProperty("--range-fill", `calc(${boundedPercent}% + ${thumbOffset.toFixed(3)}px)`);
}

function nextPaint() {
  return new Promise((resolve) => requestAnimationFrame(() => resolve()));
}

function setAppHeightVariable() {
  document.documentElement.style.setProperty("--app-height", `${Math.round(window.innerHeight)}px`);
}

function updateAppViewport() {
  setAppHeightVariable();
  scheduleResizeCanvas();
  scheduleViewportWarningSync();
}

function scheduleViewportWarningSync() {
  if (state.viewportWarningFrame) {
    return;
  }

  state.viewportWarningFrame = requestAnimationFrame(() => {
    state.viewportWarningFrame = 0;
    syncViewportWarning();
  });
}

function syncViewportWarning() {
  if (isMobileViewportWarningBypassed()) {
    setViewportWarningVisible(false);
    return;
  }

  const modalIsOpen = isSettingsOpen() || isLicensesOpen();
  const busyIsOpen = !loadingOverlay.classList.contains("is-hidden");
  const viewportIsTooNarrow = window.innerWidth < DESKTOP_MIN_INTERACTIVE_WIDTH;
  const shellOverflows = appShell.scrollHeight > appShell.clientHeight + 2
    || document.documentElement.scrollHeight > window.innerHeight + 2;
  setViewportWarningVisible(!(modalIsOpen || busyIsOpen) && (viewportIsTooNarrow || shellOverflows));
}

function isMobileViewportWarningBypassed() {
  return /Android|iPhone|iPad|iPod|Mobile|Tablet/i.test(navigator.userAgent)
    || window.matchMedia?.("(hover: none) and (pointer: coarse)").matches;
}

function setViewportWarningVisible(isVisible) {
  viewportWarning.classList.toggle("is-hidden", !isVisible);
  appShell.toggleAttribute("inert", isVisible);
  appShell.setAttribute("aria-hidden", String(isVisible));
}
