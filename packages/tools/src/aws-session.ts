#!/usr/bin/env node

import { object, string } from "zod";
import { parse, stringify } from "ini";
import { readFileSync, writeFileSync } from "fs";
import { execSync } from "child_process";
import { join } from "path";

interface GetSessionToken {
  Credentials: {
    AccessKeyId: string;
    SecretAccessKey: string;
    SessionToken: string;
  };
}

const { AWS_ARN_MFA, AWS_CLI_PROFILE, HOME, OP_AWS_TOKEN_CODE_ID } = object({
  AWS_ARN_MFA: string(),
  AWS_CLI_PROFILE: string(),
  HOME: string(),
  OP_AWS_TOKEN_CODE_ID: string(),
}).parse(process.env);

const { Credentials } = (JSON.parse(
  execSync(`
  aws sts get-session-token \
  --duration 129600 \
  --profile ${AWS_CLI_PROFILE} \
  --serial-number ${AWS_ARN_MFA} \
  --token-code ${execSync(
    `op get totp ${OP_AWS_TOKEN_CODE_ID} --session ${readFileSync(
      join(HOME, ".op-session-token")
    )
      .toString()
      .trim()}`
  )
    .toString()
    .trim()}
`)
    .toString()
    .trim()
) as unknown) as GetSessionToken;

const credentialsFile = join(HOME, ".aws", "credentials");
const iniCredentials = parse(readFileSync(credentialsFile).toString());

Object.assign(iniCredentials, {
  default: {
    aws_access_key_id: Credentials.AccessKeyId,
    aws_secret_access_key: Credentials.SecretAccessKey,
    aws_session_token: Credentials.SessionToken,
  },
});

writeFileSync(credentialsFile, stringify(iniCredentials));

export {};
