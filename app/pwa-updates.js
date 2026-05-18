// Wavey Audio Navigator PWA install and update helpers.
function registerPwaServiceWorker() {
  const canRegister = "serviceWorker" in navigator
    && (window.location.protocol === "https:" || window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");

  if (!canRegister) {
    return;
  }

  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js", { updateViaCache: "none" })
      .then((registration) => {
        watchPwaUpdates(registration);
        registration.update().catch((error) => {
          console.warn("Could not check for a Wavey Audio Navigator service worker update.", error);
        });
      })
      .catch((error) => {
        console.warn("Could not register Wavey Audio Navigator service worker.", error);
      });
  });

  navigator.serviceWorker.addEventListener("controllerchange", () => {
    forceRefreshAppShell();
  });
}

function watchPwaUpdates(registration) {
  if (registration.waiting) {
    showPwaUpdateNotice(registration.waiting);
  }

  registration.addEventListener("updatefound", () => {
    const installingWorker = registration.installing;
    if (!installingWorker) {
      return;
    }

    installingWorker.addEventListener("statechange", () => {
      if (installingWorker.state === "installed" && navigator.serviceWorker.controller) {
        showPwaUpdateNotice(installingWorker);
      }
    });
  });
}

function showPwaUpdateNotice(worker) {
  state.pwaWaitingWorker = worker;
  pwaUpdateNotice.classList.remove("is-hidden");
  pwaUpdateNotice.setAttribute("aria-hidden", "false");
}

function restartPwaForUpdate() {
  pwaUpdateRestart.disabled = true;

  if (state.pwaWaitingWorker) {
    state.pwaWaitingWorker.postMessage({ type: "SKIP_WAITING" });
  }

  window.setTimeout(forceRefreshAppShell, 800);
}

function forceRefreshAppShell() {
  if (state.pwaReloadingForUpdate) {
    return;
  }
  state.pwaReloadingForUpdate = true;

  const url = new URL(window.location.href);
  url.searchParams.set("app-refresh", Date.now().toString(36));
  window.location.replace(url.href);
}

function isHttpAppContext() {
  return window.location.protocol === "https:"
    || window.location.hostname === "localhost"
    || window.location.hostname === "127.0.0.1";
}

function isPwaInstallContext() {
  return isHttpAppContext() && isChromiumBrowser() && !isInstalledPwaContext();
}

function isChromiumBrowser() {
  const brands = navigator.userAgentData?.brands || [];
  if (brands.length) {
    return brands.some((brand) => /Chromium|Google Chrome|Microsoft Edge/i.test(brand.brand));
  }

  const userAgent = navigator.userAgent;
  return /\b(Chrome|Chromium|Edg|OPR)\//.test(userAgent)
    && !/\b(Firefox|FxiOS)\b/.test(userAgent);
}

function isInstalledPwaContext() {
  const displayModes = ["standalone", "fullscreen", "minimal-ui", "window-controls-overlay"];
  return Boolean(window.navigator.standalone)
    || displayModes.some((mode) => window.matchMedia?.(`(display-mode: ${mode})`).matches);
}

function canCheckInstalledRelatedPwa() {
  return isHttpAppContext()
    && !isInstalledPwaContext()
    && typeof navigator.getInstalledRelatedApps === "function";
}

function isRelatedWaveyPwa(app) {
  return app?.platform === "webapp";
}

function syncInstallButton() {
  let mode = "hidden";

  if (isInstalledPwaContext()) {
    state.deferredInstallPrompt = null;
    state.hasInstalledRelatedPwa = false;
  } else if (state.deferredInstallPrompt && isPwaInstallContext()) {
    mode = "install";
  } else if (state.hasInstalledRelatedPwa) {
    mode = "open";
  }

  state.pwaInstallButtonMode = mode;
  installButton.classList.toggle("is-hidden", mode === "hidden");

  if (mode === "hidden") {
    return;
  }

  const labelKey = mode === "open" ? "openInstalledApp" : "installApp";
  const icon = installButton.querySelector(".ui-icon");
  const label = installButton.querySelector("[data-i18n]");

  installButton.dataset.i18nAria = labelKey;
  installButton.setAttribute("aria-label", translate(labelKey));

  if (icon) {
    icon.textContent = mode === "open" ? "open_in_new" : "install_desktop";
  }

  if (label) {
    label.dataset.i18n = labelKey;
    label.textContent = translate(labelKey);
  }
}

async function refreshPwaInstallState() {
  const checkId = state.pwaInstallCheckId + 1;
  state.pwaInstallCheckId = checkId;

  if (!canCheckInstalledRelatedPwa()) {
    state.hasInstalledRelatedPwa = false;
    syncInstallButton();
    return;
  }

  try {
    const relatedApps = await navigator.getInstalledRelatedApps();
    if (checkId !== state.pwaInstallCheckId) {
      return;
    }
    state.hasInstalledRelatedPwa = relatedApps.some(isRelatedWaveyPwa);
  } catch (error) {
    if (checkId !== state.pwaInstallCheckId) {
      return;
    }
    state.hasInstalledRelatedPwa = false;
  }

  syncInstallButton();
}

function openInstalledPwa() {
  const appUrl = new URL(window.location.href);
  window.open(appUrl.href, "_blank", "noopener,noreferrer");
}

async function promptPwaInstall() {
  if (state.pwaInstallButtonMode === "open") {
    openInstalledPwa();
    return;
  }

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
    console.warn("Wavey Audio Navigator install prompt was dismissed before a choice was returned.", error);
  }

  refreshPwaInstallState();
}
