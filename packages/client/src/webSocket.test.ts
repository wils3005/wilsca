import {
  getWebSocket,
  onError,
  onMessage,
  onOpen,
  setWebSocket,
} from '../src/webSocket';

describe('webSocket', () => {
  describe('getWebSocket', () => {
    it("doesn't throw", () => {
      expect.hasAssertions();
      expect(() => {
        getWebSocket.bind(new WebSocket('ws://example.com'))();
      }).not.toThrow();
    });
  });

  describe('onError', () => {
    it("doesn't throw", () => {
      expect.hasAssertions();
      expect(() => {
        onError.bind(new WebSocket('ws://example.com'))();
      }).not.toThrow();
    });
  });

  describe('onMessage', () => {
    it("doesn't throw", () => {
      expect.hasAssertions();
      expect(() => {
        onMessage.bind(new WebSocket('ws://example.com'))();
      }).not.toThrow();
    });
  });

  describe('onOpen', () => {
    it("doesn't throw", () => {
      expect.hasAssertions();
      expect(() => {
        onOpen.bind(new WebSocket('ws://example.com'))();
      }).not.toThrow();
    });
  });

  describe('setWebSocket', () => {
    it("doesn't throw", () => {
      expect.hasAssertions();
      expect(() => {
        setWebSocket.bind(new WebSocket('ws://example.com'))();
      }).not.toThrow();
    });
  });
});
