import * as Zod from "zod";

class VideoElement {
  element: HTMLVideoElement;

  constructor(element?: HTMLVideoElement) {
    this.element = element ?? document.createElement("video");
  }

  getParent(): HTMLElement {
    return Zod.instanceof(HTMLElement).parse(
      document.querySelector("section#peer")
    );
  }

  setMediaStream(mediaStream: MediaStream): void {
    this.element.autoplay = true;
    this.element.muted = true;
    this.element.srcObject = mediaStream;
    this.getParent().appendChild(this.element);
  }
}

export default VideoElement;
