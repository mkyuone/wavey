// AudioNavigator waveform rendering and silence analysis.
async function buildPeaks(onProgress = () => {}) {
  const buffer = state.audioBuffer;
  const channelData = collectMonoSamples(buffer);
  const bucketCount = Math.min(Math.max(Math.floor(buffer.duration * 120), 800), 24000);
  const peaks = [];
  let chunkStartedAt = performance.now();

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

    if (performance.now() - chunkStartedAt >= ANALYSIS_CHUNK_DURATION_MS) {
      const completion = (bucket + 1) / bucketCount;
      onProgress(50 + completion * 40);
      await nextPaint();
      chunkStartedAt = performance.now();
    }
  }

  state.peaks = smoothPeaks(peaks, 3);
  clearWaveformCache();
  onProgress(90);
}

async function buildRmsFrames(onProgress = () => {}) {
  const buffer = state.audioBuffer;
  const samples = collectMonoSamples(buffer);
  const windowSize = Math.max(1, Math.floor(buffer.sampleRate * RMS_WINDOW_SECONDS));
  const frames = [];
  const totalFrames = Math.max(1, Math.ceil(samples.length / windowSize));
  let processedFrames = 0;
  let chunkStartedAt = performance.now();

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

    processedFrames += 1;
    if (performance.now() - chunkStartedAt >= ANALYSIS_CHUNK_DURATION_MS) {
      const completion = processedFrames / totalFrames;
      onProgress(90 + completion * 10);
      await nextPaint();
      chunkStartedAt = performance.now();
    }
  }

  state.rmsFrames = frames;
  onProgress(100);
}

function collectMonoSamples(buffer) {
  if (state.monoSamples?.length === buffer.length) {
    return state.monoSamples;
  }

  const output = new Float32Array(buffer.length);

  for (let channel = 0; channel < buffer.numberOfChannels; channel += 1) {
    const data = buffer.getChannelData(channel);
    for (let index = 0; index < data.length; index += 1) {
      output[index] += data[index] / buffer.numberOfChannels;
    }
  }

  state.monoSamples = output;
  return output;
}

function updateAutoThreshold() {
  state.threshold = state.settings.silenceThreshold;
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
    if (region.end - region.start < state.settings.minAudibleSeconds) {
      return;
    }

    const previous = audibleRegions[audibleRegions.length - 1];
    if (previous && region.start - previous.end < state.settings.minSilenceSeconds) {
      previous.end = region.end;
    } else {
      audibleRegions.push({ ...region });
    }
  });

  state.regions = audibleRegions;
  state.silentRegions = getLongSilentRegions(audibleRegions);
  clearWaveformCache();
  setAnalysisStatus();
}

function scheduleResizeCanvas() {
  if (state.resizeFrame) {
    return;
  }

  state.resizeFrame = requestAnimationFrame(() => {
    state.resizeFrame = 0;
    resizeCanvas();
  });
}

function resizeCanvas() {
  const rect = canvas.getBoundingClientRect();
  const ratio = window.devicePixelRatio || 1;
  const width = Math.max(1, Math.floor(rect.width * ratio));
  const height = Math.max(1, Math.floor(rect.height * ratio));

  if (canvas.width !== width) {
    canvas.width = width;
  }

  if (canvas.height !== height) {
    canvas.height = height;
  }

  if (state.canvasPixelWidth !== width || state.canvasPixelHeight !== height) {
    state.canvasPixelWidth = width;
    state.canvasPixelHeight = height;
    clearWaveformCache();
  }

  drawWaveform();
}

function drawWaveform() {
  const { width, height } = canvas;
  if (!state.staticWaveformCanvas || state.staticWaveformCanvas.width !== width || state.staticWaveformCanvas.height !== height) {
    renderStaticWaveform(width, height);
  }

  ctx.clearRect(0, 0, width, height);
  if (state.staticWaveformCanvas) {
    ctx.drawImage(state.staticWaveformCanvas, 0, 0);
  }

  if (state.audioBuffer && state.peaks.length) {
    drawPlayhead(ctx, width, height);
    drawWaveformHover(ctx, width, height);
  }
}

function renderStaticWaveform(width, height) {
  if (!state.staticWaveformCanvas) {
    state.staticWaveformCanvas = document.createElement("canvas");
    state.staticWaveformContext = state.staticWaveformCanvas.getContext("2d");
  }

  const staticCanvas = state.staticWaveformCanvas;
  const staticCtx = state.staticWaveformContext;
  staticCanvas.width = width;
  staticCanvas.height = height;

  staticCtx.clearRect(0, 0, width, height);
  staticCtx.fillStyle = getThemeColor("--canvas-bg");
  staticCtx.fillRect(0, 0, width, height);

  if (!state.audioBuffer || !state.peaks.length) {
    return;
  }

  drawGrid(staticCtx, width, height);
  drawSilence(staticCtx, width, height);
  drawEnvelope(staticCtx, width, height);
}

function drawGrid(context, width, height) {
  const centerY = height / 2;
  context.strokeStyle = getThemeColor("--canvas-grid");
  context.lineWidth = 1;
  context.beginPath();
  context.moveTo(0, centerY);
  context.lineTo(width, centerY);
  context.stroke();
}

function drawSilence(context, width, height) {
  const duration = getAnalysisDuration();
  context.fillStyle = getThemeColor("--canvas-silence");

  state.silentRegions.forEach((region) => {
    const x = (region.start / duration) * width;
    const w = ((region.end - region.start) / duration) * width;
    context.fillRect(x, 0, w, height);
  });
}

