import * as Zod from "zod";
import Base from "./base";
import { LogLevel } from "./enums";

class LocalVideoElement extends Base {
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
    element.muted = true;
    globalThis.navigator.mediaDevices
      .getUserMedia(LocalVideoElement.CONSTRAINTS)
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

export default LocalVideoElement;
