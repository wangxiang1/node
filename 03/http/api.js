// /http/api.js
const http = require("http");
const fs = require("fs");
http
  .createServer((req, res) => {
    const { method, url } = req;
    console.log('url: '+ url + ' method: ' + method);
    console.log('cookie: '+ req.headers.cookie);
    if (method == "GET" && url == "/") {
      fs.readFile("./index.html", (err, data) => {
        res.setHeader("Content-Type", "text/html");
        res.end(data);
      });
    } else if (method == "GET" && url == "/api/users") {
      res.setHeader("Content-Type", "application/json");
      res.setHeader("Set-Cookie", "cookie1=v1234555"); // 当response header里存在set-cookie时，浏览器会把这个字段保存起来
      res.setHeader('Access-Control-Allow-Credentials', 'true'); // 允许认证
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // 访问控制允许的源，允许3000端口访问这个接口
      res.end(JSON.stringify([{ name: "tom", age: 20 }]));
    }else if(method == "OPTIONS" && url == "/api/users"){ // 预检请求
      res.writeHead(200, {
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Allow-Headers': 'X-Token,Content-Type',
        'Access-Control-Allow-Methods': 'PUT',
        'Access-Control-Allow-Credentials':'true'
      })
      res.end();
    }else if(method == 'POST' && url == '/api/save'){
      // body-parser 原理： 将POST的body取出来并格式化
      let repData = [];
      let size = 0;
      req.on('data', data => {
        console.log('>>req.on', data);
        repData.push(data);
        size += data.length;
      });

      req.on('end', () => {
        console.log('end');
        const data = Buffer.concat(repData, size);
        console.log('data: ', size, data.toString());
        res.end(`formdata:${data.toString()}`)
      })

    }
  })
  .listen(4000, () => { // 作为后端启动
    console.log("api listen at " + 4000);
  });
