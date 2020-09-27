import {
  addStreamToVideoElement,
  callPeers,
  onCall,
  onError,
  peer,
  streamConstraints,
} from './peerjs';

const { CLIENTS_URL } = process.env;
const clientsURL = String(CLIENTS_URL);

navigator.mediaDevices
  .getUserMedia(streamConstraints)
  .then(addStreamToVideoElement)
  .catch(onError);

fetch(clientsURL)
  .then(async (response: Response) => response.json())
  .then(callPeers)
  .catch(onError);

peer.on('call', onCall);
peer.on('error', onError);

export {};
