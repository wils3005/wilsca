import * as Zod from "zod";
import MessageType from "./message-handler/message-type";

const Message = Zod.object({
  type: Zod.nativeEnum(MessageType),
  src: Zod.string().optional(),
  dst: Zod.string().optional(),
  payload: Zod.unknown().optional(),
});

type Message = Zod.infer<typeof Message>;

export default Message;
