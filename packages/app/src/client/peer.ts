const peer = new Peer();
console.log({ peer });

function onCall(mediaConnection: Peer.MediaConnection): void {
  console.log({ mediaConnection });

  const { mediaDevices } = navigator;

  void mediaDevices.getUserMedia({ video: true, audio: true });
}

function onStream(mediaStream: MediaStream) {
  console.log({ mediaStream });

  const element = document.querySelector("video#player1");
  if (!(element instanceof HTMLVideoElement)) {
    throw "oh no";
  }

  element.srcObject = mediaStream;
}

navigator.mediaDevices
  .getUserMedia({ video: true, audio: true })
  .then(onStream)
  .catch((error: Error) => console.error({ error }));

// answer
peer.on("call", onCall);

export {};
