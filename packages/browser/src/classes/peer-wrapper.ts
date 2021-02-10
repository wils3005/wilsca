import MediaConnectionWrapper from "./media-connection-wrapper";
import MediaDevicesWrapper from "./media-devices-wrapper";
import Peer from "peerjs";
import VideoSection from "./video-section";

class PeerWrapper {
  mediaDevicesWrapper: MediaDevicesWrapper;
  peer: Peer;
  videoSection: VideoSection;

  static defaultPeer(): Peer {
    return new Peer({
      host: "localhost",
      key: "peerjs",
      path: "/p",
      port: 8081,
    });
  }

  constructor() {
    console.debug("PeerWrapper.constructor");
    this.mediaDevicesWrapper = new MediaDevicesWrapper();
    this.peer = PeerWrapper.defaultPeer();
    this.videoSection = new VideoSection();

    this.peer.on("call", (...args) => this.onCall(...args));
    this.peer.on("close", (...args) => this.onClose(...args));
    this.peer.on("connection", (...args) => this.onConnection(...args));
    this.peer.on("open", (...args) => this.onOpen(...args));
    this.peer.on("disconnected", (...args) => this.onDisconnected(...args));
    this.peer.on("error", (...args) => this.onError(...args));
  }

  // sending call
  call(id: string): void {
    console.debug("PeerWrapper.call", { id });

    this.mediaDevicesWrapper.asdf(
      (mediaStream) =>
        new MediaConnectionWrapper(this.peer.call(id, mediaStream))
    );
  }

  // receiving call
  onCall(mediaConnection: Peer.MediaConnection): void {
    console.debug("PeerWrapper.onCall", { mediaConnection });

    this.mediaDevicesWrapper.asdf((mediaStream) =>
      new MediaConnectionWrapper(mediaConnection).answer(mediaStream)
    );
  }

  onConnection(dataConnection: Peer.DataConnection): void {
    console.debug("PeerWrapper.onConnection", { dataConnection });
  }

  onClose(): void {
    console.debug("PeerWrapper.onClose");
  }

  onOpen(id: string): void {
    console.debug("PeerWrapper.onOpen", { id });
  }

  onDisconnected(): void {
    console.debug("PeerWrapper.onDisconnected");
  }

  onError(error: unknown): void {
    console.error("PeerWrapper.onError", { error });
  }
}

// http://localhost:8080/[path]/[key]/id
// http://localhost:8080/[path]/[key]/peers
// http://localhost:8080/peerjs/myapp/asdf/peers

export default PeerWrapper;
