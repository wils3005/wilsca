import * as Zod from "zod";

class MediaDevicesWrapper {
  mediaDevices: MediaDevices;

  constructor() {
    console.debug("MediaDevicesWrapper.constructor");
    this.mediaDevices = navigator.mediaDevices;

    this.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((mediaStream) => this.onStream(mediaStream))
      .catch(console.error);
  }

  onStream(mediaStream: MediaStream): void {
    console.debug("MediaDevicesWrapper.onStream");
    this.getElement().srcObject = mediaStream;
  }

  getElement(): HTMLVideoElement {
    console.debug("MediaDevicesWrapper.getElement");
    return Zod.instanceof(HTMLVideoElement).parse(
      document.querySelector("video#player1")
    );
  }
}

export default MediaDevicesWrapper;
