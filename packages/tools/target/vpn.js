#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
var zod_1 = require("zod");
var _a = zod_1.object({
    VPN_SERVICE_NAME: zod_1.string(),
    VPN_SHARED_SECRET: zod_1.string(),
}).parse(process.env), VPN_SERVICE_NAME = _a.VPN_SERVICE_NAME, VPN_SHARED_SECRET = _a.VPN_SHARED_SECRET;
if (/^Connected/.test(child_process_1.execSync("scutil --nc status \"" + VPN_SERVICE_NAME + "\"").toString())) {
    process.exit();
}
child_process_1.execSync("scutil --nc start \"" + VPN_SERVICE_NAME + "\" --secret \"" + VPN_SHARED_SECRET + "\"");
