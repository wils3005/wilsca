import {
  Plugin,
  Request,
  ResponseObject,
  ResponseToolkit,
  Server,
  ServerRoute,
} from "@hapi/hapi";

const plugin: Plugin<unknown> = {
  name: "root",
  register,
};

const route: ServerRoute = {
  method: "GET",
  path: "/{param*}",
  handler: {
    directory: {
      path: ".",
      redirectToSlash: true,
    },
  },
};

function register(server: Server): void {
  server.route(route);
}

function handler(_request: Request, h: ResponseToolkit): ResponseObject {
  return h.response();
}

export default plugin;
export { register, handler };
