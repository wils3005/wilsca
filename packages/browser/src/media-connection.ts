function onClose(): void {
  console.log("MediaConnection.onClose");
}

function onError(error: unknown): void {
  console.error("MediaConnection.onError", { error });
}

function onStream(mediaStream: MediaStream): void {
  console.log("MediaConnection.onStream");
  const element = document.querySelector("video#player2");

  if (!(element instanceof HTMLVideoElement)) {
    throw "oh no";
  }

  element.srcObject = mediaStream;
}

export { onClose, onError, onStream };
