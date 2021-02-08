import Client from "client";
import ClientMessage from "client-message";
import { Handler } from "types";
import HandlersRegistry from "handlers-registry";
import HeartbeatHandler from "heartbeat-handler";
import MessageType from "message-type";
import Realm from "realm";
import TransmissionHandler from "transmission-handler";

class MessageHandler {
  constructor(
    realm: Realm,
    private readonly handlersRegistry = new HandlersRegistry()
  ) {
    const transmissionHandler: Handler = TransmissionHandler({ realm });
    const heartbeatHandler: Handler = HeartbeatHandler;

    const handleTransmission: Handler = (
      client: Client | undefined,
      { type, src, dst, payload }: ClientMessage
    ): boolean => {
      return transmissionHandler(client, {
        type,
        src,
        dst,
        payload,
      });
    };

    const handleHeartbeat = (
      client: Client | undefined,
      message: ClientMessage
    ): boolean => heartbeatHandler(client, message);

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

  public handle(client: Client | undefined, message: ClientMessage): boolean {
    return this.handlersRegistry.handle(client, message);
  }
}

export default MessageHandler;
