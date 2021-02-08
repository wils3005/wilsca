import * as Zod from "zod";
import MessageType from "schemas/message-type";

const ClientMessage = Zod.object({
  dst: Zod.string(),
  payload: Zod.unknown(),
  src: Zod.string().optional(),
  type: MessageType,
}).strict();

type ClientMessage = Zod.infer<typeof ClientMessage>;

export default ClientMessage;
