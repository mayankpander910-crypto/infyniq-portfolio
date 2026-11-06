#!/usr/bin/env node
/**
 * Zero-dependency static server for the Infyniq Solutions portfolio.
 * Usage: node server.js [port]   (default 3000)  →  http://localhost:3000
 */
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const PORT = Number(process.argv[2] || process.env.PORT || 3000);
const MIME = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json', '.webmanifest': 'application/manifest+json', '.svg': 'image/svg+xml', '.webp': 'image/webp',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.woff': 'font/woff',
  '.txt': 'text/plain; charset=utf-8', '.xml': 'application/xml', '.md': 'text/markdown; charset=utf-8', '.zip': 'application/zip'
};

const server = http.createServer((req, res) => {
  try {
    let urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
    if (urlPath.endsWith('/')) urlPath += 'index.html';
    let filePath = path.normalize(path.join(ROOT, urlPath));
    if (!filePath.startsWith(ROOT)) { res.writeHead(403); return res.end('Forbidden'); }
    if (!path.extname(filePath) && fs.existsSync(filePath + '.html')) filePath += '.html';
    fs.stat(filePath, (err, stat) => {
      if (err || !stat.isFile()) {
        const notFound = path.join(ROOT, '404.html');
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        return fs.createReadStream(notFound).pipe(res);
      }
      res.writeHead(200, { 'Content-Type': MIME[path.extname(filePath).toLowerCase()] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
      fs.createReadStream(filePath).pipe(res);
    });
  } catch (e) {
    res.writeHead(500); res.end('Server error');
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`\n  Infyniq Solutions portfolio running at:\n  → http://localhost:${PORT}\n\n  Press Ctrl+C to stop.\n`);
});
