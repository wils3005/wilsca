import * as z from "zod";
import { Server, ServerOptions } from "@hapi/hapi";
import fs from "fs";
import plugins from "./plugins";

const { HOST, PORT, PUBLIC_PATH, TLS_CERT, TLS_KEY } = process.env;
const host = z.string().parse(HOST);
const port = z.string().parse(PORT);
const relativeTo = z.string().parse(PUBLIC_PATH);
const cert = fs.readFileSync(z.string().parse(TLS_CERT));
const key = fs.readFileSync(z.string().parse(TLS_KEY));

const serverOptions: ServerOptions = {
  host,
  port,
  routes: {
    files: { relativeTo },
  },
  tls: { cert, key },
};

const server = new Server(serverOptions);

async function main(): Promise<void> {
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

process.on("unhandledRejection", (reason: unknown) => {
  console.error(reason);
  process.exit(1);
});

void main();

export default main;
