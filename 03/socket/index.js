// net 模块用于创建基于流的 TCP 或 IPC 的服务器（net.createServer()）与客户端（net.createConnection()）。
const net = require('net')
const chatServer = net.createServer();
const clientList = [];
// 'connection' 事件: 当一个新的连接建立的时候触发
chatServer.on('connection', client => {
  client.write('Hi!\n');
  clientList.push(client);

  // 客户端发送数据的时候,广播给所有客户端
  client.on('data', data => {
    console.log('receive:', data.toString());
    clientList.forEach(v => {
      v.write(data)
    })
  })
})

chatServer.listen(9000)