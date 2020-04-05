const http = require('http');

http.createServer(function (request, response) {

  // 发送http请求
  // http状态值 200：OK
  // 内容类型：text/plain
  response.writeHead(200, {'Content-Type': 'text/plain'});
  // 发送响应数据
  response.end('HELLO WORLD')
}).listen(3001);

console.log('Server running at http://127.0.0.1');