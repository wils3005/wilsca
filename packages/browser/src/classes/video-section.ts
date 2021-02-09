import VideoElement from "./video-element";

class VideoSection {
  set: Set<VideoElement>;

  constructor() {
    this.set = new Set();
    document
      .querySelectorAll<HTMLVideoElement>("section#peer > video")
      .forEach((e) => this.set.add(new VideoElement(e)));
  }

  addMediaStream(mediaStream: MediaStream): void {
    new VideoElement().setMediaStream(mediaStream);
  }
}

export default VideoSection;
