// AudioNavigator media loading and browser decoding helpers.
async function loadFile(file) {
  setStatus("readingAudio");
  setBusy(true, "processingAudio", "readingFile", {}, 0);
  await nextPaint();
  statusText.classList.remove("is-error");

  const mediaKind = getSupportedMediaKind(file);
  if (!mediaKind) {
    setError("unsupportedFile");
    setBusy(false);
    fileInput.value = "";
    return;
  }

  try {
    const arrayBuffer = await readFileAsArrayBuffer(file, (percent) => {
      setBusy(true, "processingAudio", "readingFileProgress", { percent: Math.round(percent) }, percent);
    });
    setBusy(true, "processingAudio", "decodingAudio", {}, null);
    await nextPaint();
    const decodedBuffer = await decodeMediaFile(file, arrayBuffer, mediaKind);

    stopPlayback();
    hideWaveformHover();
    clearAnalysisCaches();
    state.audioBuffer = decodedBuffer;
    state.mediaDuration = decodedBuffer.duration;
    state.playbackOffset = 0;
    resetTimeUiCache();
    updatePlaybackSpeed();
    updateOutputGain();

    fileName.textContent = file.name;
    fileDetails.textContent = `${formatFileSize(file.size)} · ${formatTime(getMediaDuration())}`;

    dropZone.classList.add("is-hidden");
    playerPanel.classList.remove("is-hidden");

    setBusy(true, "processingAudio", "buildingWaveform", {}, 50);
    await nextPaint();
    await buildPeaks((progress) => {
      setBusyProgress(progress);
    });
    setBusy(true, "processingAudio", "findingSilence", {}, 90);
    await nextPaint();
    await buildRmsFrames((progress) => {
      setBusyProgress(progress);
    });
    updateAutoThreshold();
    analyzeRegions();
    resizeCanvas();
    updateTimeUi();
    setAnalysisStatus();
    setBusy(true, "processingAudio", "findingSilence", {}, 100);
    await nextPaint();
    setBusy(false);
  } catch (error) {
    console.error(error);
    setError(error instanceof UnsupportedMediaError ? "unsupportedCodec" : "decodeError");
    setBusy(false);
    fileInput.value = "";
  }
}

async function handlePwaLaunchFiles(launchParams) {
  const [fileHandle] = launchParams.files || [];
  if (!fileHandle?.getFile) {
    setStatus("chooseAudioFile");
    return;
  }

  try {
    const file = await fileHandle.getFile();
    await loadFile(file);
  } catch (error) {
    console.error(error);
    setError("decodeError");
    setBusy(false);
  }
}

function getSupportedMediaKind(file) {
  const mimeType = (file.type || "").toLowerCase();
  if (mimeType.startsWith("audio/")) {
    return "audio";
  }
  if (mimeType.startsWith("video/")) {
    return "video";
  }

  const extension = getFileExtension(file.name);
  if (SUPPORTED_AUDIO_EXTENSIONS.has(extension)) {
    return "audio";
  }
  if (SUPPORTED_VIDEO_EXTENSIONS.has(extension)) {
    return "video";
  }
  return "";
}

function getFileExtension(name) {
  const match = name.toLowerCase().match(/\.([a-z0-9]+)$/);
  return match ? match[1] : "";
}

async function decodeMediaFile(file, arrayBuffer, mediaKind) {
  try {
    return await decodeAudioArrayBuffer(arrayBuffer);
  } catch (error) {
    if (mediaKind !== "video") {
      throw new UnsupportedMediaError(error?.message || "Browser could not decode the audio codec.");
    }
  }

  setBusy(true, "processingAudio", "extractingAudio", {}, null);
  await nextPaint();
  return extractAudioFromVideo(file);
}

async function decodeAudioArrayBuffer(arrayBuffer) {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) {
    throw new Error("Web Audio is not supported in this browser.");
  }

  const audioContext = new AudioContextClass();
  try {
    const decodeBuffer = arrayBuffer.slice(0);
    const decodedBuffer = await audioContext.decodeAudioData(decodeBuffer);
    if (!decodedBuffer.duration || !decodedBuffer.numberOfChannels) {
      throw new Error("Decoded media did not contain an audio track.");
    }
    return decodedBuffer;
  } finally {
    await audioContext.close().catch(() => {});
  }
}

