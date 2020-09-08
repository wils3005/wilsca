import * as z from "zod";
import { Server } from "@hapi/hapi";
import plugins from "./plugins";

const { HOST, PORT, PUBLIC_PATH } = process.env;
const host = z.string().parse(HOST);
const port = z.string().parse(PORT);
const relativeTo = z.string().parse(PUBLIC_PATH);

const server = new Server({
  host,
  port,
  routes: {
    files: { relativeTo },
  },
});

process.on("unhandledRejection", (reason: unknown) => {
  console.error(reason);
  process.exit(1);
});

void start();

export async function start(): Promise<void> {
  await server.register(plugins);

  server.route({
    method: "GET",
    path: "/{param*}",
    handler: {
      directory: {
        path: ".",
        redirectToSlash: true,
      },
    },
  });

  await server.start();
  server.logger.info(`Server running at: ${server.info.uri}`);
}
