#!/usr/bin/env node

import childProcess = require('child_process');

import * as z from 'zod';

const { VPN_SERVICE_NAME, VPN_SHARED_SECRET } = process.env;
const vpnServiceName = z.string().parse(VPN_SERVICE_NAME);
const vpnSharedSecret = z.string().parse(VPN_SHARED_SECRET);

function isConnected(): boolean {
  return /^Connected/.test(
    String(childProcess.execSync(`scutil --nc status "${vpnServiceName}"`))
  );
}

function main(): void {
  try {
    if (isConnected()) return;

    childProcess.execSync(
      `scutil --nc start "${vpnServiceName}" --secret "${vpnSharedSecret}"`
    );
  } catch (e) {
    console.error(e);
  }
}

main();

export { isConnected, main };
