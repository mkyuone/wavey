const fileInput = document.querySelector("#fileInput");
const APP_VERSION = "1.0.3";
const APP_VERSION_CHANNEL = "";
const APP_VERSION_LABEL = APP_VERSION_CHANNEL ? `${APP_VERSION}-${APP_VERSION_CHANNEL}` : APP_VERSION;
window.APP_VERSION = APP_VERSION;
window.APP_VERSION_CHANNEL = APP_VERSION_CHANNEL;
window.APP_VERSION_LABEL = APP_VERSION_LABEL;
const settingsButton = document.querySelector("#settingsButton");
const settingsBackdrop = document.querySelector("#settingsBackdrop");
const settingsModal = document.querySelector("#settingsModal");
const settingsClose = document.querySelector("#settingsClose");
const licenseButton = document.querySelector("#licenseButton");
const licenseBackdrop = document.querySelector("#licenseBackdrop");
const licenseClose = document.querySelector("#licenseClose");
const resetSettings = document.querySelector("#resetSettings");
const languageControl = document.querySelector(".language-control");
const languageSelect = document.querySelector("#languageSelect");
const dropOpenButton = document.querySelector("#dropOpenButton");
const dropZone = document.querySelector("#dropZone");
const dropError = document.querySelector("#dropError");
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
const colorSchemeQuery = window.matchMedia?.("(prefers-color-scheme: dark)");
const themeOptions = [...document.querySelectorAll("input[name='themeMode']")];
const silenceThresholdInput = document.querySelector("#silenceThresholdInput");
const silenceThresholdValue = document.querySelector("#silenceThresholdValue");
const minSilenceInput = document.querySelector("#minSilenceInput");
const minSilenceValue = document.querySelector("#minSilenceValue");
const minAudibleInput = document.querySelector("#minAudibleInput");
const minAudibleValue = document.querySelector("#minAudibleValue");
const transcriptionSettingsSection = document.querySelector("#transcriptionSettingsSection");
const transcriptionEnabledInput = document.querySelector("#transcriptionEnabledInput");
const transcriptionLanguageSelect = document.querySelector("#transcriptionLanguageSelect");
const transcriptionLanguageControl = document.querySelector("#transcriptionLanguageControl");
const transcriptionLanguageValue = document.querySelector(".transcription-language-value");
const transcriptionLanguageMenu = document.querySelector("#transcriptionLanguageMenu");
const transcriptionLanguageOptions = [...document.querySelectorAll("#transcriptionLanguageMenu [role='option']")];
const sttWebGpuState = document.querySelector("#sttWebGpuState");
const sttModelState = document.querySelector("#sttModelState");
const sttStateList = document.querySelector(".stt-state-list");
const sttModelActions = document.querySelector("#sttModelActions");
const downloadModelButton = document.querySelector("#downloadModelButton");
const sttSettingsStatus = document.querySelector("#sttSettingsStatus");
const sttUnsupportedMessage = document.querySelector("#sttUnsupportedMessage");
const transcribeButton = document.querySelector("#transcribeButton");
const transcriptButton = document.querySelector("#transcriptButton");
const subtitleButton = document.querySelector("#subtitleButton");
const transcriptStatus = document.querySelector("#transcriptStatus");
const transcriptBackdrop = document.querySelector("#transcriptBackdrop");
const transcriptClose = document.querySelector("#transcriptClose");
const transcriptList = document.querySelector("#transcriptList");
const subtitleWindow = document.querySelector("#subtitleWindow");
const subtitleDragHandle = document.querySelector("#subtitleDragHandle");
const subtitleClose = document.querySelector("#subtitleClose");
const subtitleText = document.querySelector("#subtitleText");

