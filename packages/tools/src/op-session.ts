#!/usr/bin/env node

import { object, string } from "zod";
import { createWriteStream } from "fs";
import { join } from "path";
import { spawn } from "child_process";

const { HOME, OP_LOGIN_ADDRESS, OP_EMAIL_ADDRESS, OP_SECRET_KEY } = object({
  HOME: string(),
  OP_LOGIN_ADDRESS: string(),
  OP_EMAIL_ADDRESS: string(),
  OP_SECRET_KEY: string(),
}).parse(process.env);

spawn(
  "op",
  ["signin", OP_LOGIN_ADDRESS, OP_EMAIL_ADDRESS, OP_SECRET_KEY, "--raw"],
  { stdio: ["inherit", "pipe", "inherit"] }
).stdout.pipe(createWriteStream(join(HOME, ".op-session-token")));

export {};
