#!/usr/bin/env node
/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const root = process.cwd();
const packageMap = {
  react: "packages/quanta-kit-react/package.json",
  vue: "packages/quanta-kit-vue/package.json",
  angular: "packages/quanta-kit-angular/package.json",
};
let packages = Object.values(packageMap);

const args = new Set(process.argv.slice(2));
const dryRun = !args.has("--push");
const remoteArg = process.argv.find((arg) => arg.startsWith("--remote="));
const remote = remoteArg ? remoteArg.split("=")[1] : "origin";
const packagesArg = process.argv.find((arg) => arg.startsWith("--packages="));
if (!/^[A-Za-z0-9._/-]+$/.test(remote) || remote.startsWith("-")) {
  console.error(
    `Invalid --remote value: "${remote}". Allowed characters: letters, digits, ., _, /, -`
  );
  process.exit(1);
}

if (packagesArg) {
  const requested = packagesArg
    .split("=")[1]
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);
  const invalid = requested.filter((name) => !packageMap[name]);
  if (invalid.length > 0) {
    console.error(`Invalid --packages value(s): ${invalid.join(", ")}`);
    process.exit(1);
  }
  packages = [...new Set(requested)].map((name) => packageMap[name]);
  if (packages.length === 0) {
    console.log("No packages selected for tag generation.");
    process.exit(0);
  }
}

function run(command) {
  return execSync(command, { cwd: root, stdio: ["ignore", "pipe", "pipe"] })
    .toString()
    .trim();
}

function hasLocalTag(tag) {
  const out = run(`git tag --list "${tag}"`);
  return out === tag;
}

function hasRemoteTag(tag) {
  try {
    const out = run(`git ls-remote --tags ${remote} "refs/tags/${tag}"`);
    return out.includes(`refs/tags/${tag}`);
  } catch {
    return false;
  }
}

const releaseTags = [];
for (const pkgPath of packages) {
  const abs = path.join(root, pkgPath);
  if (!fs.existsSync(abs)) {
    console.error(`Missing package file: ${pkgPath}`);
    process.exit(1);
  }
  let pkg;
  try {
    pkg = JSON.parse(fs.readFileSync(abs, "utf8"));
  } catch (error) {
    console.error(`Invalid JSON in ${pkgPath}: ${error.message}`);
    process.exit(1);
  }
  if (!pkg.name || !pkg.version) {
    console.error(`Invalid package metadata in ${pkgPath}`);
    process.exit(1);
  }
  releaseTags.push(`${pkg.name}@${pkg.version}`);
}

const uniqueTags = [...new Set(releaseTags)];
const localExistingTags = uniqueTags.filter((tag) => hasLocalTag(tag));
const remoteExistingTags = uniqueTags.filter((tag) => hasRemoteTag(tag));
const existingTags = uniqueTags.filter(
  (tag) => localExistingTags.includes(tag) || remoteExistingTags.includes(tag)
);
const missingTags = dryRun
  ? uniqueTags.filter((tag) => !existingTags.includes(tag))
  : uniqueTags.filter((tag) => !remoteExistingTags.includes(tag));

if (existingTags.length > 0) {
  console.log("Skipping existing tags:");
  existingTags.forEach((tag) => console.log(`- ${tag}`));
}

if (missingTags.length === 0) {
  console.log("No new release tags to create.");
  process.exit(0);
}

console.log(
  dryRun ? "Dry run: new tags to create" : "Creating and pushing new tags"
);
missingTags.forEach((tag) => console.log(`- ${tag}`));

if (dryRun) {
  console.log(
    `\nTo create and push tags, run: npm run release:tags:push -- --remote=${remote}`
  );
  process.exit(0);
}

for (const tag of missingTags) {
  if (!localExistingTags.includes(tag)) {
    execSync(`git tag -a "${tag}" -m "release: ${tag}"`, {
      cwd: root,
      stdio: "inherit",
    });
  }
}

for (const tag of missingTags) {
  execSync(`git push ${remote} "${tag}"`, { cwd: root, stdio: "inherit" });
}

console.log("Release tags pushed successfully.");
