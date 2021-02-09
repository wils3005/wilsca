// import "./emoji-match/index.js";
import MediaDevices from "./media-devices";
import Peer from "./peer";

MediaDevices();
const peer = Peer();
Object.assign(window, { peer });
export {};
