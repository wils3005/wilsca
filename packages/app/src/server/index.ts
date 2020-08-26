import * as bcrypt from "bcrypt";
import * as z from "zod";
import User from "./user";
import WebSocket from "ws";
import connectSessionKnex from "connect-session-knex";
import express from "express";
import expressSession from "express-session";
import helmet from "helmet";
import http from "http";
import knex from "./knex";
import logger from "./logger";
import net from "net";
import passport from "passport";
import passportLocal from "passport-local";
import pinoHttp from "pino-http";

const { HOST, PORT, ROOT, SECRET } = process.env;
const host = z.string().parse(HOST);
const port = z.number().parse(Number(PORT));
const root = z.string().parse(ROOT);
const secret = z.string().parse(SECRET);

const app = express();

const server = app.listen(port, () => {
  logger.info(`Listening at http://${host}:${port}`);
});

const webSocketServer = new WebSocket.Server({ server });
const StoreFactory = connectSessionKnex(expressSession);

app.use(
  express.json(),
  express.static(root),
  helmet(),
  pinoHttp(logger),
  expressSession({
    secret,
    resave: false,
    saveUninitialized: false,
    store: new StoreFactory({
      clearInterval: 60000,
      knex,
    }),
  }),
  passport.initialize(),
  passport.session()
);

app.get("/healthz", respondNoContent);

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/success",
    failWithError: true,
    failureRedirect: "/failure",
  }),
  respondRedirectUsers
);

app.get("/logout", logoutUser);
app.get("/users", respondUsers);
app.use(respondNotFound, respondInternalServerError);
passport.use(new passportLocal.Strategy(verifyCredentials));
passport.serializeUser(handleUserSerialization);
passport.deserializeUser(handleUserDeserialization);
server.on("upgrade", handleServerUpgrade);
webSocketServer.on("connection", handleConnection);
webSocketServer.on("error", handleError);

////////////////////////////////////////////////////////////////////////////////
export function handleConnection(socket: WebSocket): void {
  logger.info("handleConnection");
  socket.on("message", handleMessage);
  socket.on("error", handleError);
}

export function handleError(this: unknown, error: Error): void {
  logger.error({ this: this, error });
}

export function handleLogout(
  req: express.Request,
  res: express.Response
): void {
  req.logout();
  res.redirect("/");
}

export function handleMessage(this: WebSocket, data: WebSocket.Data): void {
  logger.info({ this: this, data });

  for (const client of webSocketServer.clients) {
    if (client == this) continue;

    client.send(`Message broadcast: ${String(data)}`);
  }
}

export function handleServerUpgrade(
  request: http.IncomingMessage,
  socket: net.Socket,
  head: Buffer
): void {
  webSocketServer.handleUpgrade(request, socket, head, (webSocket) => {
    webSocketServer.emit("connection", webSocket, request);
  });
}

export function handleUserSerialization(
  user: User,
  done: (err: unknown, id?: unknown) => void
): void {
  done(null, user.id);
}

export function handleUserDeserialization(
  id: string,
  done: (err: unknown, user?: User) => void
): void {
  User.query()
    .findById(id)
    .then((user) => done(null, user))
    .catch((err) => done(err));
}

export function logoutUser(req: express.Request, res: express.Response): void {
  req.logout();
  res.redirect("/");
}

export function respondInternalServerError(
  _error: Error,
  _req: express.Request,
  res: express.Response
): void {
  res.status(500).json();
}

export function respondNotFound(
  _req: express.Request,
  res: express.Response
): void {
  res.status(404).json();
}

export function respondNoContent(
  _req: express.Request,
  res: express.Response
): void {
  res.sendStatus(204);
}

export function respondRedirectUsers(
  _req: express.Request,
  res: express.Response
): void {
  res.redirect("/users");
}

export async function respondUsers(
  _req: express.Request,
  res: express.Response
): Promise<void> {
  res.json(await User.query());
}

export function verifyCredentials(
  username: string,
  password: string,
  done: (
    error: unknown,
    user?: unknown,
    options?: passportLocal.IVerifyOptions
  ) => void
): void {
  User.query()
    .findOne({ username })
    .then(async (user) => {
      logger.info({ user });
      (await bcrypt.compare(password, z.string().parse(user.password)))
        ? done(null, user)
        : done(null, false);
    })
    .catch((err: Error) => {
      logger.error({ err });
      done(err);
    });
}
