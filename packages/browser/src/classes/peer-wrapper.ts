import MediaConnectionWrapper from "./media-connection-wrapper";
import Peer from "peerjs";

class PeerWrapper {
  peer: Peer;

  constructor() {
    this.peer = new Peer({
      host: "localhost",
      key: "mykey",
      path: "/p",
      port: 8080,
    });

    this.peer.on("call", (...args) => this.onCall(...args));
    this.peer.on("close", (...args) => this.onClose(...args));
    this.peer.on("connection", (...args) => this.onConnection(...args));
    this.peer.on("open", (...args) => this.onOpen(...args));
    this.peer.on("disconnected", (...args) => this.onDisconnected(...args));
    this.peer.on("error", (...args) => this.onError(...args));
  }

  onCall(mediaConnection: Peer.MediaConnection): void {
    console.info("peer.onCall");
    const mediaConnectionWrapper = new MediaConnectionWrapper(mediaConnection);

    function onStream(mediaStream: MediaStream): void {
      console.info("peer.onCall.onStream");
      mediaConnectionWrapper.mediaConnection.answer(mediaStream);
    }

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then(onStream)
      .catch(console.error);
  }

  onConnection(dataConnection: Peer.DataConnection): void {
    console.info("peer.onConnection", { dataConnection });
  }

  onClose(): void {
    console.info("peer.onClose");
  }

  onOpen(id: string): void {
    console.info("peer.onOpen", { id });
  }

  onDisconnected(): void {
    console.info("peer.onDisconnected");
  }

  onError(error: unknown): void {
    console.error("peer.onError", { error });
  }
}

// function main(): Peer {
//   const peer = new Peer({
//     host: "localhost",
//     key: "mykey",
//     path: "/p",
//     port: 8080,
//   });

//   peer.on("call", onCall);
//   peer.on("close", onClose);
//   peer.on("connection", onConnection);
//   peer.on("open", onOpen);
//   peer.on("disconnected", onDisconnected);
//   peer.on("error", onError);
//   return peer;
// }

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

// function onCall(mediaConnection: Peer.MediaConnection): void {
//   console.info("peer.onCall");

//   function onStream(mediaStream: MediaStream): void {
//     console.info("peer.onCall.onStream");
//     mediaConnection.answer(mediaStream);
//     mediaConnection.on("stream", MediaConnection.onStream);
//     mediaConnection.on("close", MediaConnection.onClose);
//     mediaConnection.on("error", MediaConnection.onError);
//   }

//   navigator.mediaDevices
//     .getUserMedia({ video: true, audio: true })
//     .then(onStream)
//     .catch(console.error);
// }

// function onConnection(dataConnection: Peer.DataConnection): void {
//   console.info("peer.onConnection", { dataConnection });
// }

// function onClose(): void {
//   console.info("peer.onClose");
// }

// function onOpen(id: string): void {
//   console.info("peer.onOpen", { id });
// }

// function onDisconnected(): void {
//   console.info("peer.onDisconnected");
// }

// function onError(error: unknown): void {
//   console.error("peer.onError", { error });
// }

export default PeerWrapper;