const translations = {
  en: {
    language: "Language",
    settings: "Settings",
    closeSettings: "Close settings",
    closeLicenses: "Close licenses",
    displaySettings: "Display",
    theme: "Theme",
    themeAuto: "Auto",
    themeDark: "Dark",
    themeLight: "Light",
    detectionSettings: "Silence detection",
    silenceThreshold: "Silence threshold",
    minSilenceLength: "Minimum silence length",
    minAudibleLength: "Minimum audible length",
    keyboardShortcuts: "Keyboard shortcuts",
    keySpace: "Space",
    keyEscape: "Esc",
    shortcutPlayPause: "Play or pause",
    shortcutJumpBack: "Jump back",
    shortcutJumpForward: "Jump forward",
    shortcutNextSection: "Next section",
    shortcutCloseSettings: "Close settings",
    resetDefaults: "Reset defaults",
    licenses: "Licenses",
    openSourceLicenses: "Open source licenses",
    materialSymbolsLicense: "Material Symbols",
    materialSymbolsLicenseSummary: "Material Symbols fonts are provided by Google and licensed under the Apache License, Version 2.0.",
    openAudio: "Open audio",
    audioFileUpload: "Audio file upload",
    dropAudio: "Drop an audio file here",
    privacyNote: "Your file stays private, local, and is not uploaded.",
    supportedFormats: "Supports common audio and video formats.",
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
    extractingAudio: "Extracting audio from video...",
    buildingWaveform: "Building waveform...",
    findingSilence: "Finding long silence gaps...",
    chooseAudioFile: "Choose an audio or video file.",
    unsupportedFile: "This file type is not supported. Choose a common audio or video file.",
    decodeError: "This file could not be decoded by the browser. Try a common audio or video format.",
    silenceStatus: "{count} long silence gap{plural} detected",
    transcriptionSettings: "Transcription",
    enableTranscription: "Enable transcription",
    transcriptionLanguage: "Transcription language",
    transcriptionAuto: "Auto",
    transcriptionEnglish: "English",
    transcriptionChinese: "Chinese",
    transcriptionJapanese: "Japanese",
    transcriptionKorean: "Korean",
    transcriptionSpanish: "Spanish",
    transcriptionFrench: "French",
    transcriptionGerman: "German",
    transcriptionPortuguese: "Portuguese",
    transcriptionRussian: "Russian",
    transcriptionHindi: "Hindi",
    sttCapability: "Capability",
    sttWebGpuSupported: "WebGPU supported",
    sttWebGpuUnsupported: "WebGPU not supported",
    sttModelDownloaded: "Model downloaded",
    sttModelNotDownloaded: "Model not downloaded",
    sttUnsupportedMessage: "Transcription is not supported on this device/browser.",
    transcribe: "Transcribe",
    transcript: "Transcript",
    subtitles: "Subtitles",
    closeTranscript: "Close transcript",
    closeSubtitles: "Close subtitles",
    transcriptEmpty: "No transcript yet.",
    transcriptReady: "Transcript ready",
    transcriptCached: "Transcript restored from local cache",
    downloadModel: "Download model",
    downloadModelFirst: "Download the model before enabling transcription.",
    sttPreparing: "Preparing transcription...",
    sttHashingFile: "Hashing file...",
    sttDownloadingModel: "Downloading model: {loaded} MB / {total} MB",
    sttDownloadUnknown: "Downloading model: {loaded} MB",
    sttVerifyingModel: "Verifying model...",
    sttModelMismatch: "Downloaded model did not match the expected checksum.",
    sttModelUnavailable: "Model download is unavailable. Check the static model host.",
    sttPlanningChunks: "Planning transcript chunks...",
    sttTranscribing: "Transcribing {current} / {total} chunks ({percent}%)",
    sttNoSpeech: "No speech found to transcribe.",
    sttFailed: "Transcription failed. Try again with a shorter file.",
    subtitlePlaceholder: "Subtitles will appear during playback.",
  },
  es: {
    language: "Idioma",
    settings: "Ajustes",
    closeSettings: "Cerrar ajustes",
    closeLicenses: "Cerrar licencias",
    displaySettings: "Pantalla",
    theme: "Tema",
    themeAuto: "Automático",
    themeDark: "Oscuro",
    themeLight: "Claro",
    detectionSettings: "Detección de silencio",
    silenceThreshold: "Umbral de silencio",
    minSilenceLength: "Silencio mínimo",
    minAudibleLength: "Audio mínimo",
    keyboardShortcuts: "Atajos de teclado",
    keySpace: "Espacio",
    keyEscape: "Esc",
    shortcutPlayPause: "Reproducir o pausar",
    shortcutJumpBack: "Saltar atrás",
    shortcutJumpForward: "Saltar adelante",
    shortcutNextSection: "Siguiente sección",
    shortcutCloseSettings: "Cerrar ajustes",
    resetDefaults: "Restablecer valores",
    licenses: "Licencias",
    openSourceLicenses: "Licencias de código abierto",
    materialSymbolsLicense: "Material Symbols",
    materialSymbolsLicenseSummary: "Las fuentes Material Symbols son proporcionadas por Google y están bajo la licencia Apache, versión 2.0.",
    openAudio: "Abrir audio",
    audioFileUpload: "Subir archivo de audio",
    dropAudio: "Suelta un archivo de audio aquí",
    privacyNote: "Tu archivo sigue siendo privado, local y no se sube.",
    supportedFormats: "Compatible con formatos comunes de audio y video.",
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
    extractingAudio: "Extrayendo audio del video...",
    buildingWaveform: "Creando forma de onda...",
    findingSilence: "Buscando pausas largas...",
    chooseAudioFile: "Elige un archivo de audio o video.",
    unsupportedFile: "Este tipo de archivo no es compatible. Elige un archivo común de audio o video.",
    decodeError: "El navegador no pudo decodificar este archivo. Prueba un formato común de audio o video.",
    silenceStatus: "Pausas largas detectadas: {count}",
  },
  fr: {
    language: "Langue",
    settings: "Réglages",
    closeSettings: "Fermer les réglages",
    closeLicenses: "Fermer les licences",
    displaySettings: "Affichage",
    theme: "Thème",
    themeAuto: "Auto",
    themeDark: "Sombre",
    themeLight: "Clair",
    detectionSettings: "Détection du silence",
    silenceThreshold: "Seuil de silence",
    minSilenceLength: "Silence minimum",
    minAudibleLength: "Audio minimum",
    keyboardShortcuts: "Raccourcis clavier",
    keySpace: "Espace",
    keyEscape: "Échap",
    shortcutPlayPause: "Lire ou mettre en pause",
    shortcutJumpBack: "Reculer",
    shortcutJumpForward: "Avancer",
    shortcutNextSection: "Section suivante",
    shortcutCloseSettings: "Fermer les réglages",
    resetDefaults: "Réinitialiser",
    licenses: "Licences",
    openSourceLicenses: "Licences open source",
    materialSymbolsLicense: "Material Symbols",
    materialSymbolsLicenseSummary: "Les polices Material Symbols sont fournies par Google et sous licence Apache, version 2.0.",
    openAudio: "Ouvrir un audio",
    audioFileUpload: "Importer un fichier audio",
    dropAudio: "Déposez un fichier audio ici",
    privacyNote: "Votre fichier reste privé, local et n’est pas envoyé.",
    supportedFormats: "Prend en charge les formats audio et vidéo courants.",
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
    extractingAudio: "Extraction de l’audio de la vidéo...",
    buildingWaveform: "Création de la forme d’onde...",
    findingSilence: "Recherche des longues pauses...",
    chooseAudioFile: "Choisissez un fichier audio ou vidéo.",
    unsupportedFile: "Ce type de fichier n’est pas pris en charge. Choisissez un fichier audio ou vidéo courant.",
    decodeError: "Ce fichier n’a pas pu être décodé par le navigateur. Essayez un format audio ou vidéo courant.",
    silenceStatus: "Longues pauses détectées : {count}",
  },
  de: {
    language: "Sprache",
    settings: "Einstellungen",
    closeSettings: "Einstellungen schließen",
    closeLicenses: "Lizenzen schließen",
    displaySettings: "Anzeige",
    theme: "Design",
    themeAuto: "Automatisch",
    themeDark: "Dunkel",
    themeLight: "Hell",
    detectionSettings: "Stilleerkennung",
    silenceThreshold: "Stille-Schwelle",
    minSilenceLength: "Mindeststille",
    minAudibleLength: "Mindestaudio",
    keyboardShortcuts: "Tastenkürzel",
    keySpace: "Leertaste",
    keyEscape: "Esc",
    shortcutPlayPause: "Abspielen oder pausieren",
    shortcutJumpBack: "Zurückspringen",
    shortcutJumpForward: "Vorspringen",
    shortcutNextSection: "Nächster Abschnitt",
    shortcutCloseSettings: "Einstellungen schließen",
    resetDefaults: "Zurücksetzen",
    licenses: "Lizenzen",
    openSourceLicenses: "Open-Source-Lizenzen",
    materialSymbolsLicense: "Material Symbols",
    materialSymbolsLicenseSummary: "Material Symbols-Schriften werden von Google bereitgestellt und unter der Apache-Lizenz, Version 2.0, lizenziert.",
    openAudio: "Audio öffnen",
    audioFileUpload: "Audiodatei hochladen",
    dropAudio: "Audiodatei hier ablegen",
    privacyNote: "Deine Datei bleibt privat, lokal und wird nicht hochgeladen.",
    supportedFormats: "Unterstützt gängige Audio- und Videoformate.",
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
    extractingAudio: "Audio wird aus dem Video extrahiert...",
    buildingWaveform: "Wellenform wird erstellt...",
    findingSilence: "Lange Stillepausen werden gesucht...",
    chooseAudioFile: "Wähle eine Audio- oder Videodatei.",
    unsupportedFile: "Dieser Dateityp wird nicht unterstützt. Wähle eine gängige Audio- oder Videodatei.",
    decodeError: "Diese Datei konnte vom Browser nicht decodiert werden. Versuche ein gängiges Audio- oder Videoformat.",
    silenceStatus: "Lange Stillepausen erkannt: {count}",
  },
  "pt-BR": {
    language: "Idioma",
    settings: "Configurações",
    closeSettings: "Fechar configurações",
    closeLicenses: "Fechar licenças",
    displaySettings: "Exibição",
    theme: "Tema",
    themeAuto: "Auto",
    themeDark: "Escuro",
    themeLight: "Claro",
    detectionSettings: "Detecção de silêncio",
    silenceThreshold: "Limiar de silêncio",
    minSilenceLength: "Silêncio mínimo",
    minAudibleLength: "Áudio mínimo",
    keyboardShortcuts: "Atalhos de teclado",
    keySpace: "Espaço",
    keyEscape: "Esc",
    shortcutPlayPause: "Reproduzir ou pausar",
    shortcutJumpBack: "Voltar",
    shortcutJumpForward: "Avançar",
    shortcutNextSection: "Próxima seção",
    shortcutCloseSettings: "Fechar configurações",
    resetDefaults: "Restaurar padrões",
    licenses: "Licenças",
    openSourceLicenses: "Licenças de código aberto",
    materialSymbolsLicense: "Material Symbols",
    materialSymbolsLicenseSummary: "As fontes Material Symbols são fornecidas pelo Google e licenciadas sob a Licença Apache, versão 2.0.",
    openAudio: "Abrir áudio",
    audioFileUpload: "Enviar arquivo de áudio",
    dropAudio: "Solte um arquivo de áudio aqui",
    privacyNote: "Seu arquivo continua privado, local e não é enviado.",
    supportedFormats: "Compatível com formatos comuns de áudio e vídeo.",
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
    extractingAudio: "Extraindo áudio do vídeo...",
    buildingWaveform: "Criando forma de onda...",
    findingSilence: "Buscando pausas longas...",
    chooseAudioFile: "Escolha um arquivo de áudio ou vídeo.",
    unsupportedFile: "Este tipo de arquivo não é compatível. Escolha um arquivo comum de áudio ou vídeo.",
    decodeError: "Este arquivo não pôde ser decodificado pelo navegador. Tente um formato comum de áudio ou vídeo.",
    silenceStatus: "Pausas longas detectadas: {count}",
  },
  ru: {
    language: "Язык",
    settings: "Настройки",
    closeSettings: "Закрыть настройки",
    closeLicenses: "Закрыть лицензии",
    displaySettings: "Отображение",
    theme: "Тема",
    themeAuto: "Авто",
    themeDark: "Темная",
    themeLight: "Светлая",
    detectionSettings: "Определение тишины",
    silenceThreshold: "Порог тишины",
    minSilenceLength: "Минимальная тишина",
    minAudibleLength: "Минимальный звук",
    keyboardShortcuts: "Горячие клавиши",
    keySpace: "Пробел",
    keyEscape: "Esc",
    shortcutPlayPause: "Воспроизвести или пауза",
    shortcutJumpBack: "Назад",
    shortcutJumpForward: "Вперед",
    shortcutNextSection: "Следующий участок",
    shortcutCloseSettings: "Закрыть настройки",
    resetDefaults: "Сбросить настройки",
    licenses: "Лицензии",
    openSourceLicenses: "Лицензии открытого кода",
    materialSymbolsLicense: "Material Symbols",
    materialSymbolsLicenseSummary: "Шрифты Material Symbols предоставляются Google и лицензируются по лицензии Apache версии 2.0.",
    openAudio: "Открыть аудио",
    audioFileUpload: "Загрузка аудиофайла",
    dropAudio: "Перетащите аудиофайл сюда",
    privacyNote: "Файл остается приватным, локальным и не загружается.",
    supportedFormats: "Поддерживаются распространенные форматы аудио и видео.",
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
    extractingAudio: "Извлечение аудио из видео...",
    buildingWaveform: "Построение формы волны...",
    findingSilence: "Поиск длинных пауз...",
    chooseAudioFile: "Выберите аудио- или видеофайл.",
    unsupportedFile: "Этот тип файла не поддерживается. Выберите распространенный аудио- или видеофайл.",
    decodeError: "Браузер не смог декодировать этот файл. Попробуйте распространенный формат аудио или видео.",
    silenceStatus: "Длинные паузы найдены: {count}",
  },
  hi: {
    language: "भाषा",
    settings: "सेटिंग्स",
    closeSettings: "सेटिंग्स बंद करें",
    closeLicenses: "लाइसेंस बंद करें",
    displaySettings: "डिस्प्ले",
    theme: "थीम",
    themeAuto: "ऑटो",
    themeDark: "डार्क",
    themeLight: "लाइट",
    detectionSettings: "साइलेंस डिटेक्शन",
    silenceThreshold: "साइलेंस थ्रेशहोल्ड",
    minSilenceLength: "न्यूनतम साइलेंस",
    minAudibleLength: "न्यूनतम ऑडियो",
    keyboardShortcuts: "कीबोर्ड शॉर्टकट",
    keySpace: "स्पेस",
    keyEscape: "Esc",
    shortcutPlayPause: "चलाएं या रोकें",
    shortcutJumpBack: "पीछे जाएं",
    shortcutJumpForward: "आगे जाएं",
    shortcutNextSection: "अगला सेक्शन",
    shortcutCloseSettings: "सेटिंग्स बंद करें",
    resetDefaults: "डिफ़ॉल्ट रीसेट करें",
    licenses: "लाइसेंस",
    openSourceLicenses: "ओपन सोर्स लाइसेंस",
    materialSymbolsLicense: "Material Symbols",
    materialSymbolsLicenseSummary: "Material Symbols फ़ॉन्ट Google द्वारा प्रदान किए जाते हैं और Apache License, Version 2.0 के तहत लाइसेंस प्राप्त हैं।",
    openAudio: "ऑडियो खोलें",
    audioFileUpload: "ऑडियो फ़ाइल अपलोड",
    dropAudio: "ऑडियो फ़ाइल यहां छोड़ें",
    privacyNote: "आपकी फ़ाइल निजी और लोकल रहती है, अपलोड नहीं होती।",
    supportedFormats: "सामान्य ऑडियो और वीडियो फ़ॉर्मैट समर्थित हैं।",
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
    extractingAudio: "वीडियो से ऑडियो निकाला जा रहा है...",
    buildingWaveform: "वेवफ़ॉर्म बन रहा है...",
    findingSilence: "लंबे साइलेंस गैप ढूंढे जा रहे हैं...",
    chooseAudioFile: "ऑडियो या वीडियो फ़ाइल चुनें।",
    unsupportedFile: "यह फ़ाइल प्रकार समर्थित नहीं है। सामान्य ऑडियो या वीडियो फ़ाइल चुनें।",
    decodeError: "ब्राउज़र इस फ़ाइल को डिकोड नहीं कर सका। कोई सामान्य ऑडियो या वीडियो फ़ॉर्मैट आज़माएँ।",
    silenceStatus: "{count} लंबे साइलेंस गैप मिले",
  },
  ja: {
    language: "言語",
    settings: "設定",
    closeSettings: "設定を閉じる",
    closeLicenses: "ライセンスを閉じる",
    displaySettings: "表示",
    theme: "テーマ",
    themeAuto: "自動",
    themeDark: "ダーク",
    themeLight: "ライト",
    detectionSettings: "無音検出",
    silenceThreshold: "無音しきい値",
    minSilenceLength: "最短無音時間",
    minAudibleLength: "最短有音時間",
    keyboardShortcuts: "キーボードショートカット",
    keySpace: "スペース",
    keyEscape: "Esc",
    shortcutPlayPause: "再生または一時停止",
    shortcutJumpBack: "戻る",
    shortcutJumpForward: "進む",
    shortcutNextSection: "次の区間",
    shortcutCloseSettings: "設定を閉じる",
    resetDefaults: "初期値に戻す",
    licenses: "ライセンス",
    openSourceLicenses: "オープンソースライセンス",
    materialSymbolsLicense: "Material Symbols",
    materialSymbolsLicenseSummary: "Material Symbols フォントは Google により提供され、Apache License, Version 2.0 のもとでライセンスされています。",
    openAudio: "音声を開く",
    audioFileUpload: "音声ファイルをアップロード",
    dropAudio: "ここに音声ファイルをドロップ",
    privacyNote: "ファイルはローカルでのみ処理され、アップロードされません。",
    supportedFormats: "一般的な音声・動画形式に対応しています。",
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
    extractingAudio: "動画から音声を抽出中...",
    buildingWaveform: "波形を作成中...",
    findingSilence: "長い無音区間を検出中...",
    chooseAudioFile: "音声または動画ファイルを選択してください。",
    unsupportedFile: "このファイル形式には対応していません。一般的な音声または動画ファイルを選択してください。",
    decodeError: "このファイルはブラウザでデコードできませんでした。一般的な音声または動画形式を試してください。",
    silenceStatus: "長い無音区間を{count}件検出しました",
  },
  ko: {
    language: "언어",
    settings: "설정",
    closeSettings: "설정 닫기",
    closeLicenses: "라이선스 닫기",
    displaySettings: "화면",
    theme: "테마",
    themeAuto: "자동",
    themeDark: "어둡게",
    themeLight: "밝게",
    detectionSettings: "무음 감지",
    silenceThreshold: "무음 임계값",
    minSilenceLength: "최소 무음 길이",
    minAudibleLength: "최소 오디오 길이",
    keyboardShortcuts: "키보드 단축키",
    keySpace: "스페이스",
    keyEscape: "Esc",
    shortcutPlayPause: "재생 또는 일시정지",
    shortcutJumpBack: "뒤로 이동",
    shortcutJumpForward: "앞으로 이동",
    shortcutNextSection: "다음 구간",
    shortcutCloseSettings: "설정 닫기",
    resetDefaults: "기본값 재설정",
    licenses: "라이선스",
    openSourceLicenses: "오픈소스 라이선스",
    materialSymbolsLicense: "Material Symbols",
    materialSymbolsLicenseSummary: "Material Symbols 글꼴은 Google에서 제공하며 Apache License, Version 2.0에 따라 라이선스됩니다.",
    openAudio: "오디오 열기",
    audioFileUpload: "오디오 파일 업로드",
    dropAudio: "여기에 오디오 파일을 놓으세요",
    privacyNote: "파일은 로컬에서만 처리되며 업로드되지 않습니다.",
    supportedFormats: "일반적인 오디오 및 비디오 형식을 지원합니다.",
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
    extractingAudio: "비디오에서 오디오 추출 중...",
    buildingWaveform: "파형 만드는 중...",
    findingSilence: "긴 무음 구간 찾는 중...",
    chooseAudioFile: "오디오 또는 비디오 파일을 선택하세요.",
    unsupportedFile: "이 파일 형식은 지원되지 않습니다. 일반적인 오디오 또는 비디오 파일을 선택하세요.",
    decodeError: "브라우저에서 이 파일을 디코딩할 수 없습니다. 일반적인 오디오 또는 비디오 형식을 사용해 보세요.",
    silenceStatus: "긴 무음 구간 {count}개를 찾았습니다",
  },
  "zh-CN": {
    language: "语言",
    settings: "设置",
    closeSettings: "关闭设置",
    closeLicenses: "关闭许可证",
    displaySettings: "显示",
    theme: "主题",
    themeAuto: "自动",
    themeDark: "深色",
    themeLight: "浅色",
    detectionSettings: "静音检测",
    silenceThreshold: "静音阈值",
    minSilenceLength: "最短静音时长",
    minAudibleLength: "最短有声时长",
    keyboardShortcuts: "键盘快捷键",
    keySpace: "空格",
    keyEscape: "Esc",
    shortcutPlayPause: "播放或暂停",
    shortcutJumpBack: "向后跳转",
    shortcutJumpForward: "向前跳转",
    shortcutNextSection: "下一段",
    shortcutCloseSettings: "关闭设置",
    resetDefaults: "恢复默认",
    licenses: "许可证",
    openSourceLicenses: "开源许可证",
    materialSymbolsLicense: "Material Symbols",
    materialSymbolsLicenseSummary: "Material Symbols 字体由 Google 提供，并根据 Apache License, Version 2.0 授权。",
    openAudio: "打开音频",
    audioFileUpload: "上传音频文件",
    dropAudio: "将音频文件拖到这里",
    privacyNote: "你的文件只在本地处理，不会上传。",
    supportedFormats: "支持常见音频和视频格式。",
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
    extractingAudio: "正在从视频中提取音频...",
    buildingWaveform: "正在生成波形...",
    findingSilence: "正在查找较长静音段...",
    chooseAudioFile: "请选择音频或视频文件。",
    unsupportedFile: "不支持此文件类型。请选择常见的音频或视频文件。",
    decodeError: "浏览器无法解码此文件。请尝试常见的音频或视频格式。",
    silenceStatus: "检测到 {count} 个较长静音段",
  },
  "zh-TW": {
    language: "語言",
    settings: "設定",
    closeSettings: "關閉設定",
    closeLicenses: "關閉授權條款",
    displaySettings: "顯示",
    theme: "主題",
    themeAuto: "自動",
    themeDark: "深色",
    themeLight: "淺色",
    detectionSettings: "靜音偵測",
    silenceThreshold: "靜音閾值",
    minSilenceLength: "最短靜音長度",
    minAudibleLength: "最短有聲長度",
    keyboardShortcuts: "鍵盤快捷鍵",
    keySpace: "空白鍵",
    keyEscape: "Esc",
    shortcutPlayPause: "播放或暫停",
    shortcutJumpBack: "向後跳轉",
    shortcutJumpForward: "向前跳轉",
    shortcutNextSection: "下一段",
    shortcutCloseSettings: "關閉設定",
    resetDefaults: "恢復預設",
    licenses: "授權條款",
    openSourceLicenses: "開源授權條款",
    materialSymbolsLicense: "Material Symbols",
    materialSymbolsLicenseSummary: "Material Symbols 字型由 Google 提供，並依 Apache License, Version 2.0 授權。",
    openAudio: "開啟音訊",
    audioFileUpload: "上傳音訊檔",
    dropAudio: "將音訊檔拖放到這裡",
    privacyNote: "你的檔案只會在本機處理，不會上傳。",
    supportedFormats: "支援常見音訊和影片格式。",
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
    extractingAudio: "正在從影片中擷取音訊...",
    buildingWaveform: "正在產生波形...",
    findingSilence: "正在尋找較長靜音段...",
    chooseAudioFile: "請選擇音訊或影片檔。",
    unsupportedFile: "不支援此檔案類型。請選擇常見的音訊或影片檔。",
    decodeError: "瀏覽器無法解碼此檔案。請嘗試常見的音訊或影片格式。",
    silenceStatus: "偵測到 {count} 個較長靜音段",
  },
};

