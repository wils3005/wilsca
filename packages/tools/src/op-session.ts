#!/usr/bin/env node

import childProcess = require('child_process');
import fs = require('fs');
import path = require('path');

import * as z from 'zod';

const { HOME, OP_LOGIN_ADDRESS, OP_EMAIL_ADDRESS, OP_SECRET_KEY } = process.env;
const home = z.string().parse(HOME);
const opLoginAddress = z.string().parse(OP_LOGIN_ADDRESS);
const opEmailAddress = z.string().parse(OP_EMAIL_ADDRESS);
const opSecretKey = z.string().parse(OP_SECRET_KEY);
const writeStream = fs.createWriteStream(path.join(home, '.op-session-token'));

function main(): void {
  try {
    childProcess
      .spawn(
        'op',
        ['signin', opLoginAddress, opEmailAddress, opSecretKey, '--raw'],
        { stdio: ['inherit', 'pipe', 'inherit'] }
      )
      .stdout.pipe(writeStream);
  } catch (e) {
    console.error(e);
  }
}

main();

export { main };
