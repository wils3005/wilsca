import {
  getWebSocket,
  onError,
  onMessage,
  onOpen,
  setWebSocket,
} from '../src/webSocket';
import { mock } from 'jest-mock-extended';

describe('webSocket', () => {
  describe('getWebSocket', () => {
    it("doesn't throw", () => {
      expect(() => {
        getWebSocket.bind(mock<WebSocket>())();
      }).not.toThrow();
    });
  });

  describe('onError', () => {
    it("doesn't throw", () => {
      expect(() => {
        onError.bind(mock<WebSocket>())();
      }).not.toThrow();
    });
  });

  describe('onMessage', () => {
    it("doesn't throw", () => {
      expect(() => {
        onMessage.bind(mock<WebSocket>())();
      }).not.toThrow();
    });
  });

  describe('onOpen', () => {
    it("doesn't throw", () => {
      expect(() => {
        onOpen.bind(mock<WebSocket>())();
      }).not.toThrow();
    });
  });

  describe('setWebSocket', () => {
    it("doesn't throw", () => {
      expect(() => {
        setWebSocket.bind(mock<WebSocket>())();
      }).not.toThrow();
    });
  });
});