const sttTranslations = {
  es: {
    transcriptionSettings: "Transcripción",
    enableTranscription: "Activar transcripción",
    transcriptionLanguage: "Idioma de transcripción",
    transcriptionAuto: "Auto",
    transcriptionEnglish: "Inglés",
    transcriptionChinese: "Chino",
    transcriptionJapanese: "Japonés",
    transcriptionKorean: "Coreano",
    transcriptionSpanish: "Español",
    transcriptionFrench: "Francés",
    transcriptionGerman: "Alemán",
    transcriptionPortuguese: "Portugués",
    transcriptionRussian: "Ruso",
    transcriptionHindi: "Hindi",
    sttCapability: "Capacidad",
    sttWebGpuSupported: "WebGPU compatible",
    sttWebGpuUnsupported: "WebGPU no compatible",
    sttModelDownloaded: "Modelo descargado",
    sttModelNotDownloaded: "Modelo no descargado",
    sttUnsupportedMessage: "La transcripción no es compatible con este dispositivo o navegador.",
    transcribe: "Transcribir",
    transcript: "Transcripción",
    subtitles: "Subtítulos",
    closeTranscript: "Cerrar transcripción",
    closeSubtitles: "Cerrar subtítulos",
    transcriptEmpty: "Aún no hay transcripción.",
    transcriptReady: "Transcripción lista",
    transcriptCached: "Transcripción restaurada desde la caché local",
    downloadModel: "Descargar modelo",
    downloadModelFirst: "Descarga el modelo antes de activar la transcripción.",
    sttPreparing: "Preparando transcripción...",
    sttHashingFile: "Calculando hash del archivo...",
    sttDownloadingModel: "Descargando modelo: {loaded} MB / {total} MB",
    sttDownloadUnknown: "Descargando modelo: {loaded} MB",
    sttVerifyingModel: "Verificando modelo...",
    sttModelMismatch: "El modelo descargado no coincide con la suma esperada.",
    sttModelUnavailable: "La descarga del modelo no está disponible. Revisa el host estático.",
    sttPlanningChunks: "Preparando fragmentos...",
    sttTranscribing: "Transcribiendo {current} / {total} fragmentos ({percent}%)",
    sttNoSpeech: "No se encontró voz para transcribir.",
    sttFailed: "La transcripción falló. Prueba con un archivo más corto.",
    subtitlePlaceholder: "Los subtítulos aparecerán durante la reproducción.",
  },
  fr: {
    transcriptionSettings: "Transcription",
    enableTranscription: "Activer la transcription",
    transcriptionLanguage: "Langue de transcription",
    transcriptionAuto: "Auto",
    transcriptionEnglish: "Anglais",
    transcriptionChinese: "Chinois",
    transcriptionJapanese: "Japonais",
    transcriptionKorean: "Coréen",
    transcriptionSpanish: "Espagnol",
    transcriptionFrench: "Français",
    transcriptionGerman: "Allemand",
    transcriptionPortuguese: "Portugais",
    transcriptionRussian: "Russe",
    transcriptionHindi: "Hindi",
    sttCapability: "Capacité",
    sttWebGpuSupported: "WebGPU pris en charge",
    sttWebGpuUnsupported: "WebGPU non pris en charge",
    sttModelDownloaded: "Modèle téléchargé",
    sttModelNotDownloaded: "Modèle non téléchargé",
    sttUnsupportedMessage: "La transcription n’est pas prise en charge sur cet appareil ou navigateur.",
    transcribe: "Transcrire",
    transcript: "Transcription",
    subtitles: "Sous-titres",
    closeTranscript: "Fermer la transcription",
    closeSubtitles: "Fermer les sous-titres",
    transcriptEmpty: "Aucune transcription pour le moment.",
    transcriptReady: "Transcription prête",
    transcriptCached: "Transcription restaurée depuis le cache local",
    downloadModel: "Télécharger le modèle",
    downloadModelFirst: "Téléchargez le modèle avant d’activer la transcription.",
    sttPreparing: "Préparation de la transcription...",
    sttHashingFile: "Empreinte du fichier...",
    sttDownloadingModel: "Téléchargement du modèle : {loaded} MB / {total} MB",
    sttDownloadUnknown: "Téléchargement du modèle : {loaded} MB",
    sttVerifyingModel: "Vérification du modèle...",
    sttModelMismatch: "Le modèle téléchargé ne correspond pas à la somme attendue.",
    sttModelUnavailable: "Le téléchargement du modèle est indisponible. Vérifiez l’hôte statique.",
    sttPlanningChunks: "Préparation des segments...",
    sttTranscribing: "Transcription {current} / {total} segments ({percent}%)",
    sttNoSpeech: "Aucune voix à transcrire.",
    sttFailed: "La transcription a échoué. Essayez un fichier plus court.",
    subtitlePlaceholder: "Les sous-titres apparaîtront pendant la lecture.",
  },
  de: {
    transcriptionSettings: "Transkription",
    enableTranscription: "Transkription aktivieren",
    transcriptionLanguage: "Transkriptionssprache",
    transcriptionAuto: "Auto",
    transcriptionEnglish: "Englisch",
    transcriptionChinese: "Chinesisch",
    transcriptionJapanese: "Japanisch",
    transcriptionKorean: "Koreanisch",
    transcriptionSpanish: "Spanisch",
    transcriptionFrench: "Französisch",
    transcriptionGerman: "Deutsch",
    transcriptionPortuguese: "Portugiesisch",
    transcriptionRussian: "Russisch",
    transcriptionHindi: "Hindi",
    sttCapability: "Unterstützung",
    sttWebGpuSupported: "WebGPU unterstützt",
    sttWebGpuUnsupported: "WebGPU nicht unterstützt",
    sttModelDownloaded: "Modell heruntergeladen",
    sttModelNotDownloaded: "Modell nicht heruntergeladen",
    sttUnsupportedMessage: "Transkription wird auf diesem Gerät oder Browser nicht unterstützt.",
    transcribe: "Transkribieren",
    transcript: "Transkript",
    subtitles: "Untertitel",
    closeTranscript: "Transkript schließen",
    closeSubtitles: "Untertitel schließen",
    transcriptEmpty: "Noch kein Transkript.",
    transcriptReady: "Transkript bereit",
    transcriptCached: "Transkript aus lokalem Cache geladen",
    downloadModel: "Modell herunterladen",
    downloadModelFirst: "Laden Sie das Modell herunter, bevor Sie die Transkription aktivieren.",
    sttPreparing: "Transkription wird vorbereitet...",
    sttHashingFile: "Datei wird gehasht...",
    sttDownloadingModel: "Modell wird heruntergeladen: {loaded} MB / {total} MB",
    sttDownloadUnknown: "Modell wird heruntergeladen: {loaded} MB",
    sttVerifyingModel: "Modell wird geprüft...",
    sttModelMismatch: "Das heruntergeladene Modell passt nicht zur erwarteten Prüfsumme.",
    sttModelUnavailable: "Modelldownload ist nicht verfügbar. Prüfen Sie den statischen Host.",
    sttPlanningChunks: "Transkriptsegmente werden geplant...",
    sttTranscribing: "Transkribiere {current} / {total} Segmente ({percent}%)",
    sttNoSpeech: "Keine Sprache zum Transkribieren gefunden.",
    sttFailed: "Transkription fehlgeschlagen. Versuchen Sie eine kürzere Datei.",
    subtitlePlaceholder: "Untertitel erscheinen während der Wiedergabe.",
  },
  "pt-BR": {
    transcriptionSettings: "Transcrição",
    enableTranscription: "Ativar transcrição",
    transcriptionLanguage: "Idioma da transcrição",
    transcriptionAuto: "Auto",
    transcriptionEnglish: "Inglês",
    transcriptionChinese: "Chinês",
    transcriptionJapanese: "Japonês",
    transcriptionKorean: "Coreano",
    transcriptionSpanish: "Espanhol",
    transcriptionFrench: "Francês",
    transcriptionGerman: "Alemão",
    transcriptionPortuguese: "Português",
    transcriptionRussian: "Russo",
    transcriptionHindi: "Hindi",
    sttCapability: "Capacidade",
    sttWebGpuSupported: "WebGPU compatível",
    sttWebGpuUnsupported: "WebGPU não compatível",
    sttModelDownloaded: "Modelo baixado",
    sttModelNotDownloaded: "Modelo não baixado",
    sttUnsupportedMessage: "A transcrição não é compatível com este dispositivo ou navegador.",
    transcribe: "Transcrever",
    transcript: "Transcrição",
    subtitles: "Legendas",
    closeTranscript: "Fechar transcrição",
    closeSubtitles: "Fechar legendas",
    transcriptEmpty: "Ainda não há transcrição.",
    transcriptReady: "Transcrição pronta",
    transcriptCached: "Transcrição restaurada do cache local",
    downloadModel: "Baixar modelo",
    downloadModelFirst: "Baixe o modelo antes de ativar a transcrição.",
    sttPreparing: "Preparando transcrição...",
    sttHashingFile: "Calculando hash do arquivo...",
    sttDownloadingModel: "Baixando modelo: {loaded} MB / {total} MB",
    sttDownloadUnknown: "Baixando modelo: {loaded} MB",
    sttVerifyingModel: "Verificando modelo...",
    sttModelMismatch: "O modelo baixado não corresponde ao checksum esperado.",
    sttModelUnavailable: "O download do modelo não está disponível. Verifique o host estático.",
    sttPlanningChunks: "Planejando trechos da transcrição...",
    sttTranscribing: "Transcrevendo {current} / {total} trechos ({percent}%)",
    sttNoSpeech: "Nenhuma fala encontrada para transcrever.",
    sttFailed: "A transcrição falhou. Tente um arquivo mais curto.",
    subtitlePlaceholder: "As legendas aparecerão durante a reprodução.",
  },
  ru: {
    transcriptionSettings: "Транскрипция",
    enableTranscription: "Включить транскрипцию",
    transcriptionLanguage: "Язык транскрипции",
    transcriptionAuto: "Авто",
    transcriptionEnglish: "Английский",
    transcriptionChinese: "Китайский",
    transcriptionJapanese: "Японский",
    transcriptionKorean: "Корейский",
    transcriptionSpanish: "Испанский",
    transcriptionFrench: "Французский",
    transcriptionGerman: "Немецкий",
    transcriptionPortuguese: "Португальский",
    transcriptionRussian: "Русский",
    transcriptionHindi: "Хинди",
    sttCapability: "Поддержка",
    sttWebGpuSupported: "WebGPU поддерживается",
    sttWebGpuUnsupported: "WebGPU не поддерживается",
    sttModelDownloaded: "Модель загружена",
    sttModelNotDownloaded: "Модель не загружена",
    sttUnsupportedMessage: "Транскрипция не поддерживается на этом устройстве или в этом браузере.",
    transcribe: "Транскрибировать",
    transcript: "Транскрипт",
    subtitles: "Субтитры",
    closeTranscript: "Закрыть транскрипт",
    closeSubtitles: "Закрыть субтитры",
    transcriptEmpty: "Транскрипта пока нет.",
    transcriptReady: "Транскрипт готов",
    transcriptCached: "Транскрипт восстановлен из локального кэша",
    downloadModel: "Загрузить модель",
    downloadModelFirst: "Загрузите модель перед включением транскрипции.",
    sttPreparing: "Подготовка транскрипции...",
    sttHashingFile: "Хеширование файла...",
    sttDownloadingModel: "Загрузка модели: {loaded} MB / {total} MB",
    sttDownloadUnknown: "Загрузка модели: {loaded} MB",
    sttVerifyingModel: "Проверка модели...",
    sttModelMismatch: "Загруженная модель не совпадает с ожидаемой контрольной суммой.",
    sttModelUnavailable: "Загрузка модели недоступна. Проверьте статический хост.",
    sttPlanningChunks: "Подготовка фрагментов...",
    sttTranscribing: "Транскрипция {current} / {total} фрагментов ({percent}%)",
    sttNoSpeech: "Речь для транскрипции не найдена.",
    sttFailed: "Транскрипция не удалась. Попробуйте более короткий файл.",
    subtitlePlaceholder: "Субтитры появятся во время воспроизведения.",
  },
  hi: {
    transcriptionSettings: "ट्रांसक्रिप्शन",
    enableTranscription: "ट्रांसक्रिप्शन चालू करें",
    transcriptionLanguage: "ट्रांसक्रिप्शन भाषा",
    transcriptionAuto: "ऑटो",
    transcriptionEnglish: "अंग्रेज़ी",
    transcriptionChinese: "चीनी",
    transcriptionJapanese: "जापानी",
    transcriptionKorean: "कोरियाई",
    transcriptionSpanish: "स्पेनिश",
    transcriptionFrench: "फ़्रेंच",
    transcriptionGerman: "जर्मन",
    transcriptionPortuguese: "पुर्तगाली",
    transcriptionRussian: "रूसी",
    transcriptionHindi: "हिन्दी",
    sttCapability: "क्षमता",
    sttWebGpuSupported: "WebGPU समर्थित",
    sttWebGpuUnsupported: "WebGPU समर्थित नहीं",
    sttModelDownloaded: "मॉडल डाउनलोड हो गया",
    sttModelNotDownloaded: "मॉडल डाउनलोड नहीं हुआ",
    sttUnsupportedMessage: "इस डिवाइस या ब्राउज़र पर ट्रांसक्रिप्शन समर्थित नहीं है।",
    transcribe: "ट्रांसक्राइब",
    transcript: "ट्रांसक्रिप्ट",
    subtitles: "सबटाइटल",
    closeTranscript: "ट्रांसक्रिप्ट बंद करें",
    closeSubtitles: "सबटाइटल बंद करें",
    transcriptEmpty: "अभी कोई ट्रांसक्रिप्ट नहीं है।",
    transcriptReady: "ट्रांसक्रिप्ट तैयार है",
    transcriptCached: "ट्रांसक्रिप्ट स्थानीय कैश से बहाल हुआ",
    downloadModel: "मॉडल डाउनलोड करें",
    downloadModelFirst: "ट्रांसक्रिप्शन चालू करने से पहले मॉडल डाउनलोड करें।",
    sttPreparing: "ट्रांसक्रिप्शन तैयार हो रहा है...",
    sttHashingFile: "फ़ाइल हैश हो रही है...",
    sttDownloadingModel: "मॉडल डाउनलोड हो रहा है: {loaded} MB / {total} MB",
    sttDownloadUnknown: "मॉडल डाउनलोड हो रहा है: {loaded} MB",
    sttVerifyingModel: "मॉडल सत्यापित हो रहा है...",
    sttModelMismatch: "डाउनलोड किया गया मॉडल अपेक्षित checksum से मेल नहीं खाता।",
    sttModelUnavailable: "मॉडल डाउनलोड उपलब्ध नहीं है। स्थिर होस्ट जांचें।",
    sttPlanningChunks: "ट्रांसक्रिप्ट हिस्से तैयार हो रहे हैं...",
    sttTranscribing: "{current} / {total} हिस्से ट्रांसक्राइब हो रहे हैं ({percent}%)",
    sttNoSpeech: "ट्रांसक्राइब करने के लिए आवाज़ नहीं मिली।",
    sttFailed: "ट्रांसक्रिप्शन विफल हुआ। छोटा फ़ाइल आज़माएँ।",
    subtitlePlaceholder: "प्लेबैक के दौरान सबटाइटल दिखाई देंगे।",
  },
  ja: {
    transcriptionSettings: "文字起こし",
    enableTranscription: "文字起こしを有効にする",
    transcriptionLanguage: "文字起こし言語",
    transcriptionAuto: "自動",
    transcriptionEnglish: "英語",
    transcriptionChinese: "中国語",
    transcriptionJapanese: "日本語",
    transcriptionKorean: "韓国語",
    transcriptionSpanish: "スペイン語",
    transcriptionFrench: "フランス語",
    transcriptionGerman: "ドイツ語",
    transcriptionPortuguese: "ポルトガル語",
    transcriptionRussian: "ロシア語",
    transcriptionHindi: "ヒンディー語",
    sttCapability: "対応状況",
    sttWebGpuSupported: "WebGPU 対応",
    sttWebGpuUnsupported: "WebGPU 非対応",
    sttModelDownloaded: "モデルはダウンロード済み",
    sttModelNotDownloaded: "モデル未ダウンロード",
    sttUnsupportedMessage: "このデバイスまたはブラウザでは文字起こしを利用できません。",
    transcribe: "文字起こし",
    transcript: "文字起こし",
    subtitles: "字幕",
    closeTranscript: "文字起こしを閉じる",
    closeSubtitles: "字幕を閉じる",
    transcriptEmpty: "文字起こしはまだありません。",
    transcriptReady: "文字起こし準備完了",
    transcriptCached: "ローカルキャッシュから文字起こしを復元しました",
    downloadModel: "モデルをダウンロード",
    downloadModelFirst: "文字起こしを有効にする前にモデルをダウンロードしてください。",
    sttPreparing: "文字起こしを準備中...",
    sttHashingFile: "ファイルをハッシュ中...",
    sttDownloadingModel: "モデルをダウンロード中: {loaded} MB / {total} MB",
    sttDownloadUnknown: "モデルをダウンロード中: {loaded} MB",
    sttVerifyingModel: "モデルを検証中...",
    sttModelMismatch: "ダウンロードしたモデルが想定チェックサムと一致しません。",
    sttModelUnavailable: "モデルをダウンロードできません。静的ホストを確認してください。",
    sttPlanningChunks: "文字起こしチャンクを準備中...",
    sttTranscribing: "{current} / {total} チャンクを文字起こし中 ({percent}%)",
    sttNoSpeech: "文字起こしする音声が見つかりません。",
    sttFailed: "文字起こしに失敗しました。短いファイルで試してください。",
    subtitlePlaceholder: "再生中に字幕が表示されます。",
  },
  ko: {
    transcriptionSettings: "전사",
    enableTranscription: "전사 사용",
    transcriptionLanguage: "전사 언어",
    transcriptionAuto: "자동",
    transcriptionEnglish: "영어",
    transcriptionChinese: "중국어",
    transcriptionJapanese: "일본어",
    transcriptionKorean: "한국어",
    transcriptionSpanish: "스페인어",
    transcriptionFrench: "프랑스어",
    transcriptionGerman: "독일어",
    transcriptionPortuguese: "포르투갈어",
    transcriptionRussian: "러시아어",
    transcriptionHindi: "힌디어",
    sttCapability: "지원 상태",
    sttWebGpuSupported: "WebGPU 지원됨",
    sttWebGpuUnsupported: "WebGPU 지원 안 됨",
    sttModelDownloaded: "모델 다운로드됨",
    sttModelNotDownloaded: "모델 다운로드 안 됨",
    sttUnsupportedMessage: "이 기기 또는 브라우저에서는 전사를 지원하지 않습니다.",
    transcribe: "전사",
    transcript: "전사문",
    subtitles: "자막",
    closeTranscript: "전사문 닫기",
    closeSubtitles: "자막 닫기",
    transcriptEmpty: "아직 전사문이 없습니다.",
    transcriptReady: "전사문 준비됨",
    transcriptCached: "로컬 캐시에서 전사문을 복원했습니다",
    downloadModel: "모델 다운로드",
    downloadModelFirst: "전사를 켜기 전에 모델을 다운로드하세요.",
    sttPreparing: "전사 준비 중...",
    sttHashingFile: "파일 해시 계산 중...",
    sttDownloadingModel: "모델 다운로드 중: {loaded} MB / {total} MB",
    sttDownloadUnknown: "모델 다운로드 중: {loaded} MB",
    sttVerifyingModel: "모델 확인 중...",
    sttModelMismatch: "다운로드한 모델이 예상 체크섬과 일치하지 않습니다.",
    sttModelUnavailable: "모델 다운로드를 사용할 수 없습니다. 정적 호스트를 확인하세요.",
    sttPlanningChunks: "전사 청크 준비 중...",
    sttTranscribing: "{current} / {total} 청크 전사 중 ({percent}%)",
    sttNoSpeech: "전사할 음성을 찾지 못했습니다.",
    sttFailed: "전사에 실패했습니다. 더 짧은 파일로 시도하세요.",
    subtitlePlaceholder: "재생 중 자막이 표시됩니다.",
  },
  "zh-CN": {
    transcriptionSettings: "转录",
    enableTranscription: "启用转录",
    transcriptionLanguage: "转录语言",
    transcriptionAuto: "自动",
    transcriptionEnglish: "英语",
    transcriptionChinese: "中文",
    transcriptionJapanese: "日语",
    transcriptionKorean: "韩语",
    transcriptionSpanish: "西班牙语",
    transcriptionFrench: "法语",
    transcriptionGerman: "德语",
    transcriptionPortuguese: "葡萄牙语",
    transcriptionRussian: "俄语",
    transcriptionHindi: "印地语",
    sttCapability: "支持状态",
    sttWebGpuSupported: "支持 WebGPU",
    sttWebGpuUnsupported: "不支持 WebGPU",
    sttModelDownloaded: "模型已下载",
    sttModelNotDownloaded: "模型未下载",
    sttUnsupportedMessage: "此设备或浏览器不支持转录。",
    transcribe: "转录",
    transcript: "转录文本",
    subtitles: "字幕",
    closeTranscript: "关闭转录文本",
    closeSubtitles: "关闭字幕",
    transcriptEmpty: "还没有转录文本。",
    transcriptReady: "转录文本已就绪",
    transcriptCached: "已从本地缓存恢复转录文本",
    downloadModel: "下载模型",
    downloadModelFirst: "请先下载模型再启用转录。",
    sttPreparing: "正在准备转录...",
    sttHashingFile: "正在计算文件哈希...",
    sttDownloadingModel: "正在下载模型：{loaded} MB / {total} MB",
    sttDownloadUnknown: "正在下载模型：{loaded} MB",
    sttVerifyingModel: "正在验证模型...",
    sttModelMismatch: "下载的模型与预期校验和不匹配。",
    sttModelUnavailable: "模型下载不可用。请检查静态主机。",
    sttPlanningChunks: "正在规划转录片段...",
    sttTranscribing: "正在转录 {current} / {total} 个片段（{percent}%）",
    sttNoSpeech: "没有找到可转录的语音。",
    sttFailed: "转录失败。请尝试更短的文件。",
    subtitlePlaceholder: "播放时会显示字幕。",
  },
  "zh-TW": {
    transcriptionSettings: "轉錄",
    enableTranscription: "啟用轉錄",
    transcriptionLanguage: "轉錄語言",
    transcriptionAuto: "自動",
    transcriptionEnglish: "英文",
    transcriptionChinese: "中文",
    transcriptionJapanese: "日文",
    transcriptionKorean: "韓文",
    transcriptionSpanish: "西班牙文",
    transcriptionFrench: "法文",
    transcriptionGerman: "德文",
    transcriptionPortuguese: "葡萄牙文",
    transcriptionRussian: "俄文",
    transcriptionHindi: "印地文",
    sttCapability: "支援狀態",
    sttWebGpuSupported: "支援 WebGPU",
    sttWebGpuUnsupported: "不支援 WebGPU",
    sttModelDownloaded: "模型已下載",
    sttModelNotDownloaded: "模型未下載",
    sttUnsupportedMessage: "此裝置或瀏覽器不支援轉錄。",
    transcribe: "轉錄",
    transcript: "轉錄文字",
    subtitles: "字幕",
    closeTranscript: "關閉轉錄文字",
    closeSubtitles: "關閉字幕",
    transcriptEmpty: "尚無轉錄文字。",
    transcriptReady: "轉錄文字已就緒",
    transcriptCached: "已從本機快取還原轉錄文字",
    downloadModel: "下載模型",
    downloadModelFirst: "請先下載模型再啟用轉錄。",
    sttPreparing: "正在準備轉錄...",
    sttHashingFile: "正在計算檔案雜湊...",
    sttDownloadingModel: "正在下載模型：{loaded} MB / {total} MB",
    sttDownloadUnknown: "正在下載模型：{loaded} MB",
    sttVerifyingModel: "正在驗證模型...",
    sttModelMismatch: "下載的模型與預期校驗和不符。",
    sttModelUnavailable: "模型下載無法使用。請檢查靜態主機。",
    sttPlanningChunks: "正在規劃轉錄片段...",
    sttTranscribing: "正在轉錄 {current} / {total} 個片段（{percent}%）",
    sttNoSpeech: "找不到可轉錄的語音。",
    sttFailed: "轉錄失敗。請嘗試較短的檔案。",
    subtitlePlaceholder: "播放時會顯示字幕。",
  },
};

