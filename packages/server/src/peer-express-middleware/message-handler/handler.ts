import Client from "../web-socket-wrapper";
import Message from "../message";

interface Handler {
  (client: Client | undefined, message: Message): boolean;
}

export default Handler;
