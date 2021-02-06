// import "./emoji-match/index.js";
import MediaDevices from "./media-devices.js";
import Peer from "./peer.js";

MediaDevices();
const peer = Peer();
Object.assign(window, { peer });
export {};