const STORAGE_KEY = "audioNavigatorSettings";
const DEFAULT_SETTINGS = {
  theme: "auto",
  silenceThreshold: 0.01,
  minSilenceSeconds: 12,
  minAudibleSeconds: 0.2,
  transcriptionEnabled: false,
  transcriptionLanguage: "auto",
};
const languagePreference = getLanguagePreference();
const savedSettings = getSavedSettings(languagePreference.language);

const state = {
  language: savedSettings.language,
  hasSupportedBrowserLanguage: languagePreference.isSupported,
  settings: {
    theme: savedSettings.theme,
    silenceThreshold: savedSettings.silenceThreshold,
    minSilenceSeconds: savedSettings.minSilenceSeconds,
    minAudibleSeconds: savedSettings.minAudibleSeconds,
    transcriptionEnabled: savedSettings.transcriptionEnabled,
    transcriptionLanguage: savedSettings.transcriptionLanguage,
  },
  audioBuffer: null,
  currentFile: null,
  currentFileHash: "",
  currentFileSize: 0,
  mediaDuration: 0,
  monoSamples: null,
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
  resizeFrame: 0,
  staticWaveformCanvas: null,
  staticWaveformContext: null,
  canvasPixelWidth: 0,
  canvasPixelHeight: 0,
  lastCurrentTimeText: "",
  lastDurationText: "",
  lastTimelineValue: "",
  sttCapability: {
    checked: false,
    isSupported: false,
    reason: "",
  },
  sttModelInfo: {
    checked: false,
    isDownloaded: false,
  },
  sttWorker: null,
  sttWorkerRequests: new Map(),
  sttNextRequestId: 1,
  sttIsRunning: false,
  sttStatusKey: "",
  sttStatusParams: {},
  transcript: null,
  activeTranscriptIndex: -1,
  isSubtitleVisible: false,
  subtitleDrag: null,
};

