import { IClient } from "./client";
import IMessage from "./message";
import { IRealm } from "./realm";
import MessageType from "./message-type";

export const TransmissionHandler = ({
  realm,
}: {
  realm: IRealm;
}): ((client: IClient | undefined, message: IMessage) => boolean) => {
  const handle = (client: IClient | undefined, message: IMessage) => {
    const { type, src, dst } = IMessage.parse(message);

    const destinationClient = realm.getClientById(dst);

    // User is connected!
    if (destinationClient) {
      const socket = destinationClient.getSocket();
      try {
        if (socket) {
          const data = JSON.stringify(message);

          socket.send(data);
        } else {
          // Neither socket no res available. Peer dead?
          throw new Error("Peer dead");
        }
      } catch (e) {
        // This happens when a peer disconnects without closing connections and
        // the associated WebSocket has not closed.
        // Tell other side to stop trying.
        if (socket) {
          socket.close();
        } else {
          realm.removeClientById(destinationClient.getId());
        }

        handle(
          client,
          IMessage.parse({
            type: MessageType.LEAVE,
            src: dst,
            dst: src,
          })
        );
      }
    } else {
      // Wait for this client to connect/reconnect (XHR) for important
      // messages.
      const ignoredTypes = [MessageType.LEAVE, MessageType.EXPIRE];

      if (!ignoredTypes.includes(type) && dst) {
        realm.addMessageToQueue(dst, message);
      } else if (type === MessageType.LEAVE && !dst) {
        realm.removeClientById(String(src));
      } else {
        // Unavailable destination specified with message LEAVE or EXPIRE
        // Ignore
      }
    }

    return true;
  };

  return handle;
};
