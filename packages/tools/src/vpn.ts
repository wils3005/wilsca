#!/usr/bin/env node

import { execSync } from 'child_process';
import { string } from '@wilsjs/zod';

const { VPN_SERVICE_NAME, VPN_SHARED_SECRET } = process.env;
const vpnServiceName = string().parse(VPN_SERVICE_NAME);
const vpnSharedSecret = string().parse(VPN_SHARED_SECRET);

function isConnected(): boolean {
  const s = `scutil --nc status "${vpnServiceName}"`;
  return /^Connected/.test(execSync(s).toString());
}

function main(): void {
  try {
    if (isConnected()) return;

    const s = `scutil --nc start "${vpnServiceName}" --secret "${vpnSharedSecret}"`;
    execSync(s);
  } catch (e) {
    console.error(e);
  }
}

main();

export { isConnected, main };
