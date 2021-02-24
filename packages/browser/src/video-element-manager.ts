import * as Zod from "zod";
import Base, { LogLevel } from "./base";

class VideoElementManager extends Base {
  static readonly CONSTRAINTS = {
    video: true,
    audio: true,
  };

  element?: HTMLVideoElement;
  stream?: MediaStream;

  constructor() {
    super();
    this.handleElement(globalThis.document.createElement("video"));
  }

  handleElement(element: HTMLVideoElement): void {
    element.onerror = (ev) => this.log(ev, LogLevel.ERROR);
    element.autoplay = true;

    // local or remote stream?
    element.muted = true;
    globalThis.navigator.mediaDevices
      .getUserMedia(VideoElementManager.CONSTRAINTS)
      .then((stream) => this.handleStream(stream))
      .catch((r) => this.log(r, LogLevel.ERROR));

    Zod.instanceof(HTMLElement)
      .parse(document.querySelector("section#video"))
      .appendChild(element);

    this.element = element;
  }

  handleStream(stream: MediaStream): void {
    this.log("handleStream");
    stream.onaddtrack = (ev) => this.log(ev);
    stream.onremovetrack = (ev) => this.log(ev);
    if (this.element) this.element.srcObject = stream;
    this.stream = stream;
  }
}

export default VideoElementManager;
