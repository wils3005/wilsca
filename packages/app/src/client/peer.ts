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

// ANSWER
// peer.on('call', (call) => {
//   navigator.mediaDevices.getUserMedia({video: true, audio: true}, (stream) => {
//     call.answer(stream); // Answer the call with an A/V stream.
//     call.on('stream', (remoteStream) => {
//       // Show stream in some <video> element.
//     });
//   }, (err) => {
//     console.error('Failed to get local stream', err);
//   });
// });
function onCall(mediaConnection: Peer.MediaConnection): void {
  console.log("peer.onCall", { mediaConnection });
  // const { mediaDevices } = navigator;
  // void mediaDevices.getUserMedia({ video: true, audio: true });
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
