import Client from "models/client";
import ClientMessage from "schemas/client-message";
import { Handler } from "interfaces";
import HandlersRegistry from "message-handler/handlers-registry";
import HeartbeatHandler from "message-handler/heartbeat-handler";
import MessageType from "schemas/message-type";
import Realm from "models/realm";
import TransmissionHandler from "message-handler/transmission-handler";

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
      MessageType.enum.HEARTBEAT,
      handleHeartbeat
    );
    this.handlersRegistry.registerHandler(
      MessageType.enum.OFFER,
      handleTransmission
    );
    this.handlersRegistry.registerHandler(
      MessageType.enum.ANSWER,
      handleTransmission
    );
    this.handlersRegistry.registerHandler(
      MessageType.enum.CANDIDATE,
      handleTransmission
    );
    this.handlersRegistry.registerHandler(
      MessageType.enum.LEAVE,
      handleTransmission
    );
    this.handlersRegistry.registerHandler(
      MessageType.enum.EXPIRE,
      handleTransmission
    );
  }

  public handle(client: Client | undefined, message: ClientMessage): boolean {
    return this.handlersRegistry.handle(client, message);
  }
}

export default MessageHandler;
