declare function main(): Peer;
declare function onCall(mediaConnection: Peer.MediaConnection): void;
declare function onConnection(dataConnection: Peer.DataConnection): void;
declare function onClose(): void;
declare function onOpen(id: string): void;
declare function onDisconnected(): void;
declare function onError(error: unknown): void;
export default main;
export { onCall, onClose, onConnection, onDisconnected, onError, onOpen };
