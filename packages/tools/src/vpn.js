#!/usr/bin/env node

const util = require('util');
const childProcess = require('child_process');
const exec = util.promisify(childProcess.exec);
const { VPN_SERVICE_NAME, VPN_SHARED_SECRET } = process.env;

async function isConnected() {
  return /^Connected/.test(
    (await exec(`scutil --nc status "${VPN_SERVICE_NAME}"`)).stdout
  );
}

async function main() {
  try {
    if (await isConnected()) return;

    await exec(
      `scutil --nc start "${VPN_SERVICE_NAME}" --secret "${VPN_SHARED_SECRET}"`
    );
  } catch (e) {
    console.error(e);
  }
}

main();
