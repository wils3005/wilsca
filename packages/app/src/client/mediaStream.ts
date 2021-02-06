function onStream(mediaStream: MediaStream): void {
  console.log("mediaStream.onStream", { mediaStream });
  const element = document.querySelector("video#player1");

  if (!(element instanceof HTMLVideoElement)) {
    throw "oh no";
  }

  element.srcObject = mediaStream;
}

navigator.mediaDevices
  .getUserMedia({ video: true, audio: true })
  .then(onStream)
  .catch(console.error);

export { onStream };
