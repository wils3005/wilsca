import {
  addEventListeners,
  onContainerMessage,
  onControllerChange,
  onEvent,
  onRegistrationUpdateFound,
  register,
} from './sw';
import { mock } from 'jest-mock-extended';

describe('sw', () => {
  describe('addEventListeners', () => {
    it("doesn't throw", () => {
      expect(() => {
        addEventListeners();
      }).not.toThrow();
    });
  });

  describe('onContainerMessage', () => {
    it("doesn't throw", () => {
      expect(() => {
        onContainerMessage.bind(mock<ServiceWorkerContainer>())();
      }).not.toThrow();
    });
  });

  describe('onControllerChange', () => {
    it("doesn't throw", () => {
      expect(() => {
        onControllerChange.bind(mock<ServiceWorkerContainer>())();
      }).not.toThrow();
    });
  });

  describe('onEvent', () => {
    it("doesn't throw", () => {
      expect(() => {
        onEvent();
      }).not.toThrow();
    });
  });

  describe('onRegistrationUpdateFound', () => {
    it("doesn't throw", () => {
      expect(() => {
        onRegistrationUpdateFound.bind(mock<ServiceWorkerRegistration>())();
      }).not.toThrow();
    });
  });

  describe('register', () => {
    it("doesn't throw", () => {
      return new Promise((done) => {
        expect(async () => {
          await register();
        }).not.toThrow();

        done();
      });
    });
  });
});
