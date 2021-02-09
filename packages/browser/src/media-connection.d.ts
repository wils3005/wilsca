declare function onClose(): void;
declare function onError(error: unknown): void;
declare function onStream(mediaStream: MediaStream): void;
export { onClose, onError, onStream };
