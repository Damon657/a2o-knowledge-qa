// 本機測試用靜態伺服器（部署到 GitHub Pages 可不需要）
const http = require('http'), fs = require('fs'), path = require('path');
const root = __dirname, port = process.env.PORT || 5178;
const mime = { '.html': 'text/html; charset=utf-8', '.md': 'text/markdown; charset=utf-8', '.js': 'text/javascript' };
http.createServer((req, res) => {
  let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (p === '/') p = '/index.html';
  const f = path.join(root, p);
  fs.readFile(f, (e, d) => {
    if (e) { res.writeHead(404); return res.end('not found'); }
    res.writeHead(200, { 'Content-Type': mime[path.extname(f)] || 'application/octet-stream' });
    res.end(d);
  });
}).listen(port, () => console.log('A2O 知識庫問答 → http://localhost:' + port));
