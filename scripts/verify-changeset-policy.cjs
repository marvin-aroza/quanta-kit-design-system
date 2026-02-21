#!/usr/bin/env node
/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const root = process.cwd();
const range = process.argv[2] || "origin/main...HEAD";
const eventPath = process.env.GITHUB_EVENT_PATH;

function run(command) {
  return execSync(command, { cwd: root, stdio: ["ignore", "pipe", "pipe"] })
    .toString()
    .trim();
}

function getChangedChangesets() {
  const output = run(`git diff --name-only ${range} -- .changeset/*.md`);
  return output
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function isEmptyChangeset(content) {
  const match = content.match(/^---\s*[\r\n]+([\s\S]*?)\r?\n---/);
  if (!match) {
    return false;
  }
  return match[1].trim().length === 0;
}

function getLabels() {
  if (!eventPath || !fs.existsSync(eventPath)) {
    return [];
  }
  const event = JSON.parse(fs.readFileSync(eventPath, "utf8"));
  const labels = event.pull_request?.labels || event.issue?.labels || [];
  return labels.map((label) => (typeof label === "string" ? label : label.name));
}

const changedChangesets = getChangedChangesets();
if (changedChangesets.length === 0) {
  console.log("No changed changeset files found in range:", range);
  process.exit(0);
}

const emptyChangesets = changedChangesets.filter((file) => {
  const abs = path.join(root, file);
  if (!fs.existsSync(abs)) {
    return false;
  }
  return isEmptyChangeset(fs.readFileSync(abs, "utf8"));
});

if (emptyChangesets.length === 0) {
  console.log("No empty changesets detected.");
  process.exit(0);
}

const labels = getLabels();
if (!labels.includes("no-release")) {
  console.error("Empty changeset(s) detected without required `no-release` label:");
  emptyChangesets.forEach((file) => console.error(`- ${file}`));
  process.exit(1);
}

console.log("Empty changeset policy passed (`no-release` label present).");
