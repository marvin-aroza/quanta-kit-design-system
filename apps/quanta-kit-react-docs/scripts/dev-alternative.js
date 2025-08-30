#!/usr/bin/env node

const { spawn } = require('child_process');

// Function to open browser after delay
async function openBrowser() {
  await new Promise(resolve => setTimeout(resolve, 4000));
  try {
    const open = await import('open');
    console.log('🌐 Opening browser at http://localhost:3001...');
    await open.default('http://localhost:3001');
  } catch (openError) {
    console.log('ℹ️  Please open http://localhost:3001 manually');
    console.log('Error:', openError.message);
  }
}

// Start Next.js and open browser concurrently
async function start() {
  console.log('🚀 Starting Next.js development server...');
  
  // Start the browser opening process
  openBrowser();
  
  // Start Next.js (this will block and keep running)
  const nextProcess = spawn('npm', ['run', 'next-dev'], {
    stdio: 'inherit',
    shell: true
  });

  // Handle process exit
  process.on('SIGINT', () => {
    console.log('\n👋 Shutting down development server...');
    nextProcess.kill('SIGINT');
    process.exit(0);
  });

  process.on('SIGTERM', () => {
    nextProcess.kill('SIGTERM');
    process.exit(0);
  });
}

start();
