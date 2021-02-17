import Base, { LogLevel } from "./base";

class PeerConnectionManager extends Base {
  static readonly RTC_CONFIGURATION = {
    iceServers: [
      {
        urls: "stun:stun.l.google.com:19302",
      },
    ],
  };

  static readonly CONSTRAINTS = {
    video: true,
    audio: true,
  };

  connection = new RTCPeerConnection(PeerConnectionManager.RTC_CONFIGURATION);
  webSocket: WebSocket;

  constructor(webSocket: WebSocket) {
    super();
    this.webSocket = webSocket;

    globalThis.navigator.mediaDevices
      .getUserMedia(PeerConnectionManager.CONSTRAINTS)
      .then((x) => this.handleStream(x))
      .catch((x) => this.log(x, LogLevel.ERROR));

    this.connection
      .createOffer()
      .then((x) => this.handleSessionDescriptionInit(x))
      .catch((x) => this.log(x, LogLevel.ERROR));

    this.webSocket.send(
      JSON.stringify({ sdp: this.connection.localDescription })
    );
  }

  handleSessionDescriptionInit(init: RTCSessionDescriptionInit): void {
    this.connection
      .setLocalDescription(init)
      .catch((r) => this.log(r, LogLevel.ERROR));
  }

  handleStream(stream: MediaStream): void {
    stream.getTracks().forEach((x) => this.connection.addTrack(x));
  }
}

export default PeerConnectionManager;
