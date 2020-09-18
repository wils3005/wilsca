import { Server, ServerOptions } from "@hapi/hapi";
import { cert, host, key, port, relativeTo } from "./env";
import plugins from "./plugins";

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
