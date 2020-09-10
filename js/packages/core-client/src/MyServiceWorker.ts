/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import "./MyWebSocket";

const { name: globalThisType } = globalThis.constructor;
const moduleName = "MyServiceWorker";

addEventListeners();

export function addEventListeners(): void {
  if (globalThisType !== "ServiceWorkerGlobalScope") return;

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

// export function handleEvent(...args: unknown[]): void {
export function handleEvent(): void {
  const functionName = "handleEvent";
  console.info(timestamp(), globalThisType, moduleName, functionName);
}

export async function register(): Promise<void> {
  const functionName = "register";

  try {
    const { serviceWorker: container } = navigator;
    container.addEventListener("controllerchange", handleEvent);
    container.addEventListener("message", handleEvent);
    container.addEventListener("messageerror", handleEvent);

    const registration = await container.register("./MyServiceWorker.js");
    registration.addEventListener("updatefound", handleEvent);
  } catch (e) {
    console.error(timestamp(), globalThisType, moduleName, functionName, e);
  }
}

export function handleControllerChange(this: ServiceWorkerContainer): void {
  const functionName = "handleControllerChange";
  console.info(timestamp(), globalThisType, moduleName, functionName);
}

export function handleContainerMessage(this: ServiceWorkerContainer): void {
  const functionName = "handleContainerMessage";
  console.info(timestamp(), globalThisType, moduleName, functionName);
}

export function handleRegistrationUpdateFound(
  this: ServiceWorkerRegistration
): void {
  const functionName = "handleRegistrationUpdateFound";
  console.info(timestamp(), globalThisType, moduleName, functionName);
}

export function timestamp(): string {
  const a = /\d{2}:\d{2}:\d{2}\.\d{3}/.exec(new Date().toJSON()) || [""];
  return a[0];
}
