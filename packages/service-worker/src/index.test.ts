import { mock } from "jest-mock-extended";

test("service-worker", () => {
  expect(async () => await import(".")).not.toThrow();
});

test("service-worker.addEventListeners", async () => {
  const { addEventListeners } = await import(".");
  expect(() => addEventListeners()).not.toThrow();
});

test("service-worker.onContainerMessage", async () => {
  const { onContainerMessage } = await import(".");
  const mockThis: ServiceWorkerContainer = mock<ServiceWorkerContainer>();
  expect(() => onContainerMessage.bind(mockThis)()).not.toThrow();
});

test("service-worker.onControllerChange", async () => {
  const { onControllerChange } = await import(".");
  const mockThis: ServiceWorkerContainer = mock<ServiceWorkerContainer>();
  expect(() => onControllerChange.bind(mockThis)()).not.toThrow();
});

test("service-worker.onEvent", async () => {
  const { onEvent } = await import(".");
  expect(() => onEvent()).not.toThrow();
});

test("service-worker.onRegistrationUpdateFound", async () => {
  const { onRegistrationUpdateFound } = await import(".");
  const mockThis: ServiceWorkerRegistration = mock<ServiceWorkerRegistration>();
  expect(() => onRegistrationUpdateFound.bind(mockThis)()).not.toThrow();
});

test("service-worker.register", async () => {
  const { register } = await import(".");
  expect(() => register()).not.toThrow();
});
