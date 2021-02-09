import VideoElement from "./video-element";

class MediaDevicesWrapper {
  mediaDevices: MediaDevices;
  videoElement: VideoElement;

  constructor() {
    console.debug("MediaDevicesWrapper.constructor");
    this.mediaDevices = navigator.mediaDevices;
    this.videoElement = new VideoElement();
    this.mediaDevices.ondevicechange = (...args) => {
      this.onDeviceChange(...args);
    };

    this.asdf((...args) => this.videoElement.setMediaStream(...args));
  }

  asdf(mediaStreamHandler: (mediaStream: MediaStream) => void): void {
    console.debug("MediaDevicesWrapper.asdf");
    this.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then(mediaStreamHandler)
      .catch((...args) => this.onError(...args));
  }

  onDeviceChange(event: Event): void {
    console.debug("MediaDevicesWrapper.onDeviceChange", { event });
  }

  onError(...args: unknown[]): void {
    console.error("MediaDevicesWrapper.onError", ...args);
  }
}

export default MediaDevicesWrapper;
