import * as Zod from "zod";

// TODO
// create websocket
//   connect to websocket server

class RTCClient {
  url = "http://localhost:8080";

  webSocket: WebSocket | null = null;
  rtcPeerConnections = new Map<string, RTCPeerConnection>();

  constructor() {
    const constraints = {
      video: true,
      audio: true,
    };

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((s) => this.onStream(s))
      .catch((error) => console.error(error));
  }

  onStream(mediaStream: MediaStream): void {
    console.debug("RTCClient.onStream", { mediaStream });
    const element = document.createElement("video");
    element.autoplay = true;
    element.muted = true;
    element.srcObject = mediaStream;
    Zod.instanceof(HTMLElement)
      .parse(document.querySelector("section#video"))
      .appendChild(element);
  }

  // close, error, message, open
  createWebSocket(): void {
    this.webSocket = new WebSocket(this.url);
  }

  creeateRTCPeerConnection(): void {
    // TODO
  }
}

export default RTCClient;
