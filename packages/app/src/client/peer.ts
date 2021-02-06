const peer = new Peer({
  host: "localhost",
  key: "baz",
  path: "/foo/bar",
  port: 8080,
});

// http://localhost:8080/[path]/[key]/id
// http://localhost:8080/[path]/[key]/peers
// http://localhost:8080/peerjs/myapp/asdf/peers

function onCall(mediaConnection: Peer.MediaConnection): void {
  console.log({ mediaConnection });

  const { mediaDevices } = navigator;

  void mediaDevices.getUserMedia({ video: true, audio: true });
}

function onConnection(dataConnection: Peer.DataConnection): void {
  // TODO
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

peer.on("open", (id: string) => console.log(id));
peer.on("connection", onConnection);
peer.on("close", () => console.log("peer connection closed"));
peer.on("call", onCall);
peer.on("disconnected", () => console.log("peer connection disconnected"));
peer.on("error", () => console.error("peer connection error"));

export {};
