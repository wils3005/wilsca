import Client from "client";
import Realm from "realm";

const DEFAULT_CHECK_INTERVAL = 300;

export class CheckBrokenConnections {
  public readonly checkInterval: number;
  private timeoutId: NodeJS.Timeout | null = null;
  private readonly realm: Realm;
  private readonly aliveTimeout: number;
  private readonly onClose?: (client: Client) => void;

  constructor(realm: Realm, onClose: (client: Client) => void) {
    this.realm = realm;
    this.aliveTimeout = 60000;
    this.onClose = onClose;
    this.checkInterval = DEFAULT_CHECK_INTERVAL;
  }

  public start(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    this.timeoutId = setTimeout(() => {
      this.checkConnections();

      this.timeoutId = null;

      this.start();
    }, this.checkInterval);
  }

  public stop(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }

  private checkConnections(): void {
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
