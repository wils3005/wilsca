#!/usr/bin/env node

import { createWriteStream } from "fs";
import { join } from "path";
import { spawn } from "child_process";
import { string } from "zod";

const { HOME, OP_LOGIN_ADDRESS, OP_EMAIL_ADDRESS, OP_SECRET_KEY } = process.env;
const home = string().parse(HOME);
const opLoginAddress = string().parse(OP_LOGIN_ADDRESS);
const opEmailAddress = string().parse(OP_EMAIL_ADDRESS);
const opSecretKey = string().parse(OP_SECRET_KEY);
const writeStream = createWriteStream(join(home, ".op-session-token"));

function main(): void {
  try {
    spawn(
      "op",
      ["signin", opLoginAddress, opEmailAddress, opSecretKey, "--raw"],
      { stdio: ["inherit", "pipe", "inherit"] }
    ).stdout.pipe(writeStream);
  } catch (e) {
    console.error(e);
  }
}

main();

export { main };
