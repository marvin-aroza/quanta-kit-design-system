#!/usr/bin/env node
/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const root = process.cwd();
const packages = [
  "packages/quanta-kit-react/package.json",
  "packages/quanta-kit-vue/package.json",
  "packages/quanta-kit-angular/package.json",
];

const args = new Set(process.argv.slice(2));
const dryRun = !args.has("--push");
const remoteArg = process.argv.find((arg) => arg.startsWith("--remote="));
const remote = remoteArg ? remoteArg.split("=")[1] : "origin";

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
  const pkg = JSON.parse(fs.readFileSync(abs, "utf8"));
  if (!pkg.name || !pkg.version) {
    console.error(`Invalid package metadata in ${pkgPath}`);
    process.exit(1);
  }
  releaseTags.push(`${pkg.name}@${pkg.version}`);
}

const uniqueTags = [...new Set(releaseTags)];
const existingTags = uniqueTags.filter(
  (tag) => hasLocalTag(tag) || hasRemoteTag(tag)
);
const missingTags = uniqueTags.filter((tag) => !existingTags.includes(tag));

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
  execSync(`git tag -a "${tag}" -m "release: ${tag}"`, {
    cwd: root,
    stdio: "inherit",
  });
}

for (const tag of missingTags) {
  execSync(`git push ${remote} "${tag}"`, { cwd: root, stdio: "inherit" });
}

console.log("Release tags pushed successfully.");
