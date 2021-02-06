import { object, string } from "zod";
import { Server } from "net";
import app from "./app";

const { env } = process;
const { PORT } = object({ PORT: string() }).parse(env);
const server: Server = app.listen(PORT);

export default server;
