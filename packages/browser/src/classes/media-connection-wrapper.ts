import * as Zod from "zod";
import Peer from "peerjs";

class MediaConnectionWrapper {
  mediaConnection: Peer.MediaConnection;

  constructor(mediaConnection: Peer.MediaConnection) {
    console.debug("MediaConnectionWrapper.constructor");
    this.mediaConnection = mediaConnection;

    mediaConnection.on("stream", (...args) => this.onStream(...args));
    mediaConnection.on("close", (...args) => this.onClose(...args));
    mediaConnection.on("error", (...args) => this.onError(...args));
  }

  getElement(): HTMLVideoElement {
    return Zod.instanceof(HTMLVideoElement).parse(
      document.querySelector("video#player2")
    );
  }
  onClose(): void {
    console.debug("MediaConnectionWrapper.onClose");
  }

  onError(error: unknown): void {
    console.error("MediaConnectionWrapper.onError", { error });
  }

  onStream(mediaStream: MediaStream): void {
    console.debug("MediaConnectionWrapper.onStream");
    this.getElement().srcObject = mediaStream;
  }
}

export default MediaConnectionWrapper;
