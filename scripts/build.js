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

const dirs = ['public', 'views', 'routes', 'controllers', 'middleware', 'config', 'utils'];
for (const dir of dirs) {
  copyRecursive(path.join(__dirname, '..', dir), path.join(distDir, dir));
}

const files = ['server.js', 'package.json', '.env.example', 'wrangler.toml', 'worker.js'];
for (const file of files) {
  const src = path.join(__dirname, '..', file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(distDir, file));
  }
}

// Copy Prisma schema + migrations for deploy-time migrate
const prismaSrcDir = path.join(__dirname, '..', 'prisma');
const prismaDstDir = path.join(distDir, 'prisma');
if (!fs.existsSync(prismaDstDir)) fs.mkdirSync(prismaDstDir, { recursive: true });
// Copy schema
if (fs.existsSync(path.join(prismaSrcDir, 'schema.prisma')))
  fs.copyFileSync(path.join(prismaSrcDir, 'schema.prisma'), path.join(prismaDstDir, 'schema.prisma'));
// Copy migrations folder
const migrationsSrc = path.join(prismaSrcDir, 'migrations');
if (fs.existsSync(migrationsSrc))
  copyRecursive(migrationsSrc, path.join(prismaDstDir, 'migrations'));

console.log('Build complete! Output in /dist');
