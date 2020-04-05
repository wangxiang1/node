const http = require('http');
const fs = require('fs');

http.createServer((request, response) => {
  console.log('there is a request');
  // request response 继承Stream，本身是个流
  // console.log('response:', getPrototypeChain(response));
  // console.log('request:', getPrototypeChain(request));
  // response.end('Hello Node !!!')

  const { url, method, headers } = request;
  if (url === '/' && method === 'GET') {
    fs.readFile('./index.html', (error, data) => {
      if(error) {
        response.statusCode = 500;
        response.setHeader('Content-Type', 'text/plain;charset=utf-8');
        response.end('500 服务器错误');
        return;
      }

      response.statusCode = 200;
      response.setHeader('Content-Type',' text/html');
      response.end(data);
    })

  }else if(url === '/users' && method === 'GET'){
    response.writeHead(200, {'Content-Type': 'application/json'});
    response.end(JSON.stringify([{name: 'wangxiang', age: 18}, {name: 'Flare', age: 20}]))
  }else if(method === 'GET' && headers.accept.indexOf('image/*') !== -1){
    // 流 处理图片
    fs.createReadStream('.' + url).pipe(response)
    
  }
  
}).listen(3001);

// 打印原型链
function getPrototypeChain(obj) {
  const protoChain = [];
  // Object.getPrototypeOf(obj)返回指定对象的原型
  while(obj = Object.getPrototypeOf(obj)){
    protoChain.push(obj)
  }

  return protoChain;
}