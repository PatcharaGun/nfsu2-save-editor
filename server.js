import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { exec } from 'node:child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.dat': 'application/octet-stream',
  '.zip': 'application/zip',
};

const server = http.createServer((req, res) => {
  let reqPath = decodeURI(req.url?.split('?')[0] || '/');
  if (reqPath === '/' || reqPath === '') reqPath = '/index.html';

  const safePath = path.normalize(path.join(__dirname, reqPath));
  if (!safePath.startsWith(__dirname)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.stat(safePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('File not found: ' + reqPath);
      return;
    }

    const ext = path.extname(safePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, {
      'Content-Type': contentType,
      'Content-Length': stats.size,
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-cache',
    });
    fs.createReadStream(safePath).pipe(res);
  });
});

const DEFAULT_PORT = 8080;
function listen(port) {
  server.listen(port, () => {
    const url = `http://localhost:${port}/`;
    console.log(`\n======================================================`);
    console.log(` NFSU2 Career Save Editor is running at:`);
    console.log(` ${url}`);
    console.log(` Supporting 25 car slots (and 5 or 10 slots)!`);
    console.log(` Press Ctrl+C in this console to stop the server.`);
    console.log(`======================================================\n`);

    const openCmd = process.platform === 'win32' ? `start "" "${url}"` : `xdg-open "${url}"`;
    exec(openCmd, () => {});
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      listen(port + 1);
    } else {
      console.error('Server error:', err);
    }
  });
}

listen(DEFAULT_PORT);