const RMS_WINDOW_SECONDS = 0.05;
const SEEK_EPSILON = 0.08;
const ANALYSIS_CHUNK_DURATION_MS = 16;
const STT_SAMPLE_RATE = 16000;
const STT_CHUNK_TARGET_SECONDS = 60;
const STT_CHUNK_MIN_SECONDS = 25;
const STT_CHUNK_MAX_SECONDS = 75;
const STT_CHUNK_OVERLAP_SECONDS = 0.35;
const STT_CHUNK_SPLIT_SEARCH_SECONDS = 7;
const STT_CHUNK_ALGORITHM_VERSION = "rms-v1";
const STT_DB_NAME = "audioNavigatorStt";
const STT_DB_VERSION = 1;
const STT_MODEL = {
  id: "whisper-tiny-multilingual",
  version: "ggml-tiny-main-20250902",
  url: "https://sf.mkyu.one/models/whisper/ggml-tiny.bin",
  expectedBytes: 77691713,
  sha256: "be07e048e1e599ad46341c8d2a135645097a538221678b7acdd1b1919c6e1b21",
};
const STT_LANGUAGES = new Set(["auto", "en", "zh", "ja", "ko", "es", "fr", "de", "pt", "ru", "hi"]);
const STT_LANGUAGE_BY_APP_LANGUAGE = {
  en: "en",
  es: "es",
  fr: "fr",
  de: "de",
  "pt-BR": "pt",
  ru: "ru",
  hi: "hi",
  ja: "ja",
  ko: "ko",
  "zh-CN": "zh",
  "zh-TW": "zh",
};
const SUPPORTED_AUDIO_EXTENSIONS = new Set(["aac", "flac", "m4a", "mp3", "oga", "ogg", "opus", "wav", "weba"]);
const SUPPORTED_VIDEO_EXTENSIONS = new Set(["avi", "m4v", "mkv", "mov", "mp4", "webm"]);
const RECORDED_AUDIO_MIME_TYPES = [
  "audio/webm;codecs=opus",
  "audio/webm",
  "audio/ogg;codecs=opus",
  "audio/ogg",
  "audio/mp4",
];

class UnsupportedMediaError extends Error {
  constructor(message = "Unsupported media file.") {
    super(message);
    this.name = "UnsupportedMediaError";
  }
}

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

transcriptionEnabledInput.addEventListener("change", () => {
  if (transcriptionEnabledInput.checked && !state.sttModelInfo.isDownloaded) {
    transcriptionEnabledInput.checked = false;
    state.settings.transcriptionEnabled = false;
    setTranscriptStatus("downloadModelFirst", {}, true);
    persistSettings();
    syncTranscriptionUi();
    return;
  }

  state.settings.transcriptionEnabled = transcriptionEnabledInput.checked;
  persistSettings();
  if (state.settings.transcriptionEnabled) {
    checkStoredModel().catch(() => {});
  }
  syncTranscriptionUi();
});

downloadModelButton.addEventListener("click", () => {
  downloadAndStoreSttModel().catch((error) => {
    console.error(error);
    setTranscriptStatus("sttModelUnavailable", {}, true);
    syncTranscriptionUi();
  });
});

transcriptionLanguageControl.addEventListener("click", (event) => {
  if (event.target.closest(".custom-menu")) {
    return;
  }
  setLanguageMenuOpen(false);
  setTranscriptionLanguageMenuOpen(transcriptionLanguageMenu.classList.contains("is-hidden"));
});

transcriptionLanguageSelect.addEventListener("click", (event) => {
  event.stopPropagation();
  setTranscriptionLanguageMenuOpen(transcriptionLanguageMenu.classList.contains("is-hidden"));
});

