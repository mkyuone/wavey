const fileInput = document.querySelector("#fileInput");
const languageSelect = document.querySelector("#languageSelect");
const dropOpenButton = document.querySelector("#dropOpenButton");
const dropZone = document.querySelector("#dropZone");
const playerPanel = document.querySelector("#playerPanel");
const canvas = document.querySelector("#waveformCanvas");
const ctx = canvas.getContext("2d");
const fileName = document.querySelector("#fileName");
const fileDetails = document.querySelector("#fileDetails");
const statusText = document.querySelector("#statusText");
const playButton = document.querySelector("#playButton");
const jumpBack = document.querySelector("#jumpBack");
const jumpForward = document.querySelector("#jumpForward");
const jumpAmount = document.querySelector("#jumpAmount");
const timeline = document.querySelector("#timeline");
const currentTime = document.querySelector("#currentTime");
const durationText = document.querySelector("#duration");
const speedSlider = document.querySelector("#speedSlider");
const speedValue = document.querySelector("#speedValue");
const volumeSlider = document.querySelector("#volumeSlider");
const volumeValue = document.querySelector("#volumeValue");
const nextAudio = document.querySelector("#nextAudio");
const loadingOverlay = document.querySelector("#loadingOverlay");
const loadingTitle = document.querySelector("#loadingTitle");
const loadingDetail = document.querySelector("#loadingDetail");
const loadingProgressBar = document.querySelector("#loadingProgressBar");
const loadingProgressTrack = document.querySelector(".progress-track");

const translations = {
  en: {
    language: "Language",
    openAudio: "Open audio",
    audioFileUpload: "Audio file upload",
    dropAudio: "Drop an audio file here",
    privacyNote: "Your file stays private, local, and is not uploaded.",
    waveformPlayer: "Waveform player",
    noFileLoaded: "No file loaded",
    ready: "Ready",
    interactiveWaveform: "Interactive audio waveform",
    playbackPosition: "Playback position",
    play: "Play",
    pause: "Pause",
    nextSound: "Next section",
    timedJumpControls: "Timed jump controls",
    jumpBackward: "Jump backward",
    jumpForward: "Jump forward",
    jumpAmount: "Jump amount",
    back: "Back",
    forward: "Forward",
    volume: "Volume",
    speed: "Speed",
    processingAudio: "Processing audio",
    preparingWaveform: "Preparing waveform...",
    readingAudio: "Reading audio...",
    readingFile: "Reading file...",
    readingFileProgress: "Reading file... {percent}%",
    decodingAudio: "Decoding audio...",
    buildingWaveform: "Building waveform...",
    findingSilence: "Finding long silence gaps...",
    chooseAudioFile: "Choose an audio file.",
    decodeError: "This file could not be decoded by the browser.",
    silenceStatus: "{count} long silence gap{plural} detected",
  },
  "zh-CN": {
    language: "语言",
    openAudio: "打开音频",
    audioFileUpload: "音频文件上传",
    dropAudio: "将音频文件拖到这里",
    privacyNote: "你的文件保持私密，仅在本地处理，不会上传。",
    waveformPlayer: "波形播放器",
    noFileLoaded: "未载入文件",
    ready: "就绪",
    interactiveWaveform: "交互式音频波形",
    playbackPosition: "播放位置",
    play: "播放",
    pause: "暂停",
    nextSound: "下一段",
    timedJumpControls: "定时跳转控件",
    jumpBackward: "向后跳转",
    jumpForward: "向前跳转",
    jumpAmount: "跳转时长",
    back: "后退",
    forward: "前进",
    volume: "音量",
    speed: "速度",
    processingAudio: "正在处理音频",
    preparingWaveform: "正在准备波形...",
    readingAudio: "正在读取音频...",
    readingFile: "正在读取文件...",
    readingFileProgress: "正在读取文件... {percent}%",
    decodingAudio: "正在解码音频...",
    buildingWaveform: "正在生成波形...",
    findingSilence: "正在查找长静音段...",
    chooseAudioFile: "请选择音频文件。",
    decodeError: "浏览器无法解码此文件。",
    silenceStatus: "检测到 {count} 个长静音间隔",
  },
  "zh-TW": {
    language: "語言",
    openAudio: "開啟音訊",
    audioFileUpload: "音訊檔案上傳",
    dropAudio: "將音訊檔案拖到這裡",
    privacyNote: "你的檔案會保持私密，僅在本機處理，不會上傳。",
    waveformPlayer: "波形播放器",
    noFileLoaded: "尚未載入檔案",
    ready: "就緒",
    interactiveWaveform: "互動式音訊波形",
    playbackPosition: "播放位置",
    play: "播放",
    pause: "暫停",
    nextSound: "下一段",
    timedJumpControls: "定時跳轉控制",
    jumpBackward: "向後跳轉",
    jumpForward: "向前跳轉",
    jumpAmount: "跳轉時長",
    back: "後退",
    forward: "前進",
    volume: "音量",
    speed: "速度",
    processingAudio: "正在處理音訊",
    preparingWaveform: "正在準備波形...",
    readingAudio: "正在讀取音訊...",
    readingFile: "正在讀取檔案...",
    readingFileProgress: "正在讀取檔案... {percent}%",
    decodingAudio: "正在解碼音訊...",
    buildingWaveform: "正在產生波形...",
    findingSilence: "正在尋找長靜音段...",
    chooseAudioFile: "請選擇音訊檔案。",
    decodeError: "瀏覽器無法解碼此檔案。",
    silenceStatus: "偵測到 {count} 個長靜音間隔",
  },
};

