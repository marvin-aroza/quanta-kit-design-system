#!/usr/bin/env node

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { cwd } from 'process';

// Get the directory where this script is located
const __dirname = dirname(fileURLToPath(import.meta.url));

// Try different strategies to find the project root
let rootDir;

// Strategy 1: Script is in scripts/ subdirectory
const scriptParentDir = join(__dirname, '..');
if (existsSync(join(scriptParentDir, 'package.json'))) {
  rootDir = scriptParentDir;
} else {
  // Strategy 2: Use current working directory (for CI environments)
  rootDir = cwd();
}

console.log(`🏠 Project root directory: ${rootDir}`);

// Read both package.json files
const rootPackagePath = join(rootDir, 'package.json');
const libPackagePath = join(rootDir, 'projects', 'quanta-kit', 'package.json');

console.log(`🔍 Looking for root package.json at: ${rootPackagePath}`);
console.log(`🔍 Looking for library package.json at: ${libPackagePath}`);

if (!existsSync(rootPackagePath)) {
  console.error(`❌ Root package.json not found at: ${rootPackagePath}`);
  process.exit(1);
}

if (!existsSync(libPackagePath)) {
  console.error(`❌ Library package.json not found at: ${libPackagePath}`);
  process.exit(1);
}

const rootPackage = JSON.parse(readFileSync(rootPackagePath, 'utf8'));
const libPackage = JSON.parse(readFileSync(libPackagePath, 'utf8'));

console.log(`📋 Root package "${rootPackage.name}" version: ${rootPackage.version}`);
console.log(`📋 Library package "${libPackage.name}" version: ${libPackage.version}`);

// Determine which version to use (root package takes precedence in semantic-release)
const targetVersion = rootPackage.version;
let updated = false;

// Update library package if needed
if (libPackage.version !== targetVersion) {
  console.log(`🔄 Updating library version from ${libPackage.version} to ${targetVersion}`);
  libPackage.version = targetVersion;
  
  try {
    writeFileSync(libPackagePath, JSON.stringify(libPackage, null, 2) + '\n');
    console.log(`✅ Library package.json updated to ${targetVersion}`);
    updated = true;
  } catch (error) {
    console.error(`❌ Failed to write library package.json: ${error.message}`);
    process.exit(1);
  }
}

// Also ensure root package is at the target version (redundant but safe)
if (rootPackage.version !== targetVersion) {
  console.log(`� Updating root version to ${targetVersion}`);
  rootPackage.version = targetVersion;
  
  try {
    writeFileSync(rootPackagePath, JSON.stringify(rootPackage, null, 2) + '\n');
    console.log(`✅ Root package.json updated to ${targetVersion}`);
    updated = true;
  } catch (error) {
    console.error(`❌ Failed to write root package.json: ${error.message}`);
    process.exit(1);
  }
}

if (!updated) {
  console.log(`✅ Both packages already synced at version ${targetVersion}`);
} else {
  // Verify both files are now synced
  const verifyRoot = JSON.parse(readFileSync(rootPackagePath, 'utf8'));
  const verifyLib = JSON.parse(readFileSync(libPackagePath, 'utf8'));
  
  if (verifyRoot.version === verifyLib.version && verifyRoot.version === targetVersion) {
    console.log(`🔐 Verification successful: Both packages at ${targetVersion}`);
  } else {
    console.error(`❌ Verification failed:`);
    console.error(`   Root: ${verifyRoot.version}`);
    console.error(`   Library: ${verifyLib.version}`);
    console.error(`   Expected: ${targetVersion}`);
    process.exit(1);
  }
}
