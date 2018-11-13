const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => { //서버 만듬.
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n'); //응답결과
});

server.listen(port, hostname, () => { //서버가 리스닝을 하도록 함. 
  console.log(`Server running at http://${hostname}:${port}/`); 
});