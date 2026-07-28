const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '..', 'dist');

function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  const stats = fs.statSync(src);
  if (stats.isDirectory()) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    for (const entry of fs.readdirSync(src)) {
      copyRecursive(path.join(src, entry), path.join(dest, entry));
    }
  } else {
    fs.copyFileSync(src, dest);
  }
}

if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true });
}
fs.mkdirSync(distDir, { recursive: true });

const dirs = ['public', 'views', 'routes', 'controllers', 'middleware', 'config', 'utils', 'prisma'];
for (const dir of dirs) {
  copyRecursive(path.join(__dirname, '..', dir), path.join(distDir, dir));
}

const files = ['server.js', 'package.json', '.env.example'];
for (const file of files) {
  const src = path.join(__dirname, '..', file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(distDir, file));
  }
}

console.log('Build complete! Output in /dist');
