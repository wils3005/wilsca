import Client from "./client";
import Config from "./schemas/config";
import Realm from "./realm";

const DEFAULT_CHECK_INTERVAL = 300;

type CustomConfig = Pick<Config, "alive_timeout">;

class CheckBrokenConnections {
  private readonly realm: Realm;
  private readonly config: CustomConfig;
  public readonly checkInterval: number;
  private readonly onClose?: (client: Client) => void;
  private timeoutId: NodeJS.Timeout | null = null;

  constructor(
    realm: Realm,
    config: CustomConfig,
    onClose: (client: Client) => void,
    checkInterval?: number
  ) {
    this.realm = realm;
    this.config = config;
    this.onClose = onClose;
    this.checkInterval = checkInterval ?? DEFAULT_CHECK_INTERVAL;
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
    const { alive_timeout: aliveTimeout } = this.config;

    for (const clientId of clientsIds) {
      const client = this.realm.getClientById(clientId);

      if (!client) continue;

      const timeSinceLastPing = now - client.getLastPing();

      if (timeSinceLastPing < aliveTimeout) continue;

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
