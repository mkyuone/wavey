const fileInput = document.querySelector("#fileInput");
const languageSelect = document.querySelector("#languageSelect");
const dropOpenButton = document.querySelector("#dropOpenButton");
const dropZone = document.querySelector("#dropZone");
const playerPanel = document.querySelector("#playerPanel");
const waveformWrap = document.querySelector(".waveform-wrap");
const canvas = document.querySelector("#waveformCanvas");
const ctx = canvas.getContext("2d");
const fileName = document.querySelector("#fileName");
const fileDetails = document.querySelector("#fileDetails");
const statusText = document.querySelector("#statusText");
const playButton = document.querySelector("#playButton");
const jumpBack = document.querySelector("#jumpBack");
const jumpForward = document.querySelector("#jumpForward");
const jumpAmount = document.querySelector("#jumpAmount");
const jumpAmountValue = document.querySelector(".jump-amount-value");
const jumpAmountMenu = document.querySelector("#jumpAmountMenu");
const jumpAmountOptions = [...document.querySelectorAll("#jumpAmountMenu [role='option']")];
const languageValue = document.querySelector(".language-value");
const languageMenu = document.querySelector("#languageMenu");
const languageOptions = [...document.querySelectorAll("#languageMenu [role='option']")];
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
    supportedFormats: "Supports MP3, WAV, M4A, AAC, OGG, and FLAC.",
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
  es: {
    language: "Idioma",
    openAudio: "Abrir audio",
    audioFileUpload: "Subir archivo de audio",
    dropAudio: "Suelta un archivo de audio aquí",
    privacyNote: "Tu archivo sigue siendo privado, local y no se sube.",
    supportedFormats: "Compatible con MP3, WAV, M4A, AAC, OGG y FLAC.",
    waveformPlayer: "Reproductor de forma de onda",
    noFileLoaded: "No hay archivo cargado",
    ready: "Listo",
    interactiveWaveform: "Forma de onda interactiva",
    playbackPosition: "Posición de reproducción",
    play: "Reproducir",
    pause: "Pausar",
    nextSound: "Siguiente sección",
    timedJumpControls: "Controles de salto por tiempo",
    jumpBackward: "Saltar atrás",
    jumpForward: "Saltar adelante",
    jumpAmount: "Duración del salto",
    back: "Atrás",
    forward: "Adelante",
    volume: "Volumen",
    speed: "Velocidad",
    processingAudio: "Procesando audio",
    preparingWaveform: "Preparando forma de onda...",
    readingAudio: "Leyendo audio...",
    readingFile: "Leyendo archivo...",
    readingFileProgress: "Leyendo archivo... {percent}%",
    decodingAudio: "Decodificando audio...",
    buildingWaveform: "Creando forma de onda...",
    findingSilence: "Buscando pausas largas...",
    chooseAudioFile: "Elige un archivo de audio.",
    decodeError: "El navegador no pudo decodificar este archivo.",
    silenceStatus: "Pausas largas detectadas: {count}",
  },
  fr: {
    language: "Langue",
    openAudio: "Ouvrir un audio",
    audioFileUpload: "Importer un fichier audio",
    dropAudio: "Déposez un fichier audio ici",
    privacyNote: "Votre fichier reste privé, local et n’est pas envoyé.",
    supportedFormats: "Prend en charge MP3, WAV, M4A, AAC, OGG et FLAC.",
    waveformPlayer: "Lecteur de forme d’onde",
    noFileLoaded: "Aucun fichier chargé",
    ready: "Prêt",
    interactiveWaveform: "Forme d’onde audio interactive",
    playbackPosition: "Position de lecture",
    play: "Lire",
    pause: "Pause",
    nextSound: "Section suivante",
    timedJumpControls: "Commandes de saut temporel",
    jumpBackward: "Reculer",
    jumpForward: "Avancer",
    jumpAmount: "Durée du saut",
    back: "Retour",
    forward: "Avance",
    volume: "Volume",
    speed: "Vitesse",
    processingAudio: "Traitement de l’audio",
    preparingWaveform: "Préparation de la forme d’onde...",
    readingAudio: "Lecture de l’audio...",
    readingFile: "Lecture du fichier...",
    readingFileProgress: "Lecture du fichier... {percent}%",
    decodingAudio: "Décodage de l’audio...",
    buildingWaveform: "Création de la forme d’onde...",
    findingSilence: "Recherche des longues pauses...",
    chooseAudioFile: "Choisissez un fichier audio.",
    decodeError: "Ce fichier n’a pas pu être décodé par le navigateur.",
    silenceStatus: "Longues pauses détectées : {count}",
  },
  de: {
    language: "Sprache",
    openAudio: "Audio öffnen",
    audioFileUpload: "Audiodatei hochladen",
    dropAudio: "Audiodatei hier ablegen",
    privacyNote: "Deine Datei bleibt privat, lokal und wird nicht hochgeladen.",
    supportedFormats: "Unterstützt MP3, WAV, M4A, AAC, OGG und FLAC.",
    waveformPlayer: "Wellenform-Player",
    noFileLoaded: "Keine Datei geladen",
    ready: "Bereit",
    interactiveWaveform: "Interaktive Audio-Wellenform",
    playbackPosition: "Wiedergabeposition",
    play: "Abspielen",
    pause: "Pause",
    nextSound: "Nächster Abschnitt",
    timedJumpControls: "Zeit-Sprungsteuerung",
    jumpBackward: "Zurückspringen",
    jumpForward: "Vorspringen",
    jumpAmount: "Sprungweite",
    back: "Zurück",
    forward: "Vor",
    volume: "Lautstärke",
    speed: "Tempo",
    processingAudio: "Audio wird verarbeitet",
    preparingWaveform: "Wellenform wird vorbereitet...",
    readingAudio: "Audio wird gelesen...",
    readingFile: "Datei wird gelesen...",
    readingFileProgress: "Datei wird gelesen... {percent}%",
    decodingAudio: "Audio wird decodiert...",
    buildingWaveform: "Wellenform wird erstellt...",
    findingSilence: "Lange Stillepausen werden gesucht...",
    chooseAudioFile: "Wähle eine Audiodatei.",
    decodeError: "Diese Datei konnte vom Browser nicht decodiert werden.",
    silenceStatus: "Lange Stillepausen erkannt: {count}",
  },
  "pt-BR": {
    language: "Idioma",
    openAudio: "Abrir áudio",
    audioFileUpload: "Enviar arquivo de áudio",
    dropAudio: "Solte um arquivo de áudio aqui",
    privacyNote: "Seu arquivo continua privado, local e não é enviado.",
    supportedFormats: "Compatível com MP3, WAV, M4A, AAC, OGG e FLAC.",
    waveformPlayer: "Player de forma de onda",
    noFileLoaded: "Nenhum arquivo carregado",
    ready: "Pronto",
    interactiveWaveform: "Forma de onda interativa",
    playbackPosition: "Posição de reprodução",
    play: "Reproduzir",
    pause: "Pausar",
    nextSound: "Próxima seção",
    timedJumpControls: "Controles de salto por tempo",
    jumpBackward: "Voltar",
    jumpForward: "Avançar",
    jumpAmount: "Duração do salto",
    back: "Voltar",
    forward: "Avançar",
    volume: "Volume",
    speed: "Velocidade",
    processingAudio: "Processando áudio",
    preparingWaveform: "Preparando forma de onda...",
    readingAudio: "Lendo áudio...",
    readingFile: "Lendo arquivo...",
    readingFileProgress: "Lendo arquivo... {percent}%",
    decodingAudio: "Decodificando áudio...",
    buildingWaveform: "Criando forma de onda...",
    findingSilence: "Buscando pausas longas...",
    chooseAudioFile: "Escolha um arquivo de áudio.",
    decodeError: "Este arquivo não pôde ser decodificado pelo navegador.",
    silenceStatus: "Pausas longas detectadas: {count}",
  },
  ru: {
    language: "Язык",
    openAudio: "Открыть аудио",
    audioFileUpload: "Загрузка аудиофайла",
    dropAudio: "Перетащите аудиофайл сюда",
    privacyNote: "Файл остается приватным, локальным и не загружается.",
    supportedFormats: "Поддерживаются MP3, WAV, M4A, AAC, OGG и FLAC.",
    waveformPlayer: "Плеер формы волны",
    noFileLoaded: "Файл не загружен",
    ready: "Готово",
    interactiveWaveform: "Интерактивная звуковая волна",
    playbackPosition: "Позиция воспроизведения",
    play: "Воспроизвести",
    pause: "Пауза",
    nextSound: "Следующий участок",
    timedJumpControls: "Переходы по времени",
    jumpBackward: "Назад",
    jumpForward: "Вперед",
    jumpAmount: "Шаг перехода",
    back: "Назад",
    forward: "Вперед",
    volume: "Громкость",
    speed: "Скорость",
    processingAudio: "Обработка аудио",
    preparingWaveform: "Подготовка формы волны...",
    readingAudio: "Чтение аудио...",
    readingFile: "Чтение файла...",
    readingFileProgress: "Чтение файла... {percent}%",
    decodingAudio: "Декодирование аудио...",
    buildingWaveform: "Построение формы волны...",
    findingSilence: "Поиск длинных пауз...",
    chooseAudioFile: "Выберите аудиофайл.",
    decodeError: "Браузер не смог декодировать этот файл.",
    silenceStatus: "Длинные паузы найдены: {count}",
  },
  hi: {
    language: "भाषा",
    openAudio: "ऑडियो खोलें",
    audioFileUpload: "ऑडियो फ़ाइल अपलोड",
    dropAudio: "ऑडियो फ़ाइल यहां छोड़ें",
    privacyNote: "आपकी फ़ाइल निजी और लोकल रहती है, अपलोड नहीं होती।",
    supportedFormats: "MP3, WAV, M4A, AAC, OGG और FLAC समर्थित हैं।",
    waveformPlayer: "वेवफ़ॉर्म प्लेयर",
    noFileLoaded: "कोई फ़ाइल लोड नहीं है",
    ready: "तैयार",
    interactiveWaveform: "इंटरैक्टिव ऑडियो वेवफ़ॉर्म",
    playbackPosition: "प्लेबैक स्थिति",
    play: "चलाएं",
    pause: "रोकें",
    nextSound: "अगला सेक्शन",
    timedJumpControls: "समय जंप कंट्रोल",
    jumpBackward: "पीछे जाएं",
    jumpForward: "आगे जाएं",
    jumpAmount: "जंप अवधि",
    back: "पीछे",
    forward: "आगे",
    volume: "वॉल्यूम",
    speed: "स्पीड",
    processingAudio: "ऑडियो प्रोसेस हो रहा है",
    preparingWaveform: "वेवफ़ॉर्म तैयार हो रहा है...",
    readingAudio: "ऑडियो पढ़ा जा रहा है...",
    readingFile: "फ़ाइल पढ़ी जा रही है...",
    readingFileProgress: "फ़ाइल पढ़ी जा रही है... {percent}%",
    decodingAudio: "ऑडियो डिकोड हो रहा है...",
    buildingWaveform: "वेवफ़ॉर्म बन रहा है...",
    findingSilence: "लंबे साइलेंस गैप ढूंढे जा रहे हैं...",
    chooseAudioFile: "कोई ऑडियो फ़ाइल चुनें।",
    decodeError: "ब्राउज़र इस फ़ाइल को डिकोड नहीं कर सका।",
    silenceStatus: "{count} लंबे साइलेंस गैप मिले",
  },
  ja: {
    language: "言語",
    openAudio: "音声を開く",
    audioFileUpload: "音声ファイルをアップロード",
    dropAudio: "ここに音声ファイルをドロップ",
    privacyNote: "ファイルはローカルでのみ処理され、アップロードされません。",
    supportedFormats: "MP3、WAV、M4A、AAC、OGG、FLAC に対応しています。",
    waveformPlayer: "波形プレーヤー",
    noFileLoaded: "ファイルが読み込まれていません",
    ready: "準備完了",
    interactiveWaveform: "操作できる音声波形",
    playbackPosition: "再生位置",
    play: "再生",
    pause: "一時停止",
    nextSound: "次の区間",
    timedJumpControls: "時間ジャンプ操作",
    jumpBackward: "戻る",
    jumpForward: "進む",
    jumpAmount: "ジャンプ量",
    back: "戻る",
    forward: "進む",
    volume: "音量",
    speed: "速度",
    processingAudio: "音声を処理中",
    preparingWaveform: "波形を準備中...",
    readingAudio: "音声を読み込み中...",
    readingFile: "ファイルを読み込み中...",
    readingFileProgress: "ファイルを読み込み中... {percent}%",
    decodingAudio: "音声をデコード中...",
    buildingWaveform: "波形を作成中...",
    findingSilence: "長い無音区間を検出中...",
    chooseAudioFile: "音声ファイルを選択してください。",
    decodeError: "このファイルはブラウザでデコードできませんでした。",
    silenceStatus: "長い無音区間を{count}件検出しました",
  },
  ko: {
    language: "언어",
    openAudio: "오디오 열기",
    audioFileUpload: "오디오 파일 업로드",
    dropAudio: "여기에 오디오 파일을 놓으세요",
    privacyNote: "파일은 로컬에서만 처리되며 업로드되지 않습니다.",
    supportedFormats: "MP3, WAV, M4A, AAC, OGG, FLAC을 지원합니다.",
    waveformPlayer: "파형 플레이어",
    noFileLoaded: "불러온 파일 없음",
    ready: "준비됨",
    interactiveWaveform: "대화형 오디오 파형",
    playbackPosition: "재생 위치",
    play: "재생",
    pause: "일시정지",
    nextSound: "다음 구간",
    timedJumpControls: "시간 이동 컨트롤",
    jumpBackward: "뒤로 이동",
    jumpForward: "앞으로 이동",
    jumpAmount: "이동 시간",
    back: "뒤로",
    forward: "앞으로",
    volume: "볼륨",
    speed: "속도",
    processingAudio: "오디오 처리 중",
    preparingWaveform: "파형 준비 중...",
    readingAudio: "오디오 읽는 중...",
    readingFile: "파일 읽는 중...",
    readingFileProgress: "파일 읽는 중... {percent}%",
    decodingAudio: "오디오 디코딩 중...",
    buildingWaveform: "파형 만드는 중...",
    findingSilence: "긴 무음 구간 찾는 중...",
    chooseAudioFile: "오디오 파일을 선택하세요.",
    decodeError: "이 파일은 브라우저에서 디코딩할 수 없습니다.",
    silenceStatus: "긴 무음 구간 {count}개를 찾았습니다",
  },
  "zh-CN": {
    language: "语言",
    openAudio: "打开音频",
    audioFileUpload: "上传音频文件",
    dropAudio: "将音频文件拖到这里",
    privacyNote: "你的文件只在本地处理，不会上传。",
    supportedFormats: "支持 MP3、WAV、M4A、AAC、OGG 和 FLAC。",
    waveformPlayer: "波形播放器",
    noFileLoaded: "未加载文件",
    ready: "准备就绪",
    interactiveWaveform: "可交互音频波形",
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
    findingSilence: "正在查找较长静音段...",
    chooseAudioFile: "请选择一个音频文件。",
    decodeError: "浏览器无法解码此文件。",
    silenceStatus: "检测到 {count} 个较长静音段",
  },
  "zh-TW": {
    language: "語言",
    openAudio: "開啟音訊",
    audioFileUpload: "上傳音訊檔",
    dropAudio: "將音訊檔拖放到這裡",
    privacyNote: "你的檔案只會在本機處理，不會上傳。",
    supportedFormats: "支援 MP3、WAV、M4A、AAC、OGG 和 FLAC。",
    waveformPlayer: "波形播放器",
    noFileLoaded: "尚未載入檔案",
    ready: "準備就緒",
    interactiveWaveform: "可互動音訊波形",
    playbackPosition: "播放位置",
    play: "播放",
    pause: "暫停",
    nextSound: "下一段",
    timedJumpControls: "定時跳轉控制",
    jumpBackward: "向後跳轉",
    jumpForward: "向前跳轉",
    jumpAmount: "跳轉長度",
    back: "返回",
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
    findingSilence: "正在尋找較長靜音段...",
    chooseAudioFile: "請選擇一個音訊檔。",
    decodeError: "瀏覽器無法解碼此檔案。",
    silenceStatus: "偵測到 {count} 個較長靜音段",
  },
};

