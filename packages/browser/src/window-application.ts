import * as Zod from "zod";
import BaseApplication from "./base-application";

class WindowApplication extends BaseApplication {
  className = "WindowApplication";

  url = "http://localhost:8080";

  webSocket: WebSocket | null = null;
  rtcPeerConnections = new Map<string, RTCPeerConnection>();

  constructor() {
    super();
    const constraints = {
      video: true,
      audio: true,
    };

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((s) => this.setStream(s))
      .catch((error) => console.error(error));

    this.log("constructor");
  }

  setStream(mediaStream: MediaStream): void {
    this.log("setStream");
    const element = document.createElement("video");
    element.autoplay = true;
    element.muted = true;
    element.srcObject = mediaStream;
    Zod.instanceof(HTMLElement)
      .parse(document.querySelector("section#video"))
      .appendChild(element);
  }

  createWebSocket(): void {
    this.log("createWebSocket");
    this.webSocket = new WebSocket(this.url);
  }
}

export default WindowApplication;
