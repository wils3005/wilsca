import * as MediaConnection from "./media-connection.js";

const { mediaDevices } = navigator;

const peer = new Peer({
  host: "localhost",
  key: "baz",
  path: "/foo/bar",
  port: 8080,
});

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
  console.log("peer.onCall");

  function onStream(mediaStream: MediaStream): void {
    console.log("peer.onCall.onStream");
    mediaConnection.answer(mediaStream);
    mediaConnection.on("stream", MediaConnection.onStream);
    mediaConnection.on("close", MediaConnection.onClose);
    mediaConnection.on("error", MediaConnection.onError);
  }

  mediaDevices
    .getUserMedia({ video: true, audio: true })
    .then(onStream)
    .catch(console.error);
}

function onConnection(dataConnection: Peer.DataConnection): void {
  console.log("peer.onConnection", { dataConnection });
}

function onClose(): void {
  console.log("peer.onClose");
}

function onOpen(id: string): void {
  console.info("peer.onOpen", { id });
}

function onDisconnected(): void {
  console.log("peer.onDisconnected");
}

function onError(error: Error): void {
  console.error("peer.onError", { error });
}

peer.on("call", onCall);
peer.on("close", onClose);
peer.on("connection", onConnection);
peer.on("open", onOpen);
peer.on("disconnected", onDisconnected);
peer.on("error", onError);

export default peer;
export { onCall, onClose, onConnection, onDisconnected, onError, onOpen };
