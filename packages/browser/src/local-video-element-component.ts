import * as Zod from "zod";
import BaseComponent from "./base-component";
import { LogLevel } from "./enums";

class LocalVideoElementComponent extends BaseComponent {
  static readonly CONSTRAINTS = {
    video: true,
    audio: true,
  };

  element = globalThis.document.createElement("video");

  constructor() {
    super();
    this.element.onerror = (ev) => this.logger(ev, LogLevel.ERROR);
    this.element.autoplay = true;
    this.element.muted = true;
    Zod.instanceof(HTMLElement)
      .parse(document.querySelector("section#video"))
      .appendChild(this.element);

    globalThis.navigator.mediaDevices
      .getUserMedia(LocalVideoElementComponent.CONSTRAINTS)
      .then((stream) => this.handleMediaStream(stream))
      .catch((r) => this.logger(r, LogLevel.ERROR));
  }

  handleMediaStream(stream: MediaStream): void {
    this.logger("handleMediaStream");
    stream.onaddtrack = (ev) => this.logger(ev);
    stream.onremovetrack = (ev) => this.logger(ev);
    this.element.srcObject = stream;
  }
}

export default LocalVideoElementComponent;
