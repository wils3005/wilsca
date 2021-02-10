import Client from "./client";
import Handler from "../interfaces/handler";
import HandlersRegistry from "./handlersRegistry";
import HeartbeatHandler from "../functions/heartbeat-handler";
import Message from "../schemas/message";
import MessageType from "../enums/message-type";
import Realm from "./realm";
import TransmissionHandler from "../transmission-handler";

class MessageHandler {
  constructor(
    realm: Realm,
    private readonly handlersRegistry = new HandlersRegistry()
  ) {
    const transmissionHandler: Handler = TransmissionHandler({ realm });
    const heartbeatHandler: Handler = HeartbeatHandler;

    const handleTransmission: Handler = (
      client: Client | undefined,
      { type, src, dst, payload }: Message
    ): boolean => {
      return transmissionHandler(client, {
        type,
        src,
        dst,
        payload,
      });
    };

    const handleHeartbeat = (client: Client | undefined, message: Message) =>
      heartbeatHandler(client, message);

    this.handlersRegistry.registerHandler(
      MessageType.HEARTBEAT,
      handleHeartbeat
    );
    this.handlersRegistry.registerHandler(
      MessageType.OFFER,
      handleTransmission
    );
    this.handlersRegistry.registerHandler(
      MessageType.ANSWER,
      handleTransmission
    );
    this.handlersRegistry.registerHandler(
      MessageType.CANDIDATE,
      handleTransmission
    );
    this.handlersRegistry.registerHandler(
      MessageType.LEAVE,
      handleTransmission
    );
    this.handlersRegistry.registerHandler(
      MessageType.EXPIRE,
      handleTransmission
    );
  }

  public handle(client: Client | undefined, message: Message): boolean {
    return this.handlersRegistry.handle(client, message);
  }
}

export default MessageHandler;
