#!/usr/bin/env node
/* eslint-disable no-console */
const fs = require("fs");
const os = require("os");
const path = require("path");
const { execSync } = require("child_process");

const workspaceArg = process.argv.find((arg) => arg.startsWith("--workspace="));
if (!workspaceArg) {
  console.error("Usage: node scripts/runtime-smoke.cjs --workspace=<workspace-name>");
  process.exit(1);
}

const workspace = workspaceArg.split("=")[1];
const root = process.cwd();

const runtimeMatrix = {
  "quanta-kit-design-system-react": {
    peers: ["react@^19", "react-dom@^19"],
    script: `
import React from "react";
import { renderToString } from "react-dom/server";
import * as ReactPkg from "quanta-kit-design-system-react";
const { Button } = ReactPkg;
if (!Button) {
  throw new Error("React package missing Button export");
}
const html = renderToString(React.createElement(Button, { label: "Smoke" }));
if (!html || typeof html !== "string") {
  throw new Error("React SSR render returned empty output");
}
`,
  },
  "quanta-kit-design-system-vue": {
    peers: ["vue@^3.5", "@vue/server-renderer@^3.5"],
    script: `
import { createSSRApp, h } from "vue";
import { renderToString } from "@vue/server-renderer";
import { Button } from "quanta-kit-design-system-vue";
import { createRequire } from "node:module";
import { existsSync } from "node:fs";
const require = createRequire(import.meta.url);
const cssPath = require.resolve("quanta-kit-design-system-vue/dist/quanta-kit-design-system-vue.css");
if (!existsSync(cssPath)) {
  throw new Error("Vue CSS asset is missing from installed package");
}
const app = createSSRApp({ render: () => h(Button, { label: "Smoke" }) });
const html = await renderToString(app);
if (!html || typeof html !== "string") {
  throw new Error("Vue SSR render returned empty output");
}
`,
  },
  "quanta-kit-design-system-angular": {
    peers: ["@angular/core@^21", "@angular/common@^21"],
    script: `
import { createRequire } from "node:module";
import { existsSync } from "node:fs";
import { join } from "node:path";

const require = createRequire(import.meta.url);
const modulePath = require.resolve("quanta-kit-design-system-angular");
const typesPath = join(modulePath, "..", "..", "types", "quanta-kit-design-system-angular.d.ts");
if (!existsSync(modulePath) || !existsSync(typesPath)) {
  throw new Error("Angular package module/types outputs are missing");
}
`,
  },
};

const target = runtimeMatrix[workspace];
if (!target) {
  console.error(`Unsupported workspace: ${workspace}`);
  process.exit(1);
}

function run(command, cwd = root, inherit = false) {
  const result = execSync(command, {
    cwd,
    stdio: inherit ? "inherit" : ["ignore", "pipe", "pipe"],
    env: { ...process.env, CI: "true" },
  });
  if (inherit) {
    return "";
  }
  return result.toString().trim();
}

let tarball;
let tempDir;
try {
  const packJson = JSON.parse(run(`npm pack --workspace=${workspace} --json`));
  const filename = packJson?.[0]?.filename;
  if (!filename) {
    throw new Error("Could not resolve tarball filename from npm pack output.");
  }

  tarball = path.join(root, filename);
  tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "qk-runtime-"));
  run("npm init -y", tempDir, true);
  run(`npm install "${tarball}" --ignore-scripts --no-audit --prefer-offline`, tempDir, true);
  if (target.peers.length > 0) {
    run(`npm install ${target.peers.join(" ")} --no-audit --prefer-offline`, tempDir, true);
  }

  const smokeScriptPath = path.join(tempDir, "smoke.mjs");
  fs.writeFileSync(smokeScriptPath, target.script.trimStart(), "utf8");
  run("node smoke.mjs", tempDir, true);
  console.log(`Runtime smoke passed for ${workspace}`);
} catch (error) {
  console.error(error.message);
  process.exit(1);
} finally {
  try {
    if (tempDir) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  } catch {
    // no-op
  }
  try {
    if (tarball) {
      fs.rmSync(tarball, { force: true });
    }
  } catch {
    // no-op
  }
}
