#!/usr/bin/env node

import { parse, stringify } from "ini";
import { readFileSync, writeFileSync } from "fs";
import { execSync } from "child_process";
import { join } from "path";
import { string } from "zod";

interface GetSessionToken {
  Credentials: {
    AccessKeyId: string;
    SecretAccessKey: string;
    SessionToken: string;
  };
}

const {
  AWS_ARN_MFA,
  AWS_CLI_PROFILE,
  HOME,
  OP_AWS_TOKEN_CODE_ID,
} = process.env;

const awsArnMfa = string().parse(AWS_ARN_MFA);
const awsCliProfile = string().parse(AWS_CLI_PROFILE);
const home = string().parse(HOME);
const opAwsTokenCodeId = string().parse(OP_AWS_TOKEN_CODE_ID);

function main(): void {
  try {
    const opSessionToken = readFileSync(join(home, ".op-session-token"))
      .toString()
      .trim();

    const command1 = `
      op get totp ${opAwsTokenCodeId} \
      --session ${opSessionToken}
    `;

    const awsTokenCode = execSync(command1).toString().trim();

    const command2 = `
      aws sts get-session-token \
      --duration 129600 \
      --profile ${awsCliProfile} \
      --serial-number ${awsArnMfa} \
      --token-code ${awsTokenCode}
    `;

    const { Credentials } = (JSON.parse(
      execSync(command2).toString().trim()
    ) as unknown) as GetSessionToken;

    const credentialsFile = join(home, ".aws", "credentials");
    const iniCredentials = parse(readFileSync(credentialsFile).toString());

    Object.assign(iniCredentials, {
      default: {
        aws_access_key_id: Credentials.AccessKeyId,
        aws_secret_access_key: Credentials.SecretAccessKey,
        aws_session_token: Credentials.SessionToken,
      },
    });

    writeFileSync(credentialsFile, stringify(iniCredentials));
  } catch (e) {
    console.error(e);
  }
}

main();

export { main };
