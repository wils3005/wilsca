import * as bcrypt from "bcrypt";
import * as z from "zod";
import { User, knex, logger } from ".";
import connectSessionKnex from "connect-session-knex";
import express from "express";
import expressSession from "express-session";
import helmet from "helmet";
import http from "http";
import passport from "passport";
import passportLocal from "passport-local";
import pinoHttp from "pino-http";

const { HOST, PORT, ROOT, SECRET } = process.env;
const host = z.string().parse(HOST);
const port = z.number().parse(Number(PORT));
const root = z.string().parse(ROOT);
const secret = z.string().parse(SECRET);

const app = express();

const StoreFactory = connectSessionKnex(expressSession);

const server: http.Server = app.listen(port, () => {
  logger.info(`Listening at http://${host}:${port}`);
});

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

export function handleLogout(
  req: express.Request,
  res: express.Response
): void {
  req.logout();
  res.redirect("/");
}

export function handleUserSerialization(
  user: User,
  done: (e: unknown, id?: unknown) => void
): void {
  done(null, user.id);
}

export function handleUserDeserialization(
  id: string,
  done: (e: unknown, user?: User) => void
): void {
  User.query()
    .findById(id)
    .then((user) => done(null, user))
    .catch((e) => {
      logger.error(e);
      done(e);
    });
}

export function logoutUser(req: express.Request, res: express.Response): void {
  req.logout();
  res.redirect("/");
}

export function respondInternalServerError(
  _e: Error,
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
    e: unknown,
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
    .catch((e: Error) => {
      logger.error(e);
      done(e);
    });
}

export default server;