transcriptionLanguageSelect.addEventListener("keydown", (event) => {
  if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    setTranscriptionLanguageMenuOpen(true);
    getSelectedTranscriptionLanguageOption()?.focus();
  }
});

transcriptionLanguageOptions.forEach((option) => {
  option.addEventListener("click", () => {
    setTranscriptionLanguage(option.dataset.value);
    setTranscriptionLanguageMenuOpen(false);
    transcriptionLanguageSelect.focus();
  });

  option.addEventListener("keydown", (event) => {
    handleTranscriptionLanguageOptionKeydown(event, option);
  });
});

resetSettings.addEventListener("click", resetDefaultSettings);

languageControl.addEventListener("click", (event) => {
  if (event.target.closest(".custom-menu")) {
    return;
  }
  setTranscriptionLanguageMenuOpen(false);
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
  if (!event.target.closest(".transcription-language-control")) {
    setTranscriptionLanguageMenuOpen(false);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    if (isTranscriptOpen()) {
      closeTranscript();
      return;
    }
    if (isLicensesOpen()) {
      closeLicenses();
      return;
    }
    if (isSettingsOpen()) {
      closeSettings();
      return;
    }
    setJumpMenuOpen(false);
    setLanguageMenuOpen(false);
    setTranscriptionLanguageMenuOpen(false);
    if (document.activeElement?.closest(".jump-amount-wrap")) {
      jumpAmount.focus();
    } else if (document.activeElement?.closest(".language-control")) {
      languageSelect.focus();
    } else if (document.activeElement?.closest(".transcription-language-control")) {
      transcriptionLanguageSelect.focus();
    }
  }
});

if (colorSchemeQuery?.addEventListener) {
  colorSchemeQuery.addEventListener("change", handleColorSchemeChange);
} else if (colorSchemeQuery?.addListener) {
  colorSchemeQuery.addListener(handleColorSchemeChange);
}

speedSlider.addEventListener("input", updatePlaybackSpeed);

volumeSlider.addEventListener("input", updateOutputGain);
nextAudio.addEventListener("click", seekToNextAudio);
transcribeButton.addEventListener("click", () => {
  startTranscription().catch((error) => {
    console.error(error);
    setTranscriptStatus("sttFailed", {}, true);
  });
});
transcriptButton.addEventListener("click", openTranscript);
subtitleButton.addEventListener("click", toggleSubtitles);
transcriptClose.addEventListener("click", closeTranscript);
transcriptBackdrop.addEventListener("click", (event) => {
  if (event.target === transcriptBackdrop) {
    closeTranscript();
  }
});
subtitleClose.addEventListener("click", hideSubtitles);
subtitleDragHandle.addEventListener("pointerdown", startSubtitleDrag);

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

window.addEventListener("pointermove", moveSubtitleDrag);
window.addEventListener("pointerup", stopSubtitleDrag);
waveformWrap.addEventListener("contextmenu", (event) => {
  event.preventDefault();
});

window.addEventListener("resize", scheduleResizeCanvas);
document.addEventListener("keydown", handleKeyboardControls);
applyTheme();
syncSettingsControls();
syncAppVersion();
setLanguage(state.language, false);
applyLanguage();
checkSttCapability();
syncTranscriptionUi();

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
    const fileHashPromise = sha256ArrayBuffer(arrayBuffer);
    setBusy(true, "processingAudio", "decodingAudio", {}, null);
    await nextPaint();
    const decodedBuffer = await decodeMediaFile(file, arrayBuffer, mediaKind);
    const fileHash = await fileHashPromise;

    stopPlayback();
    resetTranscriptState();
    clearAnalysisCaches();
    state.currentFile = file;
    state.currentFileHash = fileHash;
    state.currentFileSize = file.size;
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
    await restoreCachedTranscript();
    resizeCanvas();
    updateTimeUi();
    setAnalysisStatus();
    setBusy(true, "processingAudio", "findingSilence", {}, 100);
    await nextPaint();
    setBusy(false);
  } catch (error) {
    console.error(error);
    setError(error instanceof UnsupportedMediaError ? "unsupportedFile" : "decodeError");
    setBusy(false);
    fileInput.value = "";
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
      throw error;
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
    throw new Error("Could not extract audio from video.", { cause: error });
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
  if (event.defaultPrevented || isSettingsOpen() || shouldIgnoreShortcut(event.target) || !state.audioBuffer) {
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

  updateActiveTranscript(current);
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
    persistSettings();
  }
}

function setTranscriptionLanguage(language, shouldPersist = true) {
  const fallbackLanguage = STT_LANGUAGES.has(language) ? language : DEFAULT_SETTINGS.transcriptionLanguage;
  const selectedOption = transcriptionLanguageOptions.find((option) => option.dataset.value === fallbackLanguage);
  state.settings.transcriptionLanguage = fallbackLanguage;
  transcriptionLanguageSelect.value = fallbackLanguage;
  transcriptionLanguageValue.textContent = selectedOption?.textContent || translate("transcriptionAuto");
  transcriptionLanguageOptions.forEach((option) => {
    option.setAttribute("aria-selected", String(option.dataset.value === fallbackLanguage));
  });

  if (shouldPersist) {
    persistSettings();
    resetTranscriptState();
    if (state.audioBuffer) {
      restoreCachedTranscript().catch(() => {});
    }
  }
}

function openSettings() {
  settingsBackdrop.classList.remove("is-hidden");
  settingsBackdrop.setAttribute("aria-hidden", "false");
  setLanguageMenuOpen(false);
  setTranscriptionLanguageMenuOpen(false);
  setJumpMenuOpen(false);
  syncTranscriptionUi();
  settingsClose.focus();
}

function closeSettings() {
  closeLicenses({ restoreFocus: false });
  settingsBackdrop.classList.add("is-hidden");
  settingsBackdrop.setAttribute("aria-hidden", "true");
  setLanguageMenuOpen(false);
  setTranscriptionLanguageMenuOpen(false);
  settingsButton.focus();
}

function isSettingsOpen() {
  return !settingsBackdrop.classList.contains("is-hidden");
}

function openLicenses() {
  licenseBackdrop.classList.remove("is-hidden");
  licenseBackdrop.setAttribute("aria-hidden", "false");
  setLanguageMenuOpen(false);
  setTranscriptionLanguageMenuOpen(false);
  setJumpMenuOpen(false);
  licenseClose.focus();
}

