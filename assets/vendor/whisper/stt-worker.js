/* global whisper_factory */

importScripts("whisper.js");

let modulePromise = null;
let whisperModule = null;
let modelReady = false;
let activeLogBuffer = null;

const TRANSCRIPT_LINE_PATTERN = /^\[([0-9:.]+)\s+-->\s+([0-9:.]+)\]\s+(.*)$/;

self.addEventListener("message", async (event) => {
  const { id, type } = event.data || {};

  try {
    if (type === "init") {
      await initializeModel(event.data.modelBuffer);
      postMessage({ id, type: "ready" });
      return;
    }

    if (type === "transcribe") {
      const segments = await transcribeChunk(event.data);
      postMessage({ id, type: "result", segments });
      return;
    }

    throw new Error(`Unsupported STT worker message: ${type}`);
  } catch (error) {
    const logs = activeLogBuffer ? activeLogBuffer.slice(-12) : [];
    activeLogBuffer = null;
    postMessage({
      id,
      type: "error",
      message: [error?.message || "Transcription failed.", ...logs].filter(Boolean).join("\n"),
    });
  }
});

async function initializeModel(modelBuffer) {
  if (modelReady) {
    return;
  }

  if (!modulePromise) {
    modulePromise = whisper_factory({
      locateFile: (path) => path,
      print: handleRuntimeLog,
      printErr: handleRuntimeLog,
    });
  }

  whisperModule = await modulePromise;
  const modelBytes = new Uint8Array(modelBuffer);

  try {
    whisperModule.FS_unlink("/whisper.bin");
  } catch (error) {
    // The first model initialization has nothing to unlink.
  }

  whisperModule.FS_createDataFile("/", "whisper.bin", modelBytes, true, false);
  modelReady = whisperModule.init("/whisper.bin");

  if (!modelReady) {
    throw new Error("Could not initialize the local Whisper model.");
  }
}

async function transcribeChunk({ pcm, language = "auto", chunkStart = 0 }) {
  if (!modelReady || !whisperModule) {
    throw new Error("The Whisper model is not ready.");
  }

  activeLogBuffer = [];
  const runtimeLanguage = language === "auto" ? "auto" : language;
  const result = whisperModule.full_default(new Float32Array(pcm), runtimeLanguage, false);
  const lines = activeLogBuffer;
  activeLogBuffer = null;

  if (result !== 0) {
    throw new Error("Whisper could not transcribe this chunk.");
  }

  return parseTranscriptSegments(lines, chunkStart, runtimeLanguage);
}

function handleRuntimeLog(line) {
  if (activeLogBuffer) {
    activeLogBuffer.push(String(line));
  }
}

function parseTranscriptSegments(lines, chunkStart, language) {
  return lines
    .map((line) => {
      const match = String(line).match(TRANSCRIPT_LINE_PATTERN);
      if (!match) {
        return null;
      }

      const text = match[3].trim();
      if (!text) {
        return null;
      }

      return {
        start: chunkStart + parseWhisperTimestamp(match[1]),
        end: chunkStart + parseWhisperTimestamp(match[2]),
        text,
        language,
        confidence: null,
        noSpeech: null,
      };
    })
    .filter(Boolean);
}

function parseWhisperTimestamp(value) {
  const [hours = "0", minutes = "0", seconds = "0"] = String(value).split(":");
  return (Number(hours) * 3600) + (Number(minutes) * 60) + Number(seconds);
}
