#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path_1 = require("path");
var child_process_1 = require("child_process");
var zod_1 = require("zod");
var _a = zod_1.object({
    HOME: zod_1.string(),
    OP_LOGIN_ADDRESS: zod_1.string(),
    OP_EMAIL_ADDRESS: zod_1.string(),
    OP_SECRET_KEY: zod_1.string(),
}).parse(process.env), HOME = _a.HOME, OP_LOGIN_ADDRESS = _a.OP_LOGIN_ADDRESS, OP_EMAIL_ADDRESS = _a.OP_EMAIL_ADDRESS, OP_SECRET_KEY = _a.OP_SECRET_KEY;
child_process_1.spawn("op", ["signin", OP_LOGIN_ADDRESS, OP_EMAIL_ADDRESS, OP_SECRET_KEY, "--raw"], { stdio: ["inherit", "pipe", "inherit"] }).stdout.pipe(fs_1.createWriteStream(path_1.join(HOME, ".op-session-token")));
