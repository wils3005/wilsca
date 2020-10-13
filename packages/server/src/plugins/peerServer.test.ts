import { PeerClient, PeerMessage } from "./peerServer";
import { Server } from "@hapi/hapi";
import { mock } from "jest-mock-extended";

test("peerServer", () => {
  expect(async () => await import("./peerServer")).not.toThrow();
});

test("peerServer.onConnection", async () => {
  const { onConnection } = await import("./peerServer");
  const client = mock<PeerClient>();
  expect(() => onConnection(client)).not.toThrow();
});

test("peerServer.onDisconnect", async () => {
  const { onDisconnect } = await import("./peerServer");
  const client = mock<PeerClient>();
  expect(() => onDisconnect(client)).not.toThrow();
});

test("peerServer.onError", async () => {
  const { onError } = await import("./peerServer");
  const error = mock<Error>();
  expect(() => onError(error)).not.toThrow();
});

test("peerServer.onMessage", async () => {
  const { onMessage } = await import("./peerServer");
  const client = mock<PeerClient>();
  const message = mock<PeerMessage>();
  expect(() => onMessage(client, message)).not.toThrow();
});

test("peerServer.register", async () => {
  const { register } = await import("./peerServer");
  const server = mock<Server>();
  expect(() => register(server)).not.toThrow();
});
