const {
  constructor: { name },
  location: { pathname },
} = globalThis;

const scriptUrl = "./serviceWorker.js";

function addEventListeners() {
  if (name != "ServiceWorkerGlobalScope") return;

  globalThis.addEventListener("activate", onEvent);
  globalThis.addEventListener("contentdelete", onEvent);
  globalThis.addEventListener("fetch", onEvent);
  globalThis.addEventListener("install", onEvent);
  globalThis.addEventListener("message", onEvent);
  globalThis.addEventListener("messageerror", onEvent);
  globalThis.addEventListener("notificationclick", onEvent);
  globalThis.addEventListener("notificationclose", onEvent);
  globalThis.addEventListener("push", onEvent);
  globalThis.addEventListener("pushsubscriptionchange", onEvent);
  globalThis.addEventListener("sync", onEvent);
}

function log(error) {
  const message = {
    globalThis: name,
    location: pathname,
    function: String(/at (.+) /.exec(new Error().stack.split("\n")[2]).pop()),
  };

  error ? console.error({ ...message, error }) : console.info(message);
}

function onEvent() {
  log();
}

async function register() {
  try {
    const { serviceWorker: container } = navigator;
    container.addEventListener("controllerchange", onEvent);
    container.addEventListener("message", onEvent);
    container.addEventListener("messageerror", onEvent);
    const registration = await container.register(scriptUrl);
    registration.addEventListener("updatefound", onEvent);
  } catch (e) {
    log(e);
  }
}

register();
