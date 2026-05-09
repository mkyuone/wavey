const fileInput = document.querySelector("#fileInput");
const APP_VERSION = "1.0.4";
const APP_VERSION_CHANNEL = "";
const APP_VERSION_LABEL = APP_VERSION_CHANNEL ? `${APP_VERSION}-${APP_VERSION_CHANNEL}` : APP_VERSION;
window.APP_VERSION = APP_VERSION;
window.APP_VERSION_CHANNEL = APP_VERSION_CHANNEL;
window.APP_VERSION_LABEL = APP_VERSION_LABEL;
if (APP_VERSION_CHANNEL) {
  document.documentElement.dataset.buildChannel = APP_VERSION_CHANNEL;
}
registerPwaServiceWorker();
const installButton = document.querySelector("#installButton");
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
const themeColorMeta = document.querySelector("meta[name='theme-color']");
const colorSchemeQuery = window.matchMedia?.("(prefers-color-scheme: dark)");
const themeOptions = [...document.querySelectorAll("input[name='themeMode']")];
const silenceThresholdInput = document.querySelector("#silenceThresholdInput");
const silenceThresholdValue = document.querySelector("#silenceThresholdValue");
const minSilenceInput = document.querySelector("#minSilenceInput");
const minSilenceValue = document.querySelector("#minSilenceValue");
const minAudibleInput = document.querySelector("#minAudibleInput");
const minAudibleValue = document.querySelector("#minAudibleValue");

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
    installApp: "Install app",
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
    installApp: "Instalar app",
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
    installApp: "Installer l'app",
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
    installApp: "App installieren",
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
    installApp: "Instalar app",
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
    installApp: "Установить",
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
    installApp: "ऐप इंस्टॉल करें",
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
    installApp: "アプリをインストール",
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
    installApp: "앱 설치",
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
    installApp: "安装应用",
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
    installApp: "安裝 App",
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

const STORAGE_KEY = "audioNavigatorSettings";
const DEFAULT_SETTINGS = {
  theme: "auto",
  silenceThreshold: 0.01,
  minSilenceSeconds: 12,
  minAudibleSeconds: 0.2,
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
  },
  settingsStorageHydrated: false,
  settingsChangedBeforeHydration: false,
  audioBuffer: null,
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
  deferredInstallPrompt: null,
  staticWaveformCanvas: null,
  staticWaveformContext: null,
  canvasPixelWidth: 0,
  canvasPixelHeight: 0,
  lastCurrentTimeText: "",
  lastDurationText: "",
  lastTimelineValue: "",
};

const RMS_WINDOW_SECONDS = 0.05;
const SEEK_EPSILON = 0.08;
const ANALYSIS_CHUNK_DURATION_MS = 16;
const SUPPORTED_AUDIO_EXTENSIONS = new Set(["aac", "flac", "m4a", "mp3", "oga", "ogg", "opus", "wav", "weba"]);
const SUPPORTED_VIDEO_EXTENSIONS = new Set(["avi", "m4v", "mkv", "mov", "mp4", "webm"]);
const RECORDED_AUDIO_MIME_TYPES = [
  "audio/webm;codecs=opus",
  "audio/webm",
  "audio/ogg;codecs=opus",
  "audio/ogg",
  "audio/mp4",
];
const PWA_THEME_COLORS = {
  light: "#3D59F5",
  dark: "#242833",
};

class UnsupportedMediaError extends Error {
  constructor(message = "Unsupported media file.") {
    super(message);
    this.name = "UnsupportedMediaError";
  }
}

installButton.addEventListener("click", promptPwaInstall);
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
  state.deferredInstallPrompt = event;
  syncInstallButton();
});

window.addEventListener("appinstalled", () => {
  state.deferredInstallPrompt = null;
  syncInstallButton();
});
window.addEventListener("pageshow", syncInstallButton);

if ("launchQueue" in window) {
  window.launchQueue.setConsumer(handlePwaLaunchFiles);
}

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

