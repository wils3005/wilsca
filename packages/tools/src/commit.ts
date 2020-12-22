#!/usr/bin/env node

import { execSync } from "child_process";

const jiraIssue =
  (/(bugfix|feature)\/(?<jira_issue>\w+-\d+)/.exec(
    execSync("git rev-parse --abbrev-ref HEAD").toString().trim()
  ) || [])[2] || "";

/nothing to commit, working tree clean/.test(
  execSync("git status").toString()
) && process.exit(0);

execSync("git add --all");

execSync(
  `git commit --message "${jiraIssue ? `[${jiraIssue}] ` : ""}${
    process.argv[2] || new Date().toUTCString()
  }" --message "${execSync("git diff --staged --shortstat").toString()}"`
);

execSync("git push --force-with-lease");

export {};