async function extractAudioFromVideo(file) {
  const video = document.createElement("video");
  const objectUrl = URL.createObjectURL(file);
  const recordMimeType = getSupportedRecorderMimeType();
  let stream = null;
  let recorder = null;

  video.preload = "auto";
  video.muted = true;
  video.playsInline = true;
  video.style.cssText = "position: fixed; width: 1px; height: 1px; opacity: 0; pointer-events: none;";
  document.body.append(video);

  try {
    if (!canBrowserPlayVideo(file, video)) {
      throw new UnsupportedMediaError();
    }

    video.src = objectUrl;
    video.load();
    await waitForMediaMetadata(video);

    stream = getVideoCaptureStream(video);
    const audioTracks = stream.getAudioTracks();
    if (!audioTracks.length) {
      throw new UnsupportedMediaError("The video does not expose a playable audio track.");
    }

    const audioStream = new MediaStream(audioTracks);
    const chunks = [];
    recorder = recordMimeType
      ? new MediaRecorder(audioStream, { mimeType: recordMimeType })
      : new MediaRecorder(audioStream);

    const recordingFinished = new Promise((resolve, reject) => {
      recorder.addEventListener("dataavailable", (event) => {
        if (event.data?.size) {
          chunks.push(event.data);
        }
      });
      recorder.addEventListener("stop", resolve, { once: true });
      recorder.addEventListener("error", () => {
        reject(recorder.error || new Error("Could not extract audio from video."));
      }, { once: true });
    });
    recordingFinished.catch(() => {});

    const playbackFinished = waitForVideoPlaybackEnd(video);
    playbackFinished.catch(() => {});
    recorder.start(1000);
    await video.play();
    await playbackFinished;

    if (recorder.state !== "inactive") {
      recorder.stop();
    }
    await recordingFinished;

    if (!chunks.length) {
      throw new UnsupportedMediaError("No audio data could be extracted from the video.");
    }

    const extractedBlob = new Blob(chunks, { type: recorder.mimeType || recordMimeType || "audio/webm" });
    const extractedArrayBuffer = await extractedBlob.arrayBuffer();
    return decodeAudioArrayBuffer(extractedArrayBuffer);
  } catch (error) {
    if (error instanceof UnsupportedMediaError) {
      throw error;
    }
    throw new UnsupportedMediaError(error?.message || "Browser could not decode the video codec.");
  } finally {
    if (recorder?.state && recorder.state !== "inactive") {
      recorder.stop();
    }
    video.pause();
    video.removeAttribute("src");
    video.load();
    video.remove();
    URL.revokeObjectURL(objectUrl);
    stream?.getTracks().forEach((track) => track.stop());
  }
}

function canBrowserPlayVideo(file, video) {
  const mimeType = (file.type || "").toLowerCase();
  if (mimeType && video.canPlayType(mimeType)) {
    return true;
  }

  const extension = getFileExtension(file.name);
  const fallbackMimeTypes = {
    m4v: "video/mp4",
    mkv: "video/webm",
    mov: "video/quicktime",
    mp4: "video/mp4",
    webm: "video/webm",
  };
  const fallbackMimeType = fallbackMimeTypes[extension];
  return Boolean(fallbackMimeType && video.canPlayType(fallbackMimeType));
}

function getVideoCaptureStream(video) {
  const stream = video.captureStream?.() || video.mozCaptureStream?.();
  if (!stream || typeof MediaRecorder === "undefined") {
    throw new UnsupportedMediaError("This browser cannot extract audio from video files.");
  }
  return stream;
}

function getSupportedRecorderMimeType() {
  if (typeof MediaRecorder === "undefined" || !MediaRecorder.isTypeSupported) {
    return "";
  }
  return RECORDED_AUDIO_MIME_TYPES.find((type) => MediaRecorder.isTypeSupported(type)) || "";
}

function waitForMediaMetadata(video) {
  return new Promise((resolve, reject) => {
    const cleanup = () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("error", handleError);
    };
    const handleLoadedMetadata = () => {
      cleanup();
      resolve();
    };
    const handleError = () => {
      cleanup();
      reject(new UnsupportedMediaError());
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata, { once: true });
    video.addEventListener("error", handleError, { once: true });
  });
}

function waitForVideoPlaybackEnd(video) {
  return new Promise((resolve, reject) => {
    const cleanup = () => {
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("error", handleError);
      video.removeEventListener("timeupdate", handleTimeUpdate);
    };
    const handleEnded = () => {
      cleanup();
      resolve();
    };
    const handleError = () => {
      cleanup();
      reject(new UnsupportedMediaError());
    };
    const handleTimeUpdate = () => {
      if (Number.isFinite(video.duration) && video.duration > 0) {
        setBusyProgress((video.currentTime / video.duration) * 45);
      }
    };

    video.addEventListener("ended", handleEnded, { once: true });
    video.addEventListener("error", handleError, { once: true });
    video.addEventListener("timeupdate", handleTimeUpdate);
  });
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

