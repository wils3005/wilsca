import * as Zod from "zod";
import MessageType from "../enums/message-type";

const ClientMessage = Zod.object({
  dst: Zod.string(),
  payload: Zod.unknown(),
  src: Zod.string().optional(),
  type: Zod.nativeEnum(MessageType),
}).strict();

type ClientMessage = Zod.infer<typeof ClientMessage>;

export default ClientMessage;
