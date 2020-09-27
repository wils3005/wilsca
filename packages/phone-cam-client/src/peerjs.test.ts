import { addStreamToVideoElement, callPeers, onCall, onError } from './peerjs';
import { MediaConnection } from 'peerjs';
import { mock } from 'jest-mock-extended';

beforeAll(() => {
  Object.assign(document, {
    querySelector: jest.fn(() => mock<HTMLVideoElement>()),
  });

  Object.assign(navigator, {
    mediaDevices: {
      getUserMedia: jest.fn(async () => mock<Promise<MediaStream>>()),
    },
  });
});

describe('peerjs', () => {
  describe('addStreamToVideoElement', () => {
    it("doesn't throw", () => {
      expect(() => addStreamToVideoElement(mock<MediaStream>())).not.toThrow();
    });
  });

  describe('callPeers', () => {
    it("doesn't throw", () => {
      expect(() => callPeers([])).not.toThrow();
    });
  });

  describe('onCall', () => {
    it("doesn't throw", () => {
      expect(() => onCall(mock<MediaConnection>())).not.toThrow();
    });
  });

  describe('onError', () => {
    it("doesn't throw", () => {
      expect(() => onError(mock<Error>())).not.toThrow();
    });
  });
});
