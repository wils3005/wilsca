import { ClientMessage, Handler, IRealm } from "interfaces";

import {
  HeartbeatHandler,
  TransmissionHandler,
} from "message-handler/handlers";

import Client from "models/client";
import HandlersRegistry from "message-handler/handlers-registry";
import { MessageType } from "enums";

class MessageHandler {
  constructor(
    realm: IRealm,
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