function closeLicenses({ restoreFocus = true } = {}) {
  if (!isLicensesOpen()) {
    return;
  }

  licenseBackdrop.classList.add("is-hidden");
  licenseBackdrop.setAttribute("aria-hidden", "true");

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
  transcriptionEnabledInput.checked = Boolean(state.settings.transcriptionEnabled);
  setTranscriptionLanguage(state.settings.transcriptionLanguage, false);
  updateSettingsOutputs();
  syncTranscriptionUi();
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
  resetTranscriptState();
  if (state.audioBuffer) {
    restoreCachedTranscript().catch(() => {});
  }
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
  state.settings.transcriptionLanguage = STT_LANGUAGE_BY_APP_LANGUAGE[fallbackLanguage] || DEFAULT_SETTINGS.transcriptionLanguage;
  setLanguage(fallbackLanguage, false);
  applyTheme();
  syncSettingsControls();
  applyLanguage();
  persistSettings();
  reanalyzeSilenceSettings();
  resetTranscriptState();
  if (state.audioBuffer) {
    restoreCachedTranscript().catch(() => {});
  }
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
  clearWaveformCache();
  drawWaveform();
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

function setTranscriptionLanguageMenuOpen(isOpen) {
  if (
    transcriptionLanguageControl.classList.contains("is-hidden")
    || transcriptionLanguageSelect.disabled
  ) {
    isOpen = false;
  }

  transcriptionLanguageMenu.classList.toggle("is-hidden", !isOpen);
  transcriptionLanguageSelect.setAttribute("aria-expanded", String(isOpen));
}

function getSelectedLanguageOption() {
  return languageOptions.find((option) => option.getAttribute("aria-selected") === "true");
}

function getSelectedTranscriptionLanguageOption() {
  return transcriptionLanguageOptions.find((option) => option.getAttribute("aria-selected") === "true");
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

function handleTranscriptionLanguageOptionKeydown(event, option) {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    option.click();
    return;
  }

  if (event.key === "ArrowDown" || event.key === "ArrowUp") {
    event.preventDefault();
    const direction = event.key === "ArrowDown" ? 1 : -1;
    const currentIndex = transcriptionLanguageOptions.indexOf(option);
    const nextIndex = (currentIndex + direction + transcriptionLanguageOptions.length) % transcriptionLanguageOptions.length;
    transcriptionLanguageOptions[nextIndex].focus();
  }
}

function checkSttCapability() {
  const isChromeLike = /Chrome|Chromium|Edg\//.test(navigator.userAgent);
  const hasWebGpu = Boolean(navigator.gpu);
  const hasWorker = typeof Worker !== "undefined";
  const hasIndexedDb = typeof indexedDB !== "undefined";
  const hasSharedArrayBuffer = typeof SharedArrayBuffer !== "undefined";
  state.sttCapability = {
    checked: true,
    isSupported: isChromeLike && hasWebGpu && hasWorker && hasIndexedDb && hasSharedArrayBuffer,
    reason: hasWebGpu ? "" : "webgpu",
  };
  checkStoredModel().catch(() => {
    state.sttModelInfo = { checked: true, isDownloaded: false };
    syncTranscriptionUi();
  });
}

async function checkStoredModel() {
  const stored = await idbGet("models", STT_MODEL.id);
  state.sttModelInfo = {
    checked: true,
    isDownloaded: Boolean(stored?.bytes?.byteLength === STT_MODEL.expectedBytes && stored?.sha256 === STT_MODEL.sha256),
  };
  if (!state.sttModelInfo.isDownloaded && state.settings.transcriptionEnabled) {
    state.settings.transcriptionEnabled = false;
    persistSettings();
  }
  syncTranscriptionUi();
}

function syncTranscriptionUi() {
  const isSupported = state.sttCapability.isSupported;
  const hasModel = state.sttModelInfo.isDownloaded;
  if (!hasModel && state.settings.transcriptionEnabled) {
    state.settings.transcriptionEnabled = false;
  }

  transcriptionEnabledInput.checked = Boolean(state.settings.transcriptionEnabled && hasModel);
  transcriptionEnabledInput.disabled = !isSupported || !hasModel || state.sttIsRunning;
  transcriptionLanguageSelect.value = state.settings.transcriptionLanguage;
  transcriptionLanguageSelect.disabled = !isSupported || !hasModel || state.sttIsRunning;
  setTranscriptionLanguage(state.settings.transcriptionLanguage, false);

  const enabledAndSupported = state.settings.transcriptionEnabled && isSupported && hasModel;
  const hasFile = Boolean(state.audioBuffer);
  const hasTranscript = Boolean(state.transcript?.segments?.length);
  const configRows = [...transcriptionSettingsSection.querySelectorAll(".transcription-config-row")];
  configRows.forEach((row, index) => {
    row.classList.toggle("is-hidden", !isSupported || (index > 0 && !hasModel));
  });
  sttStateList.classList.toggle("is-hidden", !isSupported);
  sttModelActions.classList.toggle("is-hidden", !isSupported || hasModel);
  downloadModelButton.disabled = !isSupported || hasModel || state.sttIsRunning;
  sttUnsupportedMessage.classList.toggle("is-hidden", isSupported);
  transcribeButton.classList.toggle("is-hidden", !(enabledAndSupported && hasFile && !state.sttIsRunning));
  transcriptButton.classList.toggle("is-hidden", !(state.settings.transcriptionEnabled && hasTranscript));
  subtitleButton.classList.toggle("is-hidden", !(state.settings.transcriptionEnabled && hasTranscript));
  transcriptStatus.classList.toggle(
    "is-hidden",
    !(state.settings.transcriptionEnabled && (state.sttStatusKey || hasTranscript || state.sttIsRunning)),
  );

  sttWebGpuState.textContent = translate(state.sttCapability.isSupported ? "sttWebGpuSupported" : "sttWebGpuUnsupported");
  sttWebGpuState.classList.toggle("is-good", state.sttCapability.isSupported);
  sttModelState.textContent = translate(state.sttModelInfo.isDownloaded ? "sttModelDownloaded" : "sttModelNotDownloaded");
  sttModelState.classList.toggle("is-good", state.sttModelInfo.isDownloaded);

  if (state.sttStatusKey) {
    transcriptStatus.textContent = translate(state.sttStatusKey, state.sttStatusParams);
    sttSettingsStatus.textContent = translate(state.sttStatusKey, state.sttStatusParams);
  } else if (hasTranscript) {
    transcriptStatus.textContent = translate("transcriptReady");
  }
  transcriptStatus.classList.toggle("is-error", state.sttStatusKey === "sttFailed" || state.sttStatusKey === "sttModelUnavailable");
  sttSettingsStatus.classList.toggle("is-hidden", !state.sttStatusKey || !isSupported || hasModel);
  sttSettingsStatus.classList.toggle("is-error", state.sttStatusKey === "sttFailed" || state.sttStatusKey === "sttModelUnavailable");

  if (!state.settings.transcriptionEnabled) {
    hideSubtitles();
  }
}

async function startTranscription() {
  if (
    !state.audioBuffer
    || state.sttIsRunning
    || !state.settings.transcriptionEnabled
    || !state.sttCapability.isSupported
    || !state.sttModelInfo.isDownloaded
  ) {
    return;
  }

  state.sttIsRunning = true;
  setTranscriptStatus("sttPreparing");
  syncTranscriptionUi();

  try {
    const cached = await loadCachedTranscript();
    if (cached) {
      setTranscript(cached, "transcriptCached");
      return;
    }

    const modelBytes = await ensureSttModel();
    setTranscriptStatus("sttPlanningChunks");
    await nextPaint();
    const chunks = await buildSttChunks();

    if (!chunks.length) {
      setTranscriptStatus("sttNoSpeech", {}, true);
      return;
    }

    await callSttWorker("init", { modelBuffer: modelBytes.buffer }, [modelBytes.buffer]);

    const allSegments = [];
    for (let index = 0; index < chunks.length; index += 1) {
      const chunk = chunks[index];
      const percent = Math.round((index / chunks.length) * 100);
      setTranscriptStatus("sttTranscribing", { current: index + 1, total: chunks.length, percent });
      await nextPaint();
      const language = state.settings.transcriptionLanguage;
      const result = await callSttWorker(
        "transcribe",
        {
          pcm: chunk.pcm.buffer,
          language,
          chunkStart: chunk.start,
        },
        [chunk.pcm.buffer],
      );
      allSegments.push(...normalizeTranscriptSegments(result.segments, chunk.start, chunk.end, language));
    }

    const transcript = {
      modelId: STT_MODEL.id,
      modelVersion: STT_MODEL.version,
      language: state.settings.transcriptionLanguage,
      chunkingVersion: STT_CHUNK_ALGORITHM_VERSION,
      createdAt: new Date().toISOString(),
      segments: mergeTranscriptSegments(allSegments),
    };

    if (!transcript.segments.length) {
      setTranscriptStatus("sttNoSpeech", {}, true);
      return;
    }

    await saveCachedTranscript(transcript);
    setTranscript(transcript, "transcriptReady");
  } catch (error) {
    console.error(error);
    const key = /model/i.test(error?.message || "") ? "sttModelUnavailable" : "sttFailed";
    setTranscriptStatus(key, {}, true);
  } finally {
    state.sttIsRunning = false;
    syncTranscriptionUi();
  }
}

async function downloadAndStoreSttModel() {
  if (!state.sttCapability.isSupported || state.sttIsRunning) {
    return;
  }

  state.sttIsRunning = true;
  setTranscriptStatus("sttPreparing");
  syncTranscriptionUi();
  try {
    await ensureSttModel();
    state.sttStatusKey = "";
    state.sttStatusParams = {};
  } finally {
    state.sttIsRunning = false;
    syncTranscriptionUi();
  }
}

async function ensureSttModel() {
  const stored = await idbGet("models", STT_MODEL.id);
  if (stored?.bytes?.byteLength === STT_MODEL.expectedBytes && stored?.sha256 === STT_MODEL.sha256) {
    state.sttModelInfo = { checked: true, isDownloaded: true };
    syncTranscriptionUi();
    return new Uint8Array(stored.bytes);
  }

  const bytes = await downloadSttModel();
  setTranscriptStatus("sttVerifyingModel");
  await nextPaint();
  const sha256 = await sha256ArrayBuffer(bytes.buffer);
  if (bytes.byteLength !== STT_MODEL.expectedBytes || sha256 !== STT_MODEL.sha256) {
    await idbDelete("models", STT_MODEL.id);
    throw new Error(translate("sttModelMismatch"));
  }

  await idbPut("models", {
    id: STT_MODEL.id,
    version: STT_MODEL.version,
    bytes: bytes.buffer,
    sha256,
    size: bytes.byteLength,
    savedAt: new Date().toISOString(),
  });
  state.sttModelInfo = { checked: true, isDownloaded: true };
  syncTranscriptionUi();
  return bytes;
}

async function downloadSttModel() {
  const response = await fetch(STT_MODEL.url, { mode: "cors", cache: "force-cache" });
  if (!response.ok || !response.body) {
    throw new Error("Model download unavailable.");
  }

  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("text/html")) {
    throw new Error("Model host returned HTML instead of the model binary.");
  }

  const declaredSize = Number(response.headers.get("content-length")) || STT_MODEL.expectedBytes;
  const reader = response.body.getReader();
  const chunks = [];
  let loaded = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    chunks.push(value);
    loaded += value.byteLength;
    if (declaredSize) {
      setTranscriptStatus("sttDownloadingModel", { loaded: formatMegabytes(loaded), total: formatMegabytes(declaredSize) });
    } else {
      setTranscriptStatus("sttDownloadUnknown", { loaded: formatMegabytes(loaded) });
    }
  }

  const output = new Uint8Array(loaded);
  let offset = 0;
  chunks.forEach((chunk) => {
    output.set(chunk, offset);
    offset += chunk.byteLength;
  });
  return output;
}

async function buildSttChunks() {
  const buffer = state.audioBuffer;
  const samples = collectMonoSamples(buffer);
  const regions = state.regions.length ? state.regions : [{ start: 0, end: getMediaDuration() }];
  const chunks = [];

  for (const region of regions) {
    const planned = splitAudibleRegion(region);
    for (const chunk of planned) {
      const pcm = resampleMonoSlice(samples, buffer.sampleRate, chunk.start, chunk.end, STT_SAMPLE_RATE);
      if (pcm.length > 0) {
        chunks.push({ ...chunk, pcm });
      }
      await nextPaint();
    }
  }

  return chunks;
}

function splitAudibleRegion(region) {
  const chunks = [];
  const duration = region.end - region.start;
  if (duration <= STT_CHUNK_MAX_SECONDS) {
    return [{ start: region.start, end: region.end }];
  }

  let cursor = region.start;
  while (region.end - cursor > STT_CHUNK_MAX_SECONDS) {
    const desired = Math.min(cursor + STT_CHUNK_TARGET_SECONDS, region.end);
    const split = findLowRmsSplit(cursor + STT_CHUNK_MIN_SECONDS, desired + STT_CHUNK_SPLIT_SEARCH_SECONDS, desired);
    const end = clampNumber(split, cursor + STT_CHUNK_MIN_SECONDS, Math.min(cursor + STT_CHUNK_MAX_SECONDS, region.end));
    chunks.push({ start: cursor, end });
    cursor = Math.max(end - STT_CHUNK_OVERLAP_SECONDS, cursor + STT_CHUNK_MIN_SECONDS);
  }

  if (region.end - cursor > 1) {
    chunks.push({ start: cursor, end: region.end });
  }
  return chunks;
}

function findLowRmsSplit(start, end, fallback) {
  let bestTime = fallback;
  let bestRms = Infinity;
  const windowStart = Math.max(0, start);
  const windowEnd = Math.min(getMediaDuration(), end);

  state.rmsFrames.forEach((frame) => {
    if (frame.time < windowStart || frame.time > windowEnd) {
      return;
    }
    const distancePenalty = Math.abs(frame.time - fallback) * 0.0005;
    const score = frame.rms + distancePenalty;
    if (score < bestRms) {
      bestRms = score;
      bestTime = frame.time;
    }
  });

  return bestTime;
}

function resampleMonoSlice(samples, sourceRate, startSeconds, endSeconds, targetRate) {
  const sourceStart = Math.max(0, Math.floor(startSeconds * sourceRate));
  const sourceEnd = Math.min(samples.length, Math.ceil(endSeconds * sourceRate));
  const sourceLength = Math.max(0, sourceEnd - sourceStart);
  const targetLength = Math.max(1, Math.round((sourceLength / sourceRate) * targetRate));
  const output = new Float32Array(targetLength);
  const ratio = sourceRate / targetRate;

  for (let index = 0; index < targetLength; index += 1) {
    const sourceIndex = sourceStart + index * ratio;
    const low = Math.min(sourceEnd - 1, Math.floor(sourceIndex));
    const high = Math.min(sourceEnd - 1, low + 1);
    const mix = sourceIndex - low;
    output[index] = samples[low] * (1 - mix) + samples[high] * mix;
  }

  return output;
}

function getSttWorker() {
  if (state.sttWorker) {
    return state.sttWorker;
  }

  state.sttWorker = new Worker("assets/vendor/whisper/stt-worker.js");
  state.sttWorker.addEventListener("message", (event) => {
    const { id, type, message } = event.data || {};
    const pending = state.sttWorkerRequests.get(id);
    if (!pending) {
      return;
    }
    state.sttWorkerRequests.delete(id);
    if (type === "error") {
      pending.reject(new Error(message || "Transcription worker failed."));
    } else {
      pending.resolve(event.data);
    }
  });
  state.sttWorker.addEventListener("error", (event) => {
    state.sttWorkerRequests.forEach((pending) => pending.reject(event.error || new Error(event.message)));
    state.sttWorkerRequests.clear();
  });
  return state.sttWorker;
}

function callSttWorker(type, payload = {}, transfer = []) {
  const worker = getSttWorker();
  const id = state.sttNextRequestId;
  state.sttNextRequestId += 1;
  return new Promise((resolve, reject) => {
    state.sttWorkerRequests.set(id, { resolve, reject });
    worker.postMessage({ id, type, ...payload }, transfer);
  });
}

async function restoreCachedTranscript() {
  const cached = await loadCachedTranscript();
  if (cached) {
    setTranscript(cached, "transcriptCached");
  } else {
    syncTranscriptionUi();
  }
}

async function loadCachedTranscript() {
  const cacheKey = getTranscriptCacheKey();
  if (!cacheKey) {
    return null;
  }
  const cached = await idbGet("transcripts", cacheKey);
  return cached?.transcript || null;
}

async function saveCachedTranscript(transcript) {
  const cacheKey = getTranscriptCacheKey();
  if (!cacheKey) {
    return;
  }
  await idbPut("transcripts", {
    id: cacheKey,
    transcript,
    savedAt: new Date().toISOString(),
  });
}

