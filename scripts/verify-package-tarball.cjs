#!/usr/bin/env node
/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const workspaceArg = process.argv.find((arg) => arg.startsWith("--workspace="));
if (!workspaceArg) {
  console.error("Usage: node scripts/verify-package-tarball.cjs --workspace=<workspace-name>");
  process.exit(1);
}

const workspace = workspaceArg.split("=")[1];
const root = process.cwd();

const workspaceMeta = {
  "quanta-kit-design-system-react": {
    packageName: "quanta-kit-design-system-react",
    requiredFiles: [
      "package/dist/index.cjs",
      "package/dist/index.esm.js",
      "package/dist/index.d.ts",
    ],
    requiredEntrypoints: ["main", "module", "types"],
  },
  "quanta-kit-design-system-vue": {
    packageName: "quanta-kit-design-system-vue",
    requiredFiles: [
      "package/dist/index.es.js",
      "package/dist/index.umd.js",
      "package/dist/index.d.ts",
      "package/dist/quanta-kit-design-system-vue.css",
    ],
    requiredEntrypoints: ["main", "module", "types"],
  },
  "quanta-kit-design-system-angular": {
    packageName: "quanta-kit-design-system-angular",
    requiredFiles: [
      "package/dist/quanta-kit/fesm2022/quanta-kit-design-system-angular.mjs",
      "package/dist/quanta-kit/types/quanta-kit-design-system-angular.d.ts",
    ],
    requiredEntrypoints: ["main", "module", "types"],
  },
};

const meta = workspaceMeta[workspace];
if (!meta) {
  console.error(`Unsupported workspace: ${workspace}`);
  process.exit(1);
}

function run(command) {
  return execSync(command, { cwd: root, stdio: ["ignore", "pipe", "pipe"] })
    .toString()
    .trim();
}

function existsInTar(entries, filePath) {
  return entries.includes(filePath);
}

const packJson = JSON.parse(run(`npm pack --workspace=${workspace} --json`));
const filename = packJson?.[0]?.filename;
if (!filename) {
  console.error("Could not resolve tarball filename from npm pack output.");
  process.exit(1);
}

const tarball = path.join(root, filename);
const listOutput = run(`tar -tf "${tarball}"`);
const entries = listOutput.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);

const pkgJsonRaw = run(`tar -xOf "${tarball}" package/package.json`);
const pkgJson = JSON.parse(pkgJsonRaw);

if (pkgJson.name !== meta.packageName) {
  console.error(`Unexpected package name in tarball: ${pkgJson.name} (expected ${meta.packageName})`);
  process.exit(1);
}

for (const key of meta.requiredEntrypoints) {
  if (!pkgJson[key]) {
    console.error(`Missing required package.json field: ${key}`);
    process.exit(1);
  }
  const entryPath = `package/${String(pkgJson[key]).replace(/^\.?\//, "")}`;
  if (!existsInTar(entries, entryPath)) {
    console.error(`Entrypoint target missing from tarball: ${entryPath}`);
    process.exit(1);
  }
}

for (const requiredFile of meta.requiredFiles) {
  if (!existsInTar(entries, requiredFile)) {
    console.error(`Required file missing from tarball: ${requiredFile}`);
    process.exit(1);
  }
}

if (pkgJson.exports && pkgJson.exports["."]) {
  const exportRoot = pkgJson.exports["."];
  const exportPaths = Object.values(exportRoot).map((value) =>
    `package/${String(value).replace(/^\.?\//, "")}`
  );
  for (const exportPath of exportPaths) {
    if (!existsInTar(entries, exportPath)) {
      console.error(`Missing exports target in tarball: ${exportPath}`);
      process.exit(1);
    }
  }
}

fs.rmSync(tarball, { force: true });
console.log(`Tarball integrity passed for ${workspace}`);
