import "@wilsjs/web-socket";
import { log } from "@wilsjs/console-logger";

const { name } = globalThis.constructor;
const scriptUrl = "./sw.js";

function addEventListeners(): void {
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

function onContainerMessage(this: ServiceWorkerContainer): void {
  log();
}

function onControllerChange(this: ServiceWorkerContainer): void {
  log();
}

function onEvent(): void {
  log();
}

function onRegistrationUpdateFound(this: ServiceWorkerRegistration): void {
  log();
}

async function register(): Promise<void> {
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

export {
  addEventListeners,
  onContainerMessage,
  onControllerChange,
  onEvent,
  onRegistrationUpdateFound,
  register,
};
