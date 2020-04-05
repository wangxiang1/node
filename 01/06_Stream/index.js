const fs = require('fs');

// 读取 流
const rs = fs.createReadStream('./123.jpg');
// 写入 流
const ws = fs.createWriteStream('./123_copy.jpg');
// 连接
rs.pipe(ws)
