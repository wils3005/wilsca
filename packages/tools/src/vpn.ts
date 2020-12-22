#!/usr/bin/env node

import { execSync } from "child_process";
import { object, string } from "zod";

const { VPN_SERVICE_NAME, VPN_SHARED_SECRET } = object({
  VPN_SERVICE_NAME: string(),
  VPN_SHARED_SECRET: string(),
}).parse(process.env);

if (
  /^Connected/.test(
    execSync(`scutil --nc status "${VPN_SERVICE_NAME}"`).toString()
  )
) {
  process.exit();
}

execSync(
  `scutil --nc start "${VPN_SERVICE_NAME}" --secret "${VPN_SHARED_SECRET}"`
);

export {};
