#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ini_1 = require("ini");
var fs_1 = require("fs");
var child_process_1 = require("child_process");
var path_1 = require("path");
var zod_1 = require("zod");
var _a = zod_1.object({
    AWS_ARN_MFA: zod_1.string(),
    AWS_CLI_PROFILE: zod_1.string(),
    HOME: zod_1.string(),
    OP_AWS_TOKEN_CODE_ID: zod_1.string(),
}).parse(process.env), AWS_ARN_MFA = _a.AWS_ARN_MFA, AWS_CLI_PROFILE = _a.AWS_CLI_PROFILE, HOME = _a.HOME, OP_AWS_TOKEN_CODE_ID = _a.OP_AWS_TOKEN_CODE_ID;
var Credentials = JSON.parse(child_process_1.execSync("\n  aws sts get-session-token   --duration 129600   --profile " + AWS_CLI_PROFILE + "   --serial-number " + AWS_ARN_MFA + "   --token-code " + child_process_1.execSync("op get totp " + OP_AWS_TOKEN_CODE_ID + " --session " + fs_1.readFileSync(path_1.join(HOME, ".op-session-token"))
    .toString()
    .trim())
    .toString()
    .trim() + "\n")
    .toString()
    .trim()).Credentials;
var credentialsFile = path_1.join(HOME, ".aws", "credentials");
var iniCredentials = ini_1.parse(fs_1.readFileSync(credentialsFile).toString());
Object.assign(iniCredentials, {
    default: {
        aws_access_key_id: Credentials.AccessKeyId,
        aws_secret_access_key: Credentials.SecretAccessKey,
        aws_session_token: Credentials.SessionToken,
    },
});
fs_1.writeFileSync(credentialsFile, ini_1.stringify(iniCredentials));
