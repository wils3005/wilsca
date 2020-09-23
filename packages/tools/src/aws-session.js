#!/usr/bin/env node

const childProcess = require('child_process');
const fs = require('fs');
const path = require('path');
const ini = require('ini');

const {
  AWS_ARN_MFA,
  AWS_CLI_PROFILE,
  HOME,
  OP_AWS_TOKEN_CODE_ID,
} = process.env;

function main() {
  try {
    const opSessionToken = fs
      .readFileSync(path.join(HOME, '.op-session-token'))
      .toString()
      .trim();

    const awsTokenCode = childProcess
      .execSync(
        `
  op get totp ${OP_AWS_TOKEN_CODE_ID} \
  --session ${opSessionToken}
`
      )
      .toString()
      .trim();

    const { Credentials } = JSON.parse(
      childProcess
        .execSync(
          `
    aws sts get-session-token \
    --duration 129600 \
    --profile ${AWS_CLI_PROFILE} \
    --serial-number ${AWS_ARN_MFA} \
    --token-code ${awsTokenCode}
  `
        )
        .toString()
        .trim()
    );

    const credentialsFile = path.join(HOME, '.aws', 'credentials');
    const iniCredentials = ini.parse(
      fs.readFileSync(credentialsFile).toString()
    );
    iniCredentials.default.aws_access_key_id = Credentials.AccessKeyId;
    iniCredentials.default.aws_secret_access_key = Credentials.SecretAccessKey;
    iniCredentials.default.aws_session_token = Credentials.SessionToken;
    fs.writeFileSync(credentialsFile, ini.stringify(iniCredentials));
  } catch (e) {
    console.error(e);
  }
}

main();