window.addEventListener("resize", scheduleResizeCanvas);
document.addEventListener("keydown", handleKeyboardControls);
applyTheme();
syncSettingsControls();
syncAppVersion();
setLanguage(state.language, false);
applyLanguage();
hydratePersistentSettings().catch(() => {
  state.settingsStorageHydrated = true;
});

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
    setError(error instanceof UnsupportedMediaError ? "unsupportedFile" : "decodeError");
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
  if (event.defaultPrevented || isSettingsOpen() || !state.audioBuffer) {
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

function openSettings() {
  settingsBackdrop.classList.remove("is-hidden");
  settingsBackdrop.setAttribute("aria-hidden", "false");
  setLanguageMenuOpen(false);
  setJumpMenuOpen(false);
  settingsClose.focus();
}

function closeSettings() {
  closeLicenses({ restoreFocus: false });
  settingsBackdrop.classList.add("is-hidden");
  settingsBackdrop.setAttribute("aria-hidden", "true");
  setLanguageMenuOpen(false);
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

function normalizeStoredSettings(storedSettings, defaultLanguage) {
  const stored = parseStoredSettings(storedSettings);
  const fallback = {
    ...DEFAULT_SETTINGS,
    language: defaultLanguage,
  };

  const language = translations[stored.language] ? stored.language : fallback.language;
  const theme = ["auto", "dark", "light"].includes(stored.theme) ? stored.theme : fallback.theme;
  return {
    language,
    theme,
    silenceThreshold: clampNumber(Number(stored.silenceThreshold ?? fallback.silenceThreshold), 0.005, 0.08),
    minSilenceSeconds: clampNumber(Number(stored.minSilenceSeconds ?? fallback.minSilenceSeconds), 1, 30),
    minAudibleSeconds: clampNumber(Number(stored.minAudibleSeconds ?? fallback.minAudibleSeconds), 0.1, 3),
  };
}

function parseStoredSettings(storedSettings) {
  if (!storedSettings) {
    return {};
  }

  if (typeof storedSettings === "string") {
    try {
      return JSON.parse(storedSettings) || {};
    } catch (error) {
      return {};
    }
  }

  return typeof storedSettings === "object" ? storedSettings : {};
}

function getSavedSettings(defaultLanguage) {
  try {
    return normalizeStoredSettings(localStorage.getItem(STORAGE_KEY), defaultLanguage);
  } catch (error) {
    return normalizeStoredSettings({}, defaultLanguage);
  }
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
  const boundedPercent = Math.min(100, Math.max(0, percent));
  const thumbSize = Number.parseFloat(getComputedStyle(input).getPropertyValue("--range-thumb-size")) || 18;
  const thumbOffset = (thumbSize / 2) - ((boundedPercent / 100) * thumbSize);
  input.style.setProperty("--range-fill", `calc(${boundedPercent}% + ${thumbOffset.toFixed(3)}px)`);
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

function registerPwaServiceWorker() {
  const canRegister = "serviceWorker" in navigator
    && (window.location.protocol === "https:" || window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");

  if (!canRegister) {
    return;
  }

  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js", { updateViaCache: "none" })
      .then((registration) => registration.update())
      .catch((error) => {
        console.warn("Could not register AudioNavigator service worker.", error);
      });
  });
}

function isPwaInstallContext() {
  const isHttpApp = window.location.protocol === "https:"
    || window.location.hostname === "localhost"
    || window.location.hostname === "127.0.0.1";
  return isHttpApp && !isInstalledPwaContext();
}

function isInstalledPwaContext() {
  const displayModes = ["standalone", "fullscreen", "minimal-ui", "window-controls-overlay"];
  return Boolean(window.navigator.standalone)
    || displayModes.some((mode) => window.matchMedia?.(`(display-mode: ${mode})`).matches);
}

function syncInstallButton() {
  if (!isPwaInstallContext()) {
    state.deferredInstallPrompt = null;
  }

  installButton.classList.toggle("is-hidden", !state.deferredInstallPrompt || !isPwaInstallContext());
}

async function promptPwaInstall() {
  if (!state.deferredInstallPrompt) {
    return;
  }

  const installPrompt = state.deferredInstallPrompt;
  state.deferredInstallPrompt = null;
  syncInstallButton();

  installPrompt.prompt();

  try {
    await installPrompt.userChoice;
  } catch (error) {
    console.warn("AudioNavigator install prompt was dismissed before a choice was returned.", error);
  }
}
