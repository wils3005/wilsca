import * as Zod from "zod";
import Express from "express";
import Net from "net";

function main(app: Express.Express): Net.Server {
  const { PORT } = Zod.object({ PORT: Zod.string() }).parse(process.env);
  const server = app.listen(PORT);
  return server;
}

export default main;
