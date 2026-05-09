// AudioNavigator PWA install and update helpers.
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
          console.warn("Could not check for an AudioNavigator service worker update.", error);
        });
      })
      .catch((error) => {
        console.warn("Could not register AudioNavigator service worker.", error);
      });
  });

  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (!state.pwaUpdateRestartRequested || state.pwaReloadingForUpdate) {
      return;
    }
    state.pwaReloadingForUpdate = true;
    window.location.reload();
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
  if (!state.pwaWaitingWorker) {
    return;
  }
  state.pwaUpdateRestartRequested = true;
  state.pwaWaitingWorker.postMessage({ type: "SKIP_WAITING" });
  pwaUpdateRestart.disabled = true;
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

