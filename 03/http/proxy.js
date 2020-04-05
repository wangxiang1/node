const express = require('express');
const app = express();
const proxy = require('http-proxy-middleware'); // 代理中间件
app.use(express.static(__dirname + '/'));

// 正向代理 隐藏客户端  如:vpn
// 反向代理 隐藏服务端
app.use('/api', proxy({ 
  target: 'http://localhost:4000', 
}));
// 启动静态文件，前端
app.listen(3000);