const state = {
  language: "en",
  audioBuffer: null,
  mediaDuration: 0,
  peaks: [],
  rmsFrames: [],
  regions: [],
  silentRegions: [],
  threshold: 0,
  audioContext: null,
  audioSource: null,
  gainNode: null,
  limiterNode: null,
  playbackOffset: 0,
  playbackStartedAt: 0,
  playbackRate: 1,
  isPlaying: false,
  jumpAmount: 10,
  statusKey: "ready",
  statusParams: {},
  errorKey: "",
  busyTitleKey: "processingAudio",
  busyDetailKey: "preparingWaveform",
  busyDetailParams: {},
  isPointerSeeking: false,
  animationFrame: 0,
};

const RMS_WINDOW_SECONDS = 0.05;
const MIN_AUDIBLE_SECONDS = 0.2;
const MIN_SILENCE_SECONDS = 12;
const SEEK_EPSILON = 0.08;

languageSelect.addEventListener("change", () => {
  state.language = languageSelect.value;
  applyLanguage();
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

["dragenter", "dragover"].forEach((eventName) => {
  dropZone.addEventListener(eventName, (event) => {
    event.preventDefault();
    dropZone.classList.add("is-dragging");
  });
});

["dragleave", "drop"].forEach((eventName) => {
  dropZone.addEventListener(eventName, (event) => {
    event.preventDefault();
    dropZone.classList.remove("is-dragging");
  });
});

dropZone.addEventListener("drop", (event) => {
  const [file] = event.dataTransfer.files;
  if (file) {
    loadFile(file);
  }
});

playButton.addEventListener("click", togglePlayback);

jumpBack.addEventListener("click", () => {
  seekBy(-state.jumpAmount);
});

jumpForward.addEventListener("click", () => {
  seekBy(state.jumpAmount);
});

jumpAmount.addEventListener("change", () => {
  setJumpAmount(Number(jumpAmount.value));
});

speedSlider.addEventListener("input", updatePlaybackSpeed);

volumeSlider.addEventListener("input", updateOutputGain);
nextAudio.addEventListener("click", seekToNextAudio);

function seekToNextAudio() {
  const current = getCurrentTime();
  const currentRegion = state.regions.find((item) => item.start <= current && item.end >= current);
  const targetTime = currentRegion ? currentRegion.end + SEEK_EPSILON : current + SEEK_EPSILON;
  const region = state.regions.find((item) => item.start > targetTime);
  if (region) {
    setCurrentTime(region.start);
  }
}

timeline.addEventListener("input", () => {
  const duration = getMediaDuration();
  if (!duration) {
    return;
  }
  setCurrentTime((Number(timeline.value) / 1000) * duration);
});

canvas.addEventListener("pointerdown", (event) => {
  if (!state.audioBuffer) {
    return;
  }
  canvas.setPointerCapture(event.pointerId);
  state.isPointerSeeking = true;
  seekFromPointer(event);
});

canvas.addEventListener("pointermove", (event) => {
  if (state.isPointerSeeking) {
    seekFromPointer(event);
  }
});

canvas.addEventListener("pointerup", () => {
  state.isPointerSeeking = false;
});

window.addEventListener("resize", resizeCanvas);
document.addEventListener("keydown", handleKeyboardControls);
applyLanguage();

async function loadFile(file) {
  setStatus("readingAudio");
  setBusy(true, "processingAudio", "readingFile", {}, 0);
  await nextPaint();
  statusText.classList.remove("is-error");

  if (!file.type.startsWith("audio/") && !file.name.match(/\.(mp3|wav|m4a|aac|ogg|flac)$/i)) {
    setError("chooseAudioFile");
    setBusy(false);
    return;
  }

  try {
    const arrayBuffer = await readFileAsArrayBuffer(file, (percent) => {
      setBusy(true, "processingAudio", "readingFileProgress", { percent: Math.round(percent) }, percent);
    });
    setBusy(true, "processingAudio", "decodingAudio", {}, null);
    await nextPaint();
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    const audioContext = new AudioContextClass();
    const decodedBuffer = await audioContext.decodeAudioData(arrayBuffer.slice(0));
    await audioContext.close();

    stopPlayback();
    state.audioBuffer = decodedBuffer;
    state.mediaDuration = decodedBuffer.duration;
    state.playbackOffset = 0;
    updatePlaybackSpeed();
    updateOutputGain();

    fileName.textContent = file.name;
    fileDetails.textContent = `${formatFileSize(file.size)} · ${formatTime(getMediaDuration())}`;

    dropZone.classList.add("is-hidden");
    playerPanel.classList.remove("is-hidden");

    setBusy(true, "processingAudio", "buildingWaveform", {}, null);
    await nextPaint();
    buildPeaks();
    setBusy(true, "processingAudio", "findingSilence", {}, null);
    await nextPaint();
    buildRmsFrames();
    updateAutoThreshold();
    analyzeRegions();
    resizeCanvas();
    updateTimeUi();
    setAnalysisStatus();
    setBusy(false);
  } catch (error) {
    console.error(error);
    setError("decodeError");
    setBusy(false);
  }
}

async function togglePlayback() {
  if (!state.audioBuffer) {
    return;
  }

  if (state.isPlaying) {
    pausePlayback();
  } else {
    await startPlayback();
  }
}

function handleKeyboardControls(event) {
  if (event.defaultPrevented || shouldIgnoreShortcut(event.target) || !state.audioBuffer) {
    return;
  }

  if (event.code === "Space") {
    event.preventDefault();
    togglePlayback();
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

function shouldIgnoreShortcut(target) {
  return Boolean(target?.closest("input, select, textarea, button, [contenteditable='true']"));
}

function buildPeaks() {
  const buffer = state.audioBuffer;
  const channelData = collectMonoSamples(buffer);
  const bucketCount = Math.min(Math.max(Math.floor(buffer.duration * 120), 800), 24000);
  const peaks = [];

  for (let bucket = 0; bucket < bucketCount; bucket += 1) {
    const start = Math.floor((bucket / bucketCount) * channelData.length);
    const end = Math.max(start + 1, Math.floor(((bucket + 1) / bucketCount) * channelData.length));
    let min = 0;
    let max = 0;
    let sum = 0;

    for (let index = start; index < end; index += 1) {
      const value = channelData[index];
      if (value < min) min = value;
      if (value > max) max = value;
      sum += value * value;
    }

    peaks.push({
      min,
      max,
      rms: Math.sqrt(sum / Math.max(1, end - start)),
    });
  }

  state.peaks = smoothPeaks(peaks, 3);
}

function buildRmsFrames() {
  const buffer = state.audioBuffer;
  const samples = collectMonoSamples(buffer);
  const windowSize = Math.max(1, Math.floor(buffer.sampleRate * RMS_WINDOW_SECONDS));
  const frames = [];

  for (let start = 0; start < samples.length; start += windowSize) {
    const end = Math.min(start + windowSize, samples.length);
    let sum = 0;

    for (let index = start; index < end; index += 1) {
      sum += samples[index] * samples[index];
    }

    frames.push({
      time: start / buffer.sampleRate,
      end: end / buffer.sampleRate,
      rms: Math.sqrt(sum / Math.max(1, end - start)),
    });
  }

  state.rmsFrames = frames;
}

function collectMonoSamples(buffer) {
  const output = new Float32Array(buffer.length);

  for (let channel = 0; channel < buffer.numberOfChannels; channel += 1) {
    const data = buffer.getChannelData(channel);
    for (let index = 0; index < data.length; index += 1) {
      output[index] += data[index] / buffer.numberOfChannels;
    }
  }

  return output;
}

function updateAutoThreshold() {
  const sorted = state.rmsFrames.map((frame) => frame.rms).sort((a, b) => a - b);
  const quiet = sorted[Math.floor(sorted.length * 0.2)] || 0;
  const median = sorted[Math.floor(sorted.length * 0.6)] || 0;
  const loud = sorted[Math.floor(sorted.length * 0.9)] || median;
  const adaptiveThreshold = quiet + (median - quiet) * 0.65;
  const lowSoundThreshold = loud * 0.035;
  state.threshold = Math.max(0.01, adaptiveThreshold, lowSoundThreshold);
}

function analyzeRegions() {
  const rawRegions = [];
  let activeRegion = null;

  state.rmsFrames.forEach((frame) => {
    if (frame.rms >= state.threshold) {
      if (!activeRegion) {
        activeRegion = { start: frame.time, end: frame.end };
      } else {
        activeRegion.end = frame.end;
      }
    } else if (activeRegion) {
      rawRegions.push(activeRegion);
      activeRegion = null;
    }
  });

  if (activeRegion) {
    rawRegions.push(activeRegion);
  }

  const audibleRegions = [];

  rawRegions.forEach((region) => {
    if (region.end - region.start < MIN_AUDIBLE_SECONDS) {
      return;
    }

    const previous = audibleRegions[audibleRegions.length - 1];
    if (previous && region.start - previous.end < MIN_SILENCE_SECONDS) {
      previous.end = region.end;
    } else {
      audibleRegions.push({ ...region });
    }
  });

  state.regions = audibleRegions;
  state.silentRegions = getLongSilentRegions(audibleRegions);
  setAnalysisStatus();
}

function resizeCanvas() {
  const rect = canvas.getBoundingClientRect();
  const ratio = window.devicePixelRatio || 1;
  canvas.width = Math.max(1, Math.floor(rect.width * ratio));
  canvas.height = Math.max(1, Math.floor(rect.height * ratio));
  drawWaveform();
}

function drawWaveform() {
  const { width, height } = canvas;
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#f8f9fc";
  ctx.fillRect(0, 0, width, height);

  if (!state.audioBuffer || !state.peaks.length) {
    return;
  }

  drawGrid(width, height);
  drawSilence(width, height);
  drawEnvelope(width, height);
  drawPlayhead(width, height);
}

function drawGrid(width, height) {
  const centerY = height / 2;
  ctx.strokeStyle = "#e4e8f0";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, centerY);
  ctx.lineTo(width, centerY);
  ctx.stroke();
}

function drawSilence(width, height) {
  const duration = getAnalysisDuration();
  ctx.fillStyle = "rgba(226, 231, 241, 0.72)";

  state.silentRegions.forEach((region) => {
    const x = (region.start / duration) * width;
    const w = ((region.end - region.start) / duration) * width;
    ctx.fillRect(x, 0, w, height);
  });
}

function drawEnvelope(width, height) {
  const centerY = height / 2;
  const peakStep = state.peaks.length / width;
  const inset = height * 0.06;
  const available = centerY - inset;
  const points = [];

  for (let x = 0; x <= width; x += 2) {
    const peak = state.peaks[Math.floor(x * peakStep)] || { rms: 0, max: 0, min: 0 };
    const transient = Math.max(Math.abs(peak.min), Math.abs(peak.max));
    const amplitude = Math.min(1, peak.rms * 3.2 + transient * 0.34);
    points.push({ x, y: amplitude * available });
  }

  ctx.beginPath();
  points.forEach((point, index) => {
    const y = centerY - point.y;
    if (index === 0) {
      ctx.moveTo(point.x, y);
    } else {
      ctx.lineTo(point.x, y);
    }
  });

  [...points].reverse().forEach((point) => {
    ctx.lineTo(point.x, centerY + point.y);
  });

  ctx.closePath();
  ctx.fillStyle = "#526AF2";
  ctx.fill();

  ctx.strokeStyle = "#526AF2";
  ctx.lineWidth = Math.max(1, window.devicePixelRatio || 1);
  ctx.stroke();
}

function drawPlayhead(width, height) {
  const duration = getAnalysisDuration();
  if (!duration) {
    return;
  }

  const x = (getCurrentTime() / duration) * width;
  ctx.strokeStyle = "#181817";
  ctx.lineWidth = Math.max(2, (window.devicePixelRatio || 1) * 1.5);
  ctx.beginPath();
  ctx.moveTo(x, 0);
  ctx.lineTo(x, height);
  ctx.stroke();
}

function startDrawingLoop() {
  cancelAnimationFrame(state.animationFrame);

  const tick = () => {
    updateTimeUi();
    drawWaveform();
    state.animationFrame = requestAnimationFrame(tick);
  };

  tick();
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
  currentTime.textContent = formatTime(current);
  durationText.textContent = formatTime(duration);
  timeline.value = duration ? String(Math.round((current / duration) * 1000)) : "0";
}

function getAnalysisDuration() {
  return state.audioBuffer?.duration || 0;
}

function getMediaDuration() {
  return getFiniteDuration(state.mediaDuration) || getAnalysisDuration();
}

function clampTime(seconds, duration) {
  return Math.min(Math.max(seconds || 0, 0), duration);
}

function getFiniteDuration(duration) {
  return Number.isFinite(duration) && duration > 0 ? duration : 0;
}

async function ensureAudioGraph() {
  if (!state.audioContext) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    state.audioContext = new AudioContextClass();
    state.gainNode = state.audioContext.createGain();
    state.limiterNode = state.audioContext.createDynamicsCompressor();
    state.limiterNode.threshold.value = -1;
    state.limiterNode.knee.value = 0;
    state.limiterNode.ratio.value = 20;
    state.limiterNode.attack.value = 0.003;
    state.limiterNode.release.value = 0.08;
    state.gainNode.connect(state.limiterNode);
    state.limiterNode.connect(state.audioContext.destination);
  }

  if (state.audioContext.state === "suspended") {
    await state.audioContext.resume();
  }

  updateOutputGain();
}

async function startPlayback() {
  if (!state.audioBuffer) {
    return;
  }

  await ensureAudioGraph();
  if (state.playbackOffset >= getMediaDuration() - SEEK_EPSILON) {
    state.playbackOffset = 0;
  }
  if (!startAudioSource()) {
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
  stopAudioSource();
  setPlayButton(false);
  cancelAnimationFrame(state.animationFrame);
  updateTimeUi();
  drawWaveform();
}

function stopPlayback() {
  state.isPlaying = false;
  state.playbackOffset = 0;
  stopAudioSource();
  setPlayButton(false);
  cancelAnimationFrame(state.animationFrame);
}

function restartPlaybackAtCurrentTime() {
  if (state.playbackOffset >= getMediaDuration() - SEEK_EPSILON) {
    finishPlayback();
    return;
  }

  stopAudioSource();
  startAudioSource();
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

function finishPlayback() {
  state.isPlaying = false;
  stopAudioSource();
  state.playbackOffset = getMediaDuration();
  setPlayButton(false);
  cancelAnimationFrame(state.animationFrame);
  updateTimeUi();
  drawWaveform();
}

function getCurrentTime() {
  const duration = getMediaDuration();
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

  if (state.gainNode) {
    state.gainNode.gain.setTargetAtTime(volumeGain, state.audioContext.currentTime, 0.01);
  }
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

  speedValue.textContent = `${Number.isInteger(speed) ? speed : speed.toFixed(2).replace(/0$/, "")}x`;
}

function setJumpAmount(seconds) {
  state.jumpAmount = seconds;
  jumpAmount.value = String(seconds);
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

  setPlayButton(state.isPlaying);
}

function setStatus(key, params = {}) {
  state.statusKey = key;
  state.statusParams = params;
  state.errorKey = "";
  statusText.textContent = translate(key, params);
  statusText.classList.remove("is-error");
}

function setError(key) {
  state.errorKey = key;
  statusText.textContent = translate(key);
  statusText.classList.add("is-error");
}

function getLongSilentRegions(audibleRegions) {
  const duration = getAnalysisDuration();
  const silentRegions = [];
  let cursor = 0;

  audibleRegions.forEach((region) => {
    if (region.start - cursor >= MIN_SILENCE_SECONDS) {
      silentRegions.push({ start: cursor, end: region.start });
    }
    cursor = Math.max(cursor, region.end);
  });

  if (duration - cursor >= MIN_SILENCE_SECONDS) {
    silentRegions.push({ start: cursor, end: duration });
  }

  return silentRegions;
}

function setAnalysisStatus() {
  const count = state.silentRegions.length;
  setStatus("silenceStatus", { count, plural: count === 1 ? "" : "s" });
}

function smoothPeaks(peaks, radius) {
  return peaks.map((peak, index) => {
    let min = 0;
    let max = 0;
    let rms = 0;
    let count = 0;

    for (let offset = -radius; offset <= radius; offset += 1) {
      const item = peaks[index + offset];
      if (!item) {
        continue;
      }
      min += item.min;
      max += item.max;
      rms += item.rms;
      count += 1;
    }

    return {
      min: min / count,
      max: max / count,
      rms: rms / count,
    };
  });
}

function setPlayButton(isPlaying) {
  const label = translate(isPlaying ? "pause" : "play");
  const path = isPlaying ? "M7 5h4v14H7zM13 5h4v14h-4z" : "M8 5v14l11-7z";
  playButton.setAttribute("aria-label", label);
  playButton.innerHTML = `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="${path}"></path>
    </svg>
    <span>${label}</span>
  `;
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
}

function nextPaint() {
  return new Promise((resolve) => requestAnimationFrame(() => resolve()));
}

function readFileAsArrayBuffer(file, onProgress) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.addEventListener("progress", (event) => {
      if (event.lengthComputable) {
        onProgress((event.loaded / event.total) * 100);
      }
    });

    reader.addEventListener("load", () => {
      onProgress(100);
      resolve(reader.result);
    });

    reader.addEventListener("error", () => {
      reject(reader.error || new Error("Could not read file."));
    });

    reader.readAsArrayBuffer(file);
  });
}
