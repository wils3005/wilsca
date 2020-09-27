import Peer, { MediaConnection } from 'peerjs';

const { HOST, PORT } = process.env;

const streamConstraints: MediaStreamConstraints = {
  video: {
    width: { min: 160, max: 640 },
    height: { min: 120, max: 480 },
    frameRate: { min: 15, max: 30 },
  },
  audio: true,
};

const peer = new Peer({
  host: HOST,
  port: Number(PORT),
  path: '/',
});

const myConnections: Set<MediaConnection> = new Set();

function addStreamToVideoElement(ms: MediaStream): void {
  const e = document.querySelector<HTMLVideoElement>('video');
  Object.assign(e, { srcObject: ms });
}

// outgoing calls
function callPeers(a: string[]): void {
  for (const s of a) {
    const callPeer = (ms: MediaStream): void => {
      const mc = peer.call(s, ms);
      myConnections.add(mc);
    };

    navigator.mediaDevices
      .getUserMedia(streamConstraints)
      .then(callPeer)
      .catch(onError);
  }
}

// incoming calls
function onCall(mc: MediaConnection): void {
  const answerPeer = (ms: MediaStream): void => {
    myConnections.add(mc);
    mc.answer(ms);
  };

  navigator.mediaDevices
    .getUserMedia(streamConstraints)
    .then(answerPeer)
    .catch(onError);
}

function onError(e: Error): void {
  console.error(e);
}

export {
  addStreamToVideoElement,
  callPeers,
  onCall,
  onError,
  peer,
  streamConstraints,
};
