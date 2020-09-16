import {
  Plugin,
  Request,
  ResponseObject,
  ResponseToolkit,
  RouteOptions,
  Server,
  ServerRoute,
} from "@hapi/hapi";

const options: RouteOptions = {
  auth: false,
};

const plugin: Plugin<unknown> = {
  name: "healthz",
  register,
};

const route: ServerRoute = {
  method: "get",
  path: "/healthz",
  handler,
  options,
};

export default plugin;

export function register(server: Server): void {
  server.route(route);
}

export function handler(_request: Request, h: ResponseToolkit): ResponseObject {
  return h.response();
}
