import { Config, IRealm } from "../../interfaces";
import MessageHandler from "../../message-handler";
import { MessageType } from "../../enums";

export class MessagesExpire {
  private readonly realm: IRealm;
  private readonly config: Config;
  private readonly messageHandler: MessageHandler;

  private timeoutId: NodeJS.Timeout | null = null;

  constructor({
    realm,
    config,
    messageHandler,
  }: {
    realm: IRealm;
    config: Config;
    messageHandler: MessageHandler;
  }) {
    this.realm = realm;
    this.config = config;
    this.messageHandler = messageHandler;
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
        const seenKey = `${message.src}_${message.dst}`;

        if (!seen[seenKey]) {
          this.messageHandler.handle(undefined, {
            type: MessageType.EXPIRE,
            src: message.dst,
            dst: message.src,
          });

          seen[seenKey] = true;
        }
      }

      this.realm.clearMessageQueue(destinationClientId);
    }
  }
}
