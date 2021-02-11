import Client from "./web-socket-wrapper";
import Realm from "./realm";

const DEFAULT_CHECK_INTERVAL = 300;

class CheckBrokenConnections {
  realm: Realm;
  aliveTimeout: number;
  checkInterval: number;
  onClose?: (client: Client) => void;
  timeoutId: NodeJS.Timeout | null = null;

  constructor(
    realm: Realm,
    aliveTimeout: number,
    onClose: (client: Client) => void,
    checkInterval?: number
  ) {
    this.realm = realm;
    this.aliveTimeout = aliveTimeout;
    this.onClose = onClose;
    this.checkInterval = checkInterval ?? DEFAULT_CHECK_INTERVAL;
  }

  start(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    this.timeoutId = setTimeout(() => this.onTimeout(), this.checkInterval);
  }

  onTimeout(): void {
    this.checkConnections();
    this.timeoutId = null;
    this.start();
  }

  stop(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }

  checkConnections(): void {
    const clientsIds = this.realm.getClientsIds();
    const now = new Date().getTime();

    for (const clientId of clientsIds) {
      const client = this.realm.getClientById(clientId);
      if (!client) continue;

      const timeSinceLastPing = now - client.getLastPing();
      if (timeSinceLastPing < this.aliveTimeout) continue;

      try {
        client.getSocket()?.close();
      } finally {
        this.realm.clearMessageQueue(clientId);
        this.realm.removeClientById(clientId);
        client.setSocket(null);
        this.onClose?.(client);
      }
    }
  }
}

export default CheckBrokenConnections;
