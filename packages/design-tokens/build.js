const fs = require('fs');
const path = require('path');

// Create dist directory if it doesn't exist
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist');
}

// Read all token files
const tokensDir = 'tokens';
const tokens = {};

const files = fs.readdirSync(tokensDir);
for (const file of files) {
  if (file.endsWith('.json')) {
    const content = JSON.parse(fs.readFileSync(path.join(tokensDir, file), 'utf-8'));
    Object.assign(tokens, content);
  }
}

// Generate SCSS variables
let scssContent = '';
function generateScssVars(obj, prefix = '') {
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'object' && value.value === undefined) {
      generateScssVars(value, prefix ? `${prefix}-${key}` : key);
    } else if (value.value !== undefined) {
      const varName = prefix ? `${prefix}-${key}` : key;
      const cssVarName = varName.replace(/\./g, '-');
      if (Array.isArray(value.value)) {
        scssContent += `$${cssVarName}: ${value.value.map(v => `'${v}'`).join(', ')};\n`;
      } else {
        scssContent += `$${cssVarName}: ${value.value};\n`;
      }
    }
  }
}

generateScssVars(tokens);
fs.writeFileSync('dist/_variables.scss', scssContent);

// Generate CSS custom properties
let cssContent = ':root {\n';
function generateCssVars(obj, prefix = '') {
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'object' && value.value === undefined) {
      generateCssVars(value, prefix ? `${prefix}-${key}` : key);
    } else if (value.value !== undefined) {
      const varName = prefix ? `${prefix}-${key}` : key;
      const cssVarName = varName.replace(/\./g, '-');
      if (Array.isArray(value.value)) {
        cssContent += `  --${cssVarName}: ${value.value.map(v => `'${v}'`).join(', ')};\n`;
      } else {
        cssContent += `  --${cssVarName}: ${value.value};\n`;
      }
    }
  }
}

generateCssVars(tokens);
cssContent += '}\n';
fs.writeFileSync('dist/variables.css', cssContent);

// Generate JavaScript tokens
let jsContent = '';
function generateJsTokens(obj, prefix = '') {
  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'object' && value.value === undefined) {
      result[key] = generateJsTokens(value, prefix ? `${prefix}-${key}` : key);
    } else if (value.value !== undefined) {
      result[key] = value.value;
    }
  }
  return result;
}

const jsTokens = generateJsTokens(tokens);
jsContent = `export const tokens = ${JSON.stringify(jsTokens, null, 2)};\n\n`;

// Add individual exports
function addExports(obj, path = '') {
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'object' && !Array.isArray(value)) {
      addExports(value, path ? `${path}.${key}` : key);
    } else {
      const exportName = (path ? `${path}.${key}` : key).replace(/\./g, '_');
      jsContent += `export const ${exportName} = tokens${path ? '.' + path : ''}.${key};\n`;
    }
  }
}

addExports(jsTokens);
fs.writeFileSync('dist/tokens.js', jsContent);

// Generate JSON
fs.writeFileSync('dist/tokens.json', JSON.stringify(jsTokens, null, 2));

console.log('Design tokens built successfully!');
