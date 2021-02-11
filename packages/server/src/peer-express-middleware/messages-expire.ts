import Config from "./schemas/config";
import MessageHandler from "./message-handler";
import MessageType from "./enums/message-type";
import Realm from "./realm";

type CustomConfig = Pick<Config, "cleanup_out_msgs" | "expire_timeout">;

class MessagesExpire {
  private readonly realm: Realm;
  private readonly messageHandler: MessageHandler;
  private readonly config: CustomConfig;
  private timeoutId: NodeJS.Timeout | null = null;

  constructor(
    realm: Realm,
    messageHandler: MessageHandler,
    config: CustomConfig
  ) {
    this.realm = realm;
    this.messageHandler = messageHandler;
    this.config = config;
  }

  public startMessagesExpiration(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    // Clean up outstanding messages
    this.timeoutId = setTimeout(() => {
      this.pruneOutstanding();

      this.timeoutId = null;

      this.startMessagesExpiration();
    }, this.config.cleanup_out_msgs);
  }

  public stopMessagesExpiration(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }

  private pruneOutstanding(): void {
    const destinationClientsIds = this.realm.getClientsIdsWithQueue();

    const now = new Date().getTime();
    const maxDiff = this.config.expire_timeout;

    const seen: Record<string, boolean> = {};

    for (const destinationClientId of destinationClientsIds) {
      const messageQueue = this.realm.getMessageQueueById(destinationClientId);

      if (!messageQueue) continue;

      const lastReadDiff = now - messageQueue.getLastReadAt();

      if (lastReadDiff < maxDiff) continue;

      const messages = messageQueue.getMessages();

      for (const message of messages) {
        const seenKey = `${String(message.src)}_${String(message.dst)}`;

        if (!seen[seenKey]) {
          this.messageHandler.handle(undefined, {
            type: MessageType.EXPIRE,
            src: message.dst,
            dst: String(message.src),
          });

          seen[seenKey] = true;
        }
      }

      this.realm.clearMessageQueue(destinationClientId);
    }
  }
}

export default MessagesExpire;
