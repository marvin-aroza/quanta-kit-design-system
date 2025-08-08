#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');

// Read the root package.json
const rootPackagePath = join(rootDir, 'package.json');
const rootPackage = JSON.parse(readFileSync(rootPackagePath, 'utf8'));

// Read the library package.json
const libPackagePath = join(rootDir, 'projects', 'quanta-kit', 'package.json');
const libPackage = JSON.parse(readFileSync(libPackagePath, 'utf8'));

// Update the library package version
libPackage.version = rootPackage.version;

// Write the updated library package.json
writeFileSync(libPackagePath, JSON.stringify(libPackage, null, 2) + '\n');

console.log(`✅ Synced library version to ${rootPackage.version}`);
