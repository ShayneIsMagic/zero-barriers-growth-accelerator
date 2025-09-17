#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Building for Cloudflare Pages...');

try {
  // Copy Cloudflare config to next.config.js
  const cloudflareConfig = fs.readFileSync('next.config.cloudflare.js', 'utf8');
  const nextConfigPath = 'next.config.js';
  
  // Backup original config if it exists
  if (fs.existsSync(nextConfigPath)) {
    fs.copyFileSync(nextConfigPath, 'next.config.js.backup');
  }
  
  // Write Cloudflare config
  fs.writeFileSync(nextConfigPath, cloudflareConfig);
  
  console.log('✅ Cloudflare configuration applied');
  
  // Build the application
  console.log('📦 Building Next.js application...');
  execSync('npm run build', { stdio: 'inherit' });
  
  console.log('✅ Build completed successfully!');
  console.log('📁 Output directory: out/');
  console.log('🌐 Ready for Cloudflare Pages deployment');
  
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}
