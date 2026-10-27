// server.js - TORQUE Local Development & SSR/SSG Static Web Server
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 8080;
const PUBLIC_DIR = __dirname;

const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.xml': 'application/xml; charset=utf-8',
    '.txt': 'text/plain; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf'
};

function resolveFile(urlPath) {
    const cleanUrl = urlPath.split('?')[0];
    let candidate = path.join(PUBLIC_DIR, cleanUrl === '/' ? 'index.html' : cleanUrl);

    // 1. Direct file match
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
        return candidate;
    }

    // 2. Directory with index.html
    if (fs.existsSync(candidate) && fs.statSync(candidate).isDirectory()) {
        const dirIndex = path.join(candidate, 'index.html');
        if (fs.existsSync(dirIndex) && fs.statSync(dirIndex).isFile()) {
            return dirIndex;
        }
    }

    // 3. Clean route extension (e.g. /resources -> /resources.html)
    const withHtmlExt = candidate + '.html';
    if (fs.existsSync(withHtmlExt) && fs.statSync(withHtmlExt).isFile()) {
        return withHtmlExt;
    }

    // 4. Default fallback to root index.html
    return path.join(PUBLIC_DIR, 'index.html');
}

const server = http.createServer((req, res) => {
    const targetFile = resolveFile(req.url);
    const extname = String(path.extname(targetFile)).toLowerCase();
    const contentType = MIME_TYPES[extname] || 'application/octet-stream';

    console.log(`[REQ ${new Date().toLocaleTimeString()}] ${req.method} ${req.url} -> ${path.basename(targetFile)} (${contentType})`);

    fs.readFile(targetFile, (error, content) => {
        if (error) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end(`Server Error: ${error.code}`);
        } else {
            res.writeHead(200, {
                'Content-Type': contentType,
                'Access-Control-Allow-Origin': '*',
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
                'Pragma': 'no-cache',
                'Expires': '0'
            });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`TORQUE Local Server running at http://localhost:${PORT}`);
});
