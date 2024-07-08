import http from 'http';
import fs from 'fs';

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  const {url,method} = req
  if(method === 'GET') {
    switch(url) {
      case '/':
        serveFile(res, 'index.html');
        break;
      case '/api':
        serveFile(res, 'api.html');
        break;
      case '/api/users':
        res.end(JSON.stringify(getUsers()));
        break;
      default:
        res.end('<h1>404 Not Found!</h1>');
    }
  }
  else if (method === 'POST') {
    switch(url) {
      case '/api':
        res.end('<h1>POST request</h1>');
        break;
      default:
        res.end('<h1>404 Not Found!</h1>');
    }
  }
  else if(method === 'PUT') {
    res.end('<h1>PUT request</h1>');
    
  }
  else if(method === 'DELETE') {
    res.end('<h1>DELETE request</h1>');
  }
});
server.listen(5000, () => {
  console.log('Server is running on port http://localhost:5000');
});

function serveFile(res: http.ServerResponse, filePath: string) {
  if(filePath.endsWith('.json')) {
    res.setHeader('Content-Type', 'application/json');
  }
  else if(filePath.endsWith('.html')) {
    res.setHeader('Content-Type', 'text/html');
  }
  const path = [ './static', filePath].join('/');
  fs.readFile(path, (err, data) => {
    if(err) {
      res.end(`<h1>404 Not Found: <span style="color:orange">${err}</span></h1>`);
    } else {
      res.end(data);
    }
  });
}

function getUsers() {
  const data = fs.readFileSync('data.json', 'utf8');
  return JSON.parse(data).users;
}