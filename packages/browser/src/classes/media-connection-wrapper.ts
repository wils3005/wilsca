import Peer from "peerjs";
import VideoElement from "./video-element";

class MediaConnectionWrapper {
  mediaConnection: Peer.MediaConnection;
  videoElement: VideoElement;

  constructor(
    mediaConnection: Peer.MediaConnection,
    videoElement?: VideoElement
  ) {
    console.debug("MediaConnectionWrapper.constructor");
    this.mediaConnection = mediaConnection;
    this.videoElement = videoElement ?? new VideoElement();

    mediaConnection.on("close", (...args) => this.onClose(...args));
    mediaConnection.on("stream", (...args) => this.onStream(...args));
    mediaConnection.on("error", (...args) => this.onError(...args));
  }

  answer(localStream: MediaStream): void {
    this.mediaConnection.answer(localStream);
  }

  onClose(): void {
    console.debug("MediaConnectionWrapper.onClose");
  }

  onError(error: unknown): void {
    console.error("MediaConnectionWrapper.onError", { error });
  }

  onStream(mediaStream: MediaStream): void {
    console.debug("MediaConnectionWrapper.onStream", { mediaStream });
    this.videoElement.setMediaStream(mediaStream);
  }
}

export default MediaConnectionWrapper;
