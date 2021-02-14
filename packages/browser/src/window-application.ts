import * as Zod from "zod";
import { DBNames, LogLevel } from "./enums";

class WindowApplication {
  constraints = {
    video: true,
    audio: true,
  };

  databases = new Map<DBNames, IDBDatabase>();
  peerConnections = new Map<string, RTCPeerConnection>();
  sw: ServiceWorker | null = null;
  swContainer: ServiceWorkerContainer | null = null;
  swRegistration: ServiceWorkerRegistration | null = null;
  swURL = "app.js";

  constructor() {
    this.setVideoElement();
    globalThis.onload = () => this.setSWContainer();
  }

  logger(msg?: unknown, level = LogLevel.DEBUG): void {
    console[level](globalThis.constructor.name, this.constructor.name, msg);
  }

  setVideoElement(): void {
    navigator.mediaDevices
      .getUserMedia(this.constraints)
      .then((v) => this.setMediaStream(v))
      .catch((r) => this.logger(r, LogLevel.ERROR));
  }

  setMediaStream(mediaStream: MediaStream): void {
    this.logger("setMediaStream");
    const element = document.createElement("video");
    element.autoplay = true;
    element.muted = true;
    element.srcObject = mediaStream;
    Zod.instanceof(HTMLElement)
      .parse(document.querySelector("section#video"))
      .appendChild(element);
  }

  setSWContainer(): void {
    this.logger("setSWContainer");
    this.swContainer = navigator.serviceWorker;
    this.swContainer.oncontrollerchange = (ev) => this.logger(ev);
    this.swContainer.onmessage = (ev) => this.logger(ev);
    this.swContainer.onmessageerror = (ev) => this.logger(ev);

    void this.swContainer
      .register(this.swURL)
      .then((v) => this.setSWRegistration(v))
      .catch((r) => this.logger(r));
  }

  setSWRegistration(r: ServiceWorkerRegistration): void {
    this.logger("setSWRegistration");
    this.swRegistration = r;
    r.onupdatefound = (ev) => this.logger(ev);
    r.update().catch((r) => this.logger(r, LogLevel.ERROR));

    const serviceWorker =
      this.swRegistration.installing ??
      this.swRegistration.waiting ??
      this.swRegistration.active;

    if (serviceWorker) this.setSW(serviceWorker);
  }

  setSW(sw: ServiceWorker): void {
    this.logger("setSW");
    this.sw = sw;
    this.sw.onstatechange = (e) => this.logger(e);
    this.sw.onerror = (e) => this.logger(e, LogLevel.ERROR);
  }
}

export default WindowApplication;
