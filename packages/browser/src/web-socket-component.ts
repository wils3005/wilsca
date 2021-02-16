import BaseComponent from "./base-component";
import { LogLevel } from "./enums";
import MessageEventData from "./message-event-data";

class WebSocketComponent extends BaseComponent {
  static readonly CONSTRAINTS = {
    video: true,
    audio: true,
  };

  static readonly WS_URL = "ws://localhost:8080";
  webSocket = new WebSocket(WebSocketComponent.WS_URL);

  constructor() {
    super();
    this.logger("createWebSocket");
    this.webSocket.onclose = (ev) => this.logger(ev);
    this.webSocket.onerror = (ev) => this.logger(ev, LogLevel.ERROR);
    this.webSocket.onmessage = (ev) => new MessageEventData(ev);
    this.webSocket.onopen = (ev) => this.handleOpen(ev);
  }

  handleOpen(ev: Event): void {
    this.logger("handleOpen");
    const rtcPeerConnection = new RTCPeerConnection({
      iceServers: [
        {
          urls: "stun:stun.l.google.com:19302",
        },
      ],
    });

    globalThis.navigator.mediaDevices
      .getUserMedia(WebSocketComponent.CONSTRAINTS)
      .then((stream) => {
        const localMediaStream = stream;
        localMediaStream
          .getTracks()
          .forEach((t) => rtcPeerConnection.addTrack(t));
      })
      .catch((r) => this.logger(r, LogLevel.ERROR));

    rtcPeerConnection
      .createOffer()
      .then((rtcSessionDescriptionInit) => {
        const rtcSessionDescription = rtcSessionDescriptionInit;
        rtcPeerConnection
          .setLocalDescription(rtcSessionDescription)
          .catch((r) => this.logger(r, LogLevel.ERROR));
      })
      .catch((r) => this.logger(r, LogLevel.ERROR));

    this.webSocket.send(
      JSON.stringify({
        sdp: rtcPeerConnection.localDescription,
      })
    );
  }
}

export default WebSocketComponent;
