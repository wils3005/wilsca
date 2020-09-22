import './webSocket';
import { log } from './log';

const { name: globalThisType } = globalThis.constructor;
const scriptUrl = './sw.js';

function addEventListeners(): void {
  addEventListener('activate', onEvent);
  addEventListener('contentdelete', onEvent);
  addEventListener('fetch', onEvent);
  addEventListener('install', onEvent);
  addEventListener('message', onEvent);
  addEventListener('messageerror', onEvent);
  addEventListener('notificationclick', onEvent);
  addEventListener('notificationclose', onEvent);
  addEventListener('push', onEvent);
  addEventListener('pushsubscriptionchange', onEvent);
  addEventListener('sync', onEvent);
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

function onLoad(): void {
  if (globalThisType == 'ServiceWorkerGlobalScope') addEventListeners();
  void register();
}

function onRegistrationUpdateFound(this: ServiceWorkerRegistration): void {
  log();
}

async function register(): Promise<void> {
  try {
    const { serviceWorker: container } = navigator;
    container.addEventListener('controllerchange', onEvent);
    container.addEventListener('message', onEvent);
    container.addEventListener('messageerror', onEvent);
    const registration = await container.register(scriptUrl);
    registration.addEventListener('updatefound', onEvent);
  } catch (e) {
    log(e);
  }
}

export {
  addEventListeners,
  onContainerMessage,
  onControllerChange,
  onEvent,
  onLoad,
  onRegistrationUpdateFound,
  register,
};

addEventListener('load', onLoad);
