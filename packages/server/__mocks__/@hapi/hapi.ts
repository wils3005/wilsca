import { Server } from "@hapi/hapi";
import { mock } from "jest-mock-extended";

const hapi = {
  Server: mock<Server>(),
};

export default hapi;
