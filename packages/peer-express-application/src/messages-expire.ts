import MessageHandler from "message-handler";
import MessageType from "message-type";
import Realm from "realm";

export class MessagesExpire {
  private readonly realm: Realm;
  private readonly messageHandler: MessageHandler;
  private readonly cleanupOutMessages: number;
  private readonly expireTimeout: number;
  private timeoutId: NodeJS.Timeout | null = null;

  constructor(
    realm: Realm,
    cleanupOutMessages: number,
    expireTimeout: number,
    messageHandler: MessageHandler
  ) {
    this.realm = realm;
    this.cleanupOutMessages = cleanupOutMessages;
    this.expireTimeout = expireTimeout;
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
    }, this.cleanupOutMessages);
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
    const maxDiff = this.expireTimeout;

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
