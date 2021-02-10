import Express from "express";
import Optional from "./optional";
import { Server } from "net";

declare function ExpressPeerServer(
  server: Server,
  options?: IConfig
): CustomExpress;
declare function PeerServer(
  options?: Optional<IConfig>,
  callback?: (server: Server) => void
): CustomExpress;

export { ExpressPeerServer, PeerServer };