function drawEnvelope(context, width, height) {
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

  context.beginPath();
  points.forEach((point, index) => {
    const y = centerY - point.y;
    if (index === 0) {
      context.moveTo(point.x, y);
    } else {
      context.lineTo(point.x, y);
    }
  });

  [...points].reverse().forEach((point) => {
    context.lineTo(point.x, centerY + point.y);
  });

  context.closePath();
  context.fillStyle = getThemeColor("--waveform");
  context.fill();

  context.strokeStyle = getThemeColor("--waveform");
  context.lineWidth = Math.max(1, window.devicePixelRatio || 1);
  context.stroke();
}

function drawPlayhead(context, width, height) {
  const duration = getAnalysisDuration();
  if (!duration) {
    return;
  }

  const x = (getCurrentTime() / duration) * width;
  context.strokeStyle = getThemeColor("--playhead");
  context.lineWidth = Math.max(2, (window.devicePixelRatio || 1) * 1.5);
  context.beginPath();
  context.moveTo(x, 0);
  context.lineTo(x, height);
  context.stroke();
}

function drawWaveformHover(context, width, height) {
  const duration = getAnalysisDuration();
  if (!state.isWaveformHovering || !duration) {
    return;
  }

  const ratio = window.devicePixelRatio || 1;
  const x = clampNumber((state.waveformHoverTime / duration) * width, 0, width);
  const label = formatTime(state.waveformHoverTime);
  const labelPaddingX = 8 * ratio;
  const labelHeight = 24 * ratio;

  context.save();
  context.strokeStyle = getThemeColor("--waveform-hover");
  context.lineWidth = Math.max(2, ratio * 1.35);
  context.setLineDash([4 * ratio, 3 * ratio]);
  context.beginPath();
  context.moveTo(x, 0);
  context.lineTo(x, height);
  context.stroke();
  context.setLineDash([]);

  context.font = `${12 * ratio}px ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`;
  const labelWidth = context.measureText(label).width + labelPaddingX * 2;
  const labelX = clampNumber(x - labelWidth / 2, 6 * ratio, width - labelWidth - 6 * ratio);
  const labelY = 8 * ratio;

  context.fillStyle = getThemeColor("--surface");
  context.strokeStyle = getThemeColor("--waveform-hover-label-border");
  context.lineWidth = Math.max(1, ratio * 0.75);
  drawCanvasRoundRect(context, labelX, labelY, labelWidth, labelHeight, 6 * ratio);
  context.fill();
  context.stroke();

  context.fillStyle = getThemeColor("--ink");
  context.textBaseline = "middle";
  context.fillText(label, labelX + labelPaddingX, labelY + labelHeight / 2);
  context.restore();
}

function drawCanvasRoundRect(context, x, y, width, height, radius) {
  const safeRadius = Math.min(radius, width / 2, height / 2);
  context.beginPath();
  context.moveTo(x + safeRadius, y);
  context.lineTo(x + width - safeRadius, y);
  context.quadraticCurveTo(x + width, y, x + width, y + safeRadius);
  context.lineTo(x + width, y + height - safeRadius);
  context.quadraticCurveTo(x + width, y + height, x + width - safeRadius, y + height);
  context.lineTo(x + safeRadius, y + height);
  context.quadraticCurveTo(x, y + height, x, y + height - safeRadius);
  context.lineTo(x, y + safeRadius);
  context.quadraticCurveTo(x, y, x + safeRadius, y);
  context.closePath();
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

function updateWaveformHover(event) {
  if (!canShowWaveformHover(event)) {
    hideWaveformHover();
    return;
  }

  const rect = canvas.getBoundingClientRect();
  const ratio = clampNumber((event.clientX - rect.left) / rect.width, 0, 1);
  state.waveformHoverTime = ratio * getAnalysisDuration();
  state.isWaveformHovering = true;
  drawWaveform();
}

function hideWaveformHover() {
  if (!state.isWaveformHovering) {
    return;
  }
  state.isWaveformHovering = false;
  drawWaveform();
}

function canShowWaveformHover(event) {
  const hasFineHover = window.matchMedia?.("(hover: hover) and (pointer: fine)").matches !== false;
  return Boolean(
    state.audioBuffer
      && state.peaks.length
      && !state.isPointerSeeking
      && hasFineHover
      && (!event?.pointerType || event.pointerType === "mouse"),
  );
}

function getLongSilentRegions(audibleRegions) {
  const duration = getAnalysisDuration();
  const silentRegions = [];
  let cursor = 0;

  audibleRegions.forEach((region) => {
    if (region.start - cursor >= state.settings.minSilenceSeconds) {
      silentRegions.push({ start: cursor, end: region.start });
    }
    cursor = Math.max(cursor, region.end);
  });

  if (duration - cursor >= state.settings.minSilenceSeconds) {
    silentRegions.push({ start: cursor, end: duration });
  }

  return silentRegions;
}

function clearAnalysisCaches() {
  state.monoSamples = null;
  state.peaks = [];
  state.rmsFrames = [];
  state.regions = [];
  state.silentRegions = [];
  state.threshold = 0;
  clearWaveformCache();
}

function clearWaveformCache() {
  state.staticWaveformCanvas = null;
  state.staticWaveformContext = null;
}

function resetTimeUiCache() {
  state.lastCurrentTimeText = "";
  state.lastDurationText = "";
  state.lastTimelineValue = "";
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
