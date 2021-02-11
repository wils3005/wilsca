import Client from "./client";
import Message from "./schemas/message";
import MessageType from "./enums/message-type";
import Realm from "./realm";

class TransmissionHandler {
  realm: Realm;

  constructor(realm: Realm) {
    this.realm = realm;
  }

  handle(client: Client | undefined, message: Message): boolean {
    const { type, src, dst } = Message.parse(message);

    const destinationClient = this.realm.getClientById(String(dst));

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
          this.realm.removeClientById(destinationClient.getId());
        }

        this.handle(
          client,
          Message.parse({
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
        this.realm.addMessageToQueue(dst, message);
      } else if (type === MessageType.LEAVE && !dst) {
        this.realm.removeClientById(String(src));
      } else {
        // Unavailable destination specified with message LEAVE or EXPIRE
        // Ignore
      }
    }

    return true;
  }

  handler() {
    return (client: Client | undefined, message: Message): boolean => {
      return this.handle(client, message);
    };
  }
}

export default TransmissionHandler;

// function main({
//   realm,
// }: {
//   realm: Realm;
// }): (client: Client | undefined, message: Message) => boolean {
//   const handle = (client: Client | undefined, message: Message) => {
//     const { type, src, dst } = Message.parse(message);

//     const destinationClient = realm.getClientById(String(dst));

//     // User is connected!
//     if (destinationClient) {
//       const socket = destinationClient.getSocket();
//       try {
//         if (socket) {
//           const data = JSON.stringify(message);

//           socket.send(data);
//         } else {
//           // Neither socket no res available. Peer dead?
//           throw new Error("Peer dead");
//         }
//       } catch (e) {
//         // This happens when a peer disconnects without closing connections and
//         // the associated WebSocket has not closed.
//         // Tell other side to stop trying.
//         if (socket) {
//           socket.close();
//         } else {
//           realm.removeClientById(destinationClient.getId());
//         }

//         handle(
//           client,
//           Message.parse({
//             type: MessageType.LEAVE,
//             src: dst,
//             dst: src,
//           })
//         );
//       }
//     } else {
//       // Wait for this client to connect/reconnect (XHR) for important
//       // messages.
//       const ignoredTypes = [MessageType.LEAVE, MessageType.EXPIRE];

//       if (!ignoredTypes.includes(type) && dst) {
//         realm.addMessageToQueue(dst, message);
//       } else if (type === MessageType.LEAVE && !dst) {
//         realm.removeClientById(String(src));
//       } else {
//         // Unavailable destination specified with message LEAVE or EXPIRE
//         // Ignore
//       }
//     }

//     return true;
//   };

//   return handle;
// }

// export default main;
