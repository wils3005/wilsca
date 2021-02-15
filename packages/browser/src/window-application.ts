import * as Zod from "zod";
import { DBNames, LogLevel } from "./enums";
import BaseApplication from "./base-application";

class WindowApplication extends BaseApplication {
  static CONSTRAINTS = {
    video: true,
    audio: true,
  };

  static SW_URL = "app.js";
  static WS_URL = "ws://localhost:8080";

  databases = new Map<DBNames, IDBDatabase>();
  peerConnections = new Map<string, RTCPeerConnection>();
  sw: ServiceWorker | null = null;
  swContainer: ServiceWorkerContainer | null = null;
  swRegistration: ServiceWorkerRegistration | null = null;
  ws: WebSocket | null = null;

  constructor() {
    super();
    this.setVideoElement();
    this.setWS();
    globalThis.onload = () => this.setSWContainer();
  }

  setVideoElement(): void {
    navigator.mediaDevices
      .getUserMedia(WindowApplication.CONSTRAINTS)
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
      .register(WindowApplication.SW_URL)
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

  setWS(): void {
    this.logger("setWS");
    this.ws = new WebSocket(WindowApplication.WS_URL);
    this.ws.onclose = (ev) => {
      this.logger(ev);
      this.setWS();
    };

    this.ws.onerror = (ev) => {
      this.logger(ev, LogLevel.ERROR);
      this.setWS();
    };

    this.ws.onmessage = (ev) => {
      this.logger(ev);
    };

    this.ws.onopen = (ev) => this.logger(ev);
  }
}

export default WindowApplication;
