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

function isPwaInstallContext() {
  const isHttpApp = window.location.protocol === "https:"
    || window.location.hostname === "localhost"
    || window.location.hostname === "127.0.0.1";
  return isHttpApp && isChromiumBrowser() && !isInstalledPwaContext();
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

function syncInstallButton() {
  if (!isPwaInstallContext()) {
    state.deferredInstallPrompt = null;
  }

  installButton.classList.toggle(
    "is-hidden",
    !state.deferredInstallPrompt || !isPwaInstallContext(),
  );
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
    console.warn("Wavey Audio Navigator install prompt was dismissed before a choice was returned.", error);
  }
}
