const { spawn } = require('child_process');

console.log('🚀 Starting Next.js development server...');

// Start Next.js dev server
const nextProcess = spawn('npm', ['run', 'next-dev'], {
  stdio: 'inherit',
  shell: true
});

// Wait for server to be ready and open browser
setTimeout(async () => {
  try {
    const open = await import('open');
    console.log('🌐 Opening browser at http://localhost:3001...');
    await open.default('http://localhost:3001');
  } catch (error) {
    console.log('ℹ️  Please open http://localhost:3001 manually');
    console.log('Error:', error.message);
  }
}, 4000); // Increased timeout to ensure Next.js is ready

// Handle process exit gracefully
process.on('SIGINT', () => {
  console.log('\n👋 Shutting down development server...');
  nextProcess.kill('SIGINT');
  process.exit(0);
});

process.on('SIGTERM', () => {
  nextProcess.kill('SIGTERM');
  process.exit(0);
});
