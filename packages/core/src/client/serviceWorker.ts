/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */

// import * as webSocket from "./webSocket";

// const ws = webSocket.create();
// location: WorkerLocation
//   hash: ""
//   host: "localhost:64596"
//   hostname: "localhost"
//   href: "http://localhost:64596/serviceWorker.bundle.js"
//   origin: "http://localhost:64596"
//   pathname: "/serviceWorker.bundle.js"
//   port: "64596"
//   protocol: "http:"
//   search: ""

const { name } = globalThis.constructor;
const url = "http://localhost:64596/serviceWorker.js";

// const workerScope = (globalThis as unknown) as ServiceWorkerGlobalScope;

if (name == "Window") {
  addEventListener("load", () => void register());
} else if (name == "ServiceWorkerGlobalScope") {
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

export function handleEvent(...args: unknown[]): void {
  console.info(timestamp(), name, ...args);
}

export async function register(): Promise<void> {
  try {
    const { serviceWorker: container } = navigator;
    container.addEventListener("controllerchange", handleEvent);
    container.addEventListener("message", handleEvent);
    container.addEventListener("messageerror", handleEvent);

    const registration = await container.register(url);
    registration.addEventListener("updatefound", handleEvent);
  } catch (e) {
    console.error(timestamp(), name, e);
  }
}

export function handleControllerChange(
  this: ServiceWorkerContainer,
  ev: Event
): void {
  console.info(timestamp(), name, ev);
}

export function handleContainerMessage(
  this: ServiceWorkerContainer,
  ev: MessageEvent
): void {
  console.info(timestamp(), name, ev);
}

export function handleRegistrationUpdateFound(
  this: ServiceWorkerRegistration,
  ev: Event
): void {
  console.info(timestamp(), name, ev);
}

export function timestamp(): string {
  const a = /\d{2}:\d{2}:\d{2}\.\d{3}/.exec(new Date().toJSON()) || [""];
  return a[0];
}
