import { mock } from "jest-mock-extended";

test("web-socket", () => {
  expect(async () => await import(".")).not.toThrow();
});

test("web-socket.getWebSocket", async () => {
  const { getWebSocket } = await import(".");
  expect(() => getWebSocket()).not.toThrow();
});

test("web-socket.onError", async () => {
  const { onError } = await import(".");
  const mockThis = mock<WebSocket>();
  expect(() => onError.bind(mockThis)()).not.toThrow();
});

test("web-socket.onMessage", async () => {
  const { onMessage } = await import(".");
  const mockThis = mock<WebSocket>();
  expect(() => onMessage.bind(mockThis)()).not.toThrow();
});

test("web-socket.onOpen", async () => {
  const { onOpen } = await import(".");
  const mockThis = mock<WebSocket>();
  expect(() => onOpen.bind(mockThis)()).not.toThrow();
});

test("web-socket.setWebSocket", async () => {
  const { setWebSocket } = await import(".");
  expect(() => setWebSocket()).not.toThrow();
});
