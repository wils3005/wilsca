import {
  getWebSocket,
  handleError,
  handleMessage,
  handleOpen,
  setWebSocket,
  timestamp,
} from "../src/MyWebSocket";

describe("MyWebSocket", () => {
  describe("getWebSocket", () => {
    it("doesn't throw", () => {
      expect.hasAssertions();
      expect(() => {
        getWebSocket.bind(new WebSocket("ws://example.com"))();
      }).not.toThrow();
    });
  });

  describe("handleError", () => {
    it("doesn't throw", () => {
      expect.hasAssertions();
      expect(() => {
        handleError.bind(new WebSocket("ws://example.com"))();
      }).not.toThrow();
    });
  });

  describe("handleMessage", () => {
    it("doesn't throw", () => {
      expect.hasAssertions();
      expect(() => {
        handleMessage.bind(new WebSocket("ws://example.com"))();
      }).not.toThrow();
    });
  });

  describe("handleOpen", () => {
    it("doesn't throw", () => {
      expect.hasAssertions();
      expect(() => {
        handleOpen.bind(new WebSocket("ws://example.com"))();
      }).not.toThrow();
    });
  });

  describe("setWebSocket", () => {
    it("doesn't throw", () => {
      expect.hasAssertions();
      expect(() => {
        setWebSocket.bind(new WebSocket("ws://example.com"))();
      }).not.toThrow();
    });
  });

  describe("timestamp", () => {
    it("doesn't throw", () => {
      expect.hasAssertions();
      expect(() => {
        timestamp.bind(new WebSocket("ws://example.com"))();
      }).not.toThrow();
    });
  });
});
