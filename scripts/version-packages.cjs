#!/usr/bin/env node
/* eslint-disable no-console */
const { spawnSync } = require("child_process");

const MAX_ATTEMPTS = 3;
const RETRY_DELAY_MS = 5000;

function sleep(ms) {
  const sab = new SharedArrayBuffer(4);
  const view = new Int32Array(sab);
  Atomics.wait(view, 0, 0, ms);
}

function run(command) {
  const result = spawnSync(command, {
    shell: true,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });

  if (result.stdout) process.stdout.write(result.stdout);
  if (result.stderr) process.stderr.write(result.stderr);
  return result;
}

function isTransientGithubChangelogError(output) {
  return (
    output.includes("An error occurred when fetching data from GitHub") ||
    output.includes("Something went wrong while executing your query")
  );
}

let versionSucceeded = false;

for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
  console.log(
    `Running changeset version (attempt ${attempt}/${MAX_ATTEMPTS})...`,
  );
  const result = run("changeset version");

  if (result.status === 0) {
    versionSucceeded = true;
    break;
  }

  const combinedOutput = `${result.stdout || ""}\n${result.stderr || ""}`;
  const shouldRetry =
    attempt < MAX_ATTEMPTS && isTransientGithubChangelogError(combinedOutput);

  if (!shouldRetry) {
    process.exit(result.status || 1);
  }

  console.warn(
    `Transient GitHub changelog error detected. Retrying in ${
      RETRY_DELAY_MS / 1000
    }s...`,
  );
  sleep(RETRY_DELAY_MS);
}

if (!versionSucceeded) {
  process.exit(1);
}

console.log("Updating lockfile...");
const lockfileResult = run("npm run update-lockfile");
if (lockfileResult.status !== 0) {
  process.exit(lockfileResult.status || 1);
}
