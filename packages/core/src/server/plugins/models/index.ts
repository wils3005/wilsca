import { Plugin, Server } from "@hapi/hapi";
import User from "./User";

const models = { User };

const plugin: Plugin<unknown> = {
  name: "User",
  register,
};

export default plugin;

export function register(server: Server): void {
  server.expose("models", models);
}
