#!/usr/bin/env node

import childProcess = require('child_process');

const gitBranchRegExp = /\* (bugfix|feature)\/(?<jira_issue>\w+-\d+)/;
const { argv } = process;
const titleBody = argv[2] || new Date().toUTCString();

function main(): void {
  try {
    const gitStatus = childProcess.execSync('git status').toString();
    if (/nothing to commit, working tree clean/.exec(gitStatus)) {
      throw new Error('nothing to commit, working tree clean');
    }

    const gitBranch = childProcess.execSync('git branch').toString();
    const jiraIssue = (gitBranchRegExp.exec(gitBranch) || [])[2];
    const jiraTitle = jiraIssue ? `[${jiraIssue}] ` : '';
    childProcess.execSync('git add --all');
    const body = childProcess
      .execSync('git diff --staged --shortstat')
      .toString();

    const title = `${jiraTitle}${titleBody}`;
    childProcess.execSync(
      `git commit --message "${title}" --message "${body}"`
    );

    childProcess.execSync('git push --force-with-lease');
  } catch (e) {
    console.error(e);
  }
}

main();

export { main };