const state = {
  language: getPreferredLanguage(),
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
const ANALYSIS_CHUNK_DURATION_MS = 16;

document.querySelector(".language-control").addEventListener("click", (event) => {
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
    setJumpMenuOpen(false);
    setLanguageMenuOpen(false);
    if (document.activeElement?.closest(".jump-amount-wrap")) {
      jumpAmount.focus();
    } else if (document.activeElement?.closest(".language-control")) {
      languageSelect.focus();
    }
  }
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

updateRangeFill(timeline);
updateRangeFill(volumeSlider);
updateRangeFill(speedSlider);

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

waveformWrap.addEventListener("contextmenu", (event) => {
  event.preventDefault();
});

window.addEventListener("resize", resizeCanvas);
document.addEventListener("keydown", handleKeyboardControls);
setLanguage(state.language, false);
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
  updateRangeFill(timeline);
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
  updateRangeFill(volumeSlider);

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

  speedValue.textContent = `${speed.toFixed(2)}x`;
  updateRangeFill(speedSlider);
}

function setJumpAmount(seconds) {
  state.jumpAmount = seconds;
  jumpAmount.value = String(seconds);
  jumpAmountValue.textContent = `${seconds}s`;
  jumpAmountOptions.forEach((option) => {
    option.setAttribute("aria-selected", String(Number(option.dataset.value) === seconds));
  });
}

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
  }
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

function getPreferredLanguage() {
  const supportedLanguages = Object.keys(translations);
  const preferredLanguages = navigator.languages?.length ? navigator.languages : [navigator.language];

  for (const language of preferredLanguages) {
    if (!language) {
      continue;
    }

    if (supportedLanguages.includes(language)) {
      return language;
    }

    const baseLanguage = language.split("-")[0];
    const match = supportedLanguages.find((item) => item === baseLanguage || item.startsWith(`${baseLanguage}-`));
    if (match) {
      return match;
    }
  }

  return "en";
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
  const icon = isPlaying ? "pause" : "play_arrow";
  playButton.setAttribute("aria-label", label);
  playButton.innerHTML = `
    <span class="material-symbols-sharp ui-icon" aria-hidden="true">${icon}</span>
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
  input.style.setProperty("--range-fill", `${Math.min(100, Math.max(0, percent))}%`);
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
