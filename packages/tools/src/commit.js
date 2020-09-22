#!/usr/bin/env node

const exec = require('util').promisify(require('child_process').exec);
const gitBranchRegExp = /\* (bugfix|feature)\/(?<jira_issue>\w+-\d+)/;
const { argv } = process;
const titleBody = argv[2] || new Date().toUTCString();

async function main() {
  try {
    const gitStatus = await exec('git status').stdout;

    if (/nothing to commit, working tree clean/.exec(gitStatus)) {
      throw new Error('nothing to commit, working tree clean');
    }

    const gitBranch = await exec('git branch');
    const jiraIssue = (gitBranchRegExp.exec(gitBranch.stdout) || [])[2];
    const jiraTitle = jiraIssue ? `[${jiraIssue}] ` : '';
    await exec('git add --all');
    const body = (await exec('git diff --staged --shortstat')).stdout;
    const title = `${jiraTitle}${titleBody}`;
    await exec(`git commit --message "${title}" --message "${body}"`);
    await exec('git push --force-with-lease');
  } catch (e) {
    console.error(e);
  }
}

main();
