#!/usr/bin/env node

import childProcess = require('child_process');
import fs = require('fs');
import path = require('path');

import * as z from 'zod';
import ini = require('ini');

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

const awsArnMfa = z.string().parse(AWS_ARN_MFA);
const awsCliProfile = z.string().parse(AWS_CLI_PROFILE);
const home = z.string().parse(HOME);
const opAwsTokenCodeId = z.string().parse(OP_AWS_TOKEN_CODE_ID);

function main(): void {
  try {
    const opSessionToken = fs
      .readFileSync(path.join(home, '.op-session-token'))
      .toString()
      .trim();

    const command1 = `
      op get totp ${opAwsTokenCodeId} \
      --session ${opSessionToken}
    `;

    const awsTokenCode = childProcess.execSync(command1).toString().trim();

    const command2 = `
      aws sts get-session-token \
      --duration 129600 \
      --profile ${awsCliProfile} \
      --serial-number ${awsArnMfa} \
      --token-code ${awsTokenCode}
    `;

    const { Credentials } = JSON.parse(
      childProcess.execSync(command2).toString().trim()
    ) as GetSessionToken;

    const credentialsFile = path.join(home, '.aws', 'credentials');
    const iniCredentials = ini.parse(
      fs.readFileSync(credentialsFile).toString()
    );

    Object.assign(iniCredentials, {
      default: {
        aws_access_key_id: Credentials.AccessKeyId,
        aws_secret_access_key: Credentials.SecretAccessKey,
        aws_session_token: Credentials.SessionToken,
      },
    });

    fs.writeFileSync(credentialsFile, ini.stringify(iniCredentials));
  } catch (e) {
    console.error(e);
  }
}

main();

export { main };
