#!/usr/bin/env node

const childProcess = require('child_process');
const fs = require('fs');
const path = require('path');
const { HOME, OP_EMAIL_ADDRESS, OP_SECRET_KEY } = process.env;
const writeStream = fs.createWriteStream(path.join(HOME, '.op-session-token'));

function main() {
  try {
    childProcess
      .spawn(
        'op',
        [
          'signin',
          'https://swiftmedical.1password.com',
          OP_EMAIL_ADDRESS,
          OP_SECRET_KEY,
          '--raw',
        ],
        { stdio: ['inherit', 'pipe', 'inherit'] }
      )
      .stdout.pipe(writeStream);
  } catch (e) {
    console.error(e);
  }
}

main();
