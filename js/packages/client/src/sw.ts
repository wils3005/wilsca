import "./MyWebSocket";
import log from "./log";

const { name: globalThisType } = globalThis.constructor;

addEventListener("load", handleLoad);

////////////////////////////////////////////////////////////////////////////////
export function handleLoad(): void {
  if (globalThisType == "ServiceWorkerGlobalScope") addEventListeners();
  void register();
}

export function addEventListeners(): void {
  addEventListener("activate", handleEvent);
  addEventListener("contentdelete", handleEvent);
  addEventListener("fetch", handleEvent);
  addEventListener("install", handleEvent);
  addEventListener("message", handleEvent);
  addEventListener("messageerror", handleEvent);
  addEventListener("notificationclick", handleEvent);
  addEventListener("notificationclose", handleEvent);
  addEventListener("push", handleEvent);
  addEventListener("pushsubscriptionchange", handleEvent);
  addEventListener("sync", handleEvent);
}

export async function register(): Promise<void> {
  try {
    const { serviceWorker: container } = navigator;
    container.addEventListener("controllerchange", handleEvent);
    container.addEventListener("message", handleEvent);
    container.addEventListener("messageerror", handleEvent);
    const registration = await container.register("./sw.js");
    registration.addEventListener("updatefound", handleEvent);
  } catch (e) {
    log(e);
  }
}

export function handleEvent(): void {
  log();
}

export function handleControllerChange(this: ServiceWorkerContainer): void {
  log();
}

export function handleContainerMessage(this: ServiceWorkerContainer): void {
  log();
}

export function handleRegistrationUpdateFound(
  this: ServiceWorkerRegistration
): void {
  log();
}
