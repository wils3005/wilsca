#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
var jiraIssue = (/(bugfix|feature)\/(?<jira_issue>\w+-\d+)/.exec(child_process_1.execSync("git rev-parse --abbrev-ref HEAD").toString().trim()) || [])[2] || "";
/nothing to commit, working tree clean/.test(child_process_1.execSync("git status").toString()) && process.exit(0);
child_process_1.execSync("git add --all");
child_process_1.execSync("git commit --message \"" + (jiraIssue ? "[" + jiraIssue + "] " : "") + (process.argv[2] || new Date().toUTCString()) + "\" --message \"" + child_process_1.execSync("git diff --staged --shortstat").toString() + "\"");
child_process_1.execSync("git push --force-with-lease");
