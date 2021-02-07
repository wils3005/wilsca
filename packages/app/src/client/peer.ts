import * as MediaConnection from "./media-connection.js";

function main(): Peer {
  const peer = new Peer({
    host: "localhost",
    key: "mykey",
    path: "/p",
    port: 3478,
  });

  peer.on("call", onCall);
  peer.on("close", onClose);
  peer.on("connection", onConnection);
  peer.on("open", onOpen);
  peer.on("disconnected", onDisconnected);
  peer.on("error", onError);
  return peer;
}

// http://localhost:8080/[path]/[key]/id
// http://localhost:8080/[path]/[key]/peers
// http://localhost:8080/peerjs/myapp/asdf/peers

// CALL
// navigator.mediaDevices.getUserMedia({video: true, audio: true}, (stream) => {
//   const call = peer.call('another-peers-id', stream);
//   call.on('stream', (remoteStream) => {
//     // Show stream in some <video> element.
//   });
// }, (err) => {
//   console.error('Failed to get local stream', err);
// });

function onCall(mediaConnection: Peer.MediaConnection): void {
  console.info("peer.onCall");

  function onStream(mediaStream: MediaStream): void {
    console.info("peer.onCall.onStream");
    mediaConnection.answer(mediaStream);
    mediaConnection.on("stream", MediaConnection.onStream);
    mediaConnection.on("close", MediaConnection.onClose);
    mediaConnection.on("error", MediaConnection.onError);
  }

  navigator.mediaDevices
    .getUserMedia({ video: true, audio: true })
    .then(onStream)
    .catch(console.error);
}

function onConnection(dataConnection: Peer.DataConnection): void {
  console.info("peer.onConnection", { dataConnection });
}

function onClose(): void {
  console.info("peer.onClose");
}

function onOpen(id: string): void {
  console.info("peer.onOpen", { id });
}

function onDisconnected(): void {
  console.info("peer.onDisconnected");
}

function onError(error: unknown): void {
  console.error("peer.onError", { error });
}

export default main;
export { onCall, onClose, onConnection, onDisconnected, onError, onOpen };
