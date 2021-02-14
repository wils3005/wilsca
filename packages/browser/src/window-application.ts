import * as Zod from "zod";
import { DBNames, LogLevel } from "./enums";
import BaseApplication from "./base-application";

class WindowApplication extends BaseApplication {
  className = "WindowApplication";
  constraints = {
    video: true,
    audio: true,
  };

  databases = new Map<DBNames, IDBDatabase>();
  globalName = globalThis.constructor.name;
  peerConnections = new Map<string, RTCPeerConnection>();
  sw: ServiceWorker | null = null;
  swContainer: ServiceWorkerContainer | null = null;
  swRegistration: ServiceWorkerRegistration | null = null;
  swURL = "js/sw.js";

  constructor() {
    super();
    this.setVideoElement();
    globalThis.onload = () => this.setSWContainer();
  }

  setVideoElement(): void {
    navigator.mediaDevices
      .getUserMedia(this.constraints)
      .then((v) => this.setMediaStream(v))
      .catch((r) => this.log(r, LogLevel.ERROR));
  }

  setMediaStream(mediaStream: MediaStream): void {
    this.log("setMediaStream");
    const element = document.createElement("video");
    element.autoplay = true;
    element.muted = true;
    element.srcObject = mediaStream;
    Zod.instanceof(HTMLElement)
      .parse(document.querySelector("section#video"))
      .appendChild(element);
  }

  setSWContainer(): void {
    this.log("setSWContainer");
    this.swContainer = navigator.serviceWorker;
    this.swContainer.oncontrollerchange = (ev) => this.log(ev);
    this.swContainer.onmessage = (ev) => this.log(ev);
    this.swContainer.onmessageerror = (ev) => this.log(ev);

    void this.swContainer
      .register(this.swURL)
      .then((v) => this.setSWRegistration(v))
      .catch((r) => this.log(r));
  }

  setSWRegistration(r: ServiceWorkerRegistration): void {
    this.log("setSWRegistration");
    this.swRegistration = r;
    r.onupdatefound = (ev) => this.log(ev);
    r.update().catch((r) => this.log(r, LogLevel.ERROR));

    const serviceWorker =
      this.swRegistration.installing ??
      this.swRegistration.waiting ??
      this.swRegistration.active;

    if (serviceWorker) this.setSW(serviceWorker);
  }

  setSW(sw: ServiceWorker): void {
    this.log("setSW");
    this.sw = sw;
    this.sw.onstatechange = (e) => this.log(e);
    this.sw.onerror = (e) => this.log(e, LogLevel.ERROR);
  }
}

Object.assign(globalThis, {
  app: new WindowApplication(),
});

export default WindowApplication;