function getTranscriptCacheKey() {
  if (!state.currentFileHash || !state.currentFileSize) {
    return "";
  }
  return [
    state.currentFileHash,
    state.currentFileSize,
    STT_MODEL.id,
    STT_MODEL.version,
    state.settings.transcriptionLanguage,
    STT_CHUNK_ALGORITHM_VERSION,
    state.settings.silenceThreshold,
    state.settings.minSilenceSeconds,
    state.settings.minAudibleSeconds,
  ].join(":");
}

function setTranscript(transcript, statusKey = "transcriptReady") {
  state.transcript = {
    ...transcript,
    segments: mergeTranscriptSegments(transcript.segments || []),
  };
  state.activeTranscriptIndex = -1;
  renderTranscript();
  setTranscriptStatus(statusKey);
  syncTranscriptionUi();
  updateActiveTranscript(getCurrentTime());
}

function resetTranscriptState() {
  state.transcript = null;
  state.activeTranscriptIndex = -1;
  state.sttStatusKey = "";
  state.sttStatusParams = {};
  hideSubtitles();
  renderTranscript();
  syncTranscriptionUi();
}

function setTranscriptStatus(key, params = {}, isError = false) {
  state.sttStatusKey = key;
  state.sttStatusParams = params;
  transcriptStatus.textContent = translate(key, params);
  transcriptStatus.classList.toggle("is-error", isError);
  transcriptStatus.classList.remove("is-hidden");
  sttSettingsStatus.textContent = translate(key, params);
  sttSettingsStatus.classList.toggle("is-error", isError);
  sttSettingsStatus.classList.remove("is-hidden");
}

function normalizeTranscriptSegments(segments, chunkStart, chunkEnd, language) {
  return (segments || [])
    .map((segment) => ({
      start: clampNumber(Number(segment.start), chunkStart, chunkEnd),
      end: clampNumber(Number(segment.end), chunkStart, chunkEnd),
      text: String(segment.text || "").trim(),
      language: segment.language || language,
      confidence: segment.confidence ?? null,
      noSpeech: segment.noSpeech ?? null,
    }))
    .filter((segment) => segment.text && segment.end >= segment.start);
}

function mergeTranscriptSegments(segments) {
  return [...segments]
    .sort((a, b) => a.start - b.start)
    .map((segment, index, sorted) => {
      const next = sorted[index + 1];
      const fallbackEnd = segment.end || segment.start + 2;
      return {
        ...segment,
        end: Math.max(segment.start, Math.min(next?.start ?? fallbackEnd, fallbackEnd)),
      };
    });
}

function renderTranscript() {
  if (!transcriptList) {
    return;
  }

  transcriptList.textContent = "";
  const segments = state.transcript?.segments || [];
  if (!segments.length) {
    const empty = document.createElement("p");
    empty.className = "settings-note";
    empty.textContent = translate("transcriptEmpty");
    transcriptList.append(empty);
    return;
  }

  const fragment = document.createDocumentFragment();
  segments.forEach((segment, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "transcript-segment";
    button.dataset.index = String(index);
    button.setAttribute("role", "listitem");
    button.addEventListener("click", () => {
      setCurrentTime(segment.start);
      updateActiveTranscript(segment.start);
    });

    const time = document.createElement("span");
    time.className = "transcript-time";
    time.textContent = formatTime(segment.start);
    const text = document.createElement("span");
    text.className = "transcript-text";
    text.textContent = segment.text;
    button.append(time, text);
    fragment.append(button);
  });
  transcriptList.append(fragment);
}

function updateActiveTranscript(current) {
  const segments = state.transcript?.segments || [];
  if (!segments.length) {
    return;
  }

  const index = segments.findIndex((segment) => current >= segment.start && current < Math.max(segment.end, segment.start + 1));
  if (index === state.activeTranscriptIndex) {
    updateSubtitleText(index);
    return;
  }

  const previous = transcriptList.querySelector(".transcript-segment.is-active");
  previous?.classList.remove("is-active");
  state.activeTranscriptIndex = index;
  if (index >= 0) {
    const active = transcriptList.querySelector(`[data-index="${index}"]`);
    active?.classList.add("is-active");
    if (isTranscriptOpen()) {
      active?.scrollIntoView({ block: "nearest" });
    }
  }
  updateSubtitleText(index);
}

function openTranscript() {
  if (!state.transcript?.segments?.length) {
    return;
  }
  transcriptBackdrop.classList.remove("is-hidden");
  transcriptBackdrop.setAttribute("aria-hidden", "false");
  updateActiveTranscript(getCurrentTime());
  transcriptClose.focus();
}

function closeTranscript() {
  transcriptBackdrop.classList.add("is-hidden");
  transcriptBackdrop.setAttribute("aria-hidden", "true");
  transcriptButton.focus();
}

function isTranscriptOpen() {
  return !transcriptBackdrop.classList.contains("is-hidden");
}

function toggleSubtitles() {
  if (state.isSubtitleVisible) {
    hideSubtitles();
  } else {
    showSubtitles();
  }
}

function showSubtitles() {
  if (!state.transcript?.segments?.length) {
    return;
  }
  state.isSubtitleVisible = true;
  subtitleWindow.classList.remove("is-hidden");
  updateActiveTranscript(getCurrentTime());
  constrainSubtitleWindow();
}

function hideSubtitles() {
  state.isSubtitleVisible = false;
  subtitleWindow?.classList.add("is-hidden");
}

function updateSubtitleText(index) {
  if (!state.isSubtitleVisible || !subtitleText) {
    return;
  }
  const segment = state.transcript?.segments?.[index];
  subtitleText.textContent = segment?.text || translate("subtitlePlaceholder");
}

function startSubtitleDrag(event) {
  if (event.target.closest("button")) {
    return;
  }
  const rect = subtitleWindow.getBoundingClientRect();
  state.subtitleDrag = {
    pointerId: event.pointerId,
    offsetX: event.clientX - rect.left,
    offsetY: event.clientY - rect.top,
  };
  subtitleDragHandle.setPointerCapture(event.pointerId);
}

function moveSubtitleDrag(event) {
  if (!state.subtitleDrag || event.pointerId !== state.subtitleDrag.pointerId) {
    return;
  }
  setSubtitleWindowPosition(
    event.clientX - state.subtitleDrag.offsetX,
    event.clientY - state.subtitleDrag.offsetY,
  );
}

function stopSubtitleDrag(event) {
  if (!state.subtitleDrag || event.pointerId !== state.subtitleDrag.pointerId) {
    return;
  }
  state.subtitleDrag = null;
  constrainSubtitleWindow();
}

function setSubtitleWindowPosition(left, top) {
  const rect = subtitleWindow.getBoundingClientRect();
  const maxLeft = window.innerWidth - rect.width - 8;
  const maxTop = window.innerHeight - rect.height - 8;
  subtitleWindow.style.left = `${clampNumber(left, 8, Math.max(8, maxLeft))}px`;
  subtitleWindow.style.top = `${clampNumber(top, 8, Math.max(8, maxTop))}px`;
  subtitleWindow.style.right = "auto";
  subtitleWindow.style.bottom = "auto";
}

function constrainSubtitleWindow() {
  if (!subtitleWindow || subtitleWindow.classList.contains("is-hidden")) {
    return;
  }
  const rect = subtitleWindow.getBoundingClientRect();
  setSubtitleWindowPosition(rect.left, rect.top);
}

function openSttDb() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(STT_DB_NAME, STT_DB_VERSION);
    request.addEventListener("upgradeneeded", () => {
      const db = request.result;
      if (!db.objectStoreNames.contains("models")) {
        db.createObjectStore("models", { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains("transcripts")) {
        db.createObjectStore("transcripts", { keyPath: "id" });
      }
    });
    request.addEventListener("success", () => resolve(request.result));
    request.addEventListener("error", () => reject(request.error));
  });
}

async function idbGet(storeName, id) {
  const db = await openSttDb();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, "readonly");
    const request = transaction.objectStore(storeName).get(id);
    request.addEventListener("success", () => resolve(request.result || null));
    request.addEventListener("error", () => reject(request.error));
    transaction.addEventListener("complete", () => db.close());
  });
}

async function idbPut(storeName, value) {
  const db = await openSttDb();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, "readwrite");
    transaction.objectStore(storeName).put(value);
    transaction.addEventListener("complete", () => {
      db.close();
      resolve();
    });
    transaction.addEventListener("error", () => {
      db.close();
      reject(transaction.error);
    });
  });
}

async function idbDelete(storeName, id) {
  const db = await openSttDb();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, "readwrite");
    transaction.objectStore(storeName).delete(id);
    transaction.addEventListener("complete", () => {
      db.close();
      resolve();
    });
    transaction.addEventListener("error", () => {
      db.close();
      reject(transaction.error);
    });
  });
}

async function sha256ArrayBuffer(buffer) {
  const digest = await crypto.subtle.digest("SHA-256", buffer.slice(0));
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function formatMegabytes(bytes) {
  return (bytes / (1024 * 1024)).toFixed(1);
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
  const sttDictionary = sttTranslations[state.language] || sttTranslations[state.language?.split("-")[0]] || {};
  const fallback = translations.en[key] || key;
  const template = dictionary[key] || sttDictionary[key] || fallback;
  return Object.entries(params).reduce(
    (text, [name, value]) => text.replaceAll(`{${name}}`, value),
    template,
  );
}

function getLanguagePreference() {
  const supportedLanguages = Object.keys(translations);
  const preferredLanguages = navigator.languages?.length ? navigator.languages : [navigator.language];

  for (const language of preferredLanguages) {
    const match = getSupportedLanguage(language, supportedLanguages);
    if (match) {
      return {
        language: match,
        isSupported: true,
      };
    }
  }

  return {
    language: "en",
    isSupported: false,
  };
}

function getSupportedLanguage(language, supportedLanguages) {
  if (!language) {
    return "";
  }

  const normalizedLanguage = language.trim();
  if (supportedLanguages.includes(normalizedLanguage)) {
    return normalizedLanguage;
  }

  const baseLanguage = normalizedLanguage.split("-")[0];
  return supportedLanguages.find((item) => item === baseLanguage || item.startsWith(`${baseLanguage}-`)) || "";
}

function getSavedSettings(defaultLanguage) {
  const fallback = {
    ...DEFAULT_SETTINGS,
    language: defaultLanguage,
  };

  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    const language = translations[stored.language] ? stored.language : fallback.language;
    const theme = ["auto", "dark", "light"].includes(stored.theme) ? stored.theme : fallback.theme;
    const transcriptionLanguage = STT_LANGUAGES.has(stored.transcriptionLanguage)
      ? stored.transcriptionLanguage
      : fallback.transcriptionLanguage;
    return {
      language,
      theme,
      silenceThreshold: clampNumber(Number(stored.silenceThreshold ?? fallback.silenceThreshold), 0.005, 0.08),
      minSilenceSeconds: clampNumber(Number(stored.minSilenceSeconds ?? fallback.minSilenceSeconds), 1, 30),
      minAudibleSeconds: clampNumber(Number(stored.minAudibleSeconds ?? fallback.minAudibleSeconds), 0.1, 3),
      transcriptionEnabled: Boolean(stored.transcriptionEnabled ?? fallback.transcriptionEnabled),
      transcriptionLanguage,
    };
  } catch (error) {
    return fallback;
  }
}

function persistSettings() {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        language: state.language,
        theme: state.settings.theme,
        silenceThreshold: state.settings.silenceThreshold,
        minSilenceSeconds: state.settings.minSilenceSeconds,
        minAudibleSeconds: state.settings.minAudibleSeconds,
        transcriptionEnabled: state.settings.transcriptionEnabled,
        transcriptionLanguage: state.settings.transcriptionLanguage,
      }),
    );
  } catch (error) {
    // Storage can be unavailable in restrictive browser contexts.
  }
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

  syncTranscriptionUi();
  renderTranscript();
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
