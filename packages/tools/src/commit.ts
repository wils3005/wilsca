#!/usr/bin/env node

import { execSync } from "child_process";

const jiraBranchRegExp = /(bugfix|feature)\/(?<jira_issue>\w+-\d+)/;
const { argv } = process;
const titleBody = argv[2] || new Date().toUTCString();

function gitAdd(): Buffer {
  const s = "git add --all";
  return execSync(s);
}

function gitBranch(): string {
  const s = "git rev-parse --abbrev-ref HEAD";
  return execSync(s).toString().trim();
}

function gitStatus(): string {
  const s = "git status";
  return execSync(s).toString();
}

function gitCommit(title: string, body: string): Buffer {
  const s = `git commit --message "${title}" --message "${body}"`;
  return execSync(s);
}

function gitDiff(): string {
  const s = "git diff --staged --shortstat";
  return execSync(s).toString();
}

function gitTitle(): string {
  return `${jiraTitle()}${titleBody}`;
}

function jiraIssue(): string {
  return (jiraBranchRegExp.exec(gitBranch()) || [])[2] || "";
}

function jiraTitle(): string {
  return jiraIssue() ? `[${jiraIssue()}] ` : "";
}

function main(): void {
  try {
    /nothing to commit, working tree clean/.test(gitStatus()) &&
      process.exit(0);

    gitAdd();
    gitCommit(gitTitle(), gitDiff());
    gitPush();
  } catch (e) {
    console.error(e);
  }
}

function gitPush(): Buffer {
  const s = "git push --force-with-lease";
  return execSync(s);
}

main();

export {
  gitAdd,
  gitBranch,
  gitCommit,
  gitDiff,
  gitPush,
  gitStatus,
  gitTitle,
  jiraIssue,
  jiraTitle,
  main,
};
