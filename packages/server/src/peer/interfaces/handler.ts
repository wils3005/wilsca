import Client from "../classes/client";
import Message from "../schemas/message";

interface Handler {
  (client: Client | undefined, message: Message): boolean;
}

export default Handler;
