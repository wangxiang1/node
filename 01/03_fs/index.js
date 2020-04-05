const fs = require('fs');

// 同步读取(会阻塞)
// const data = fs.readFileSync('./config.js')
// console.log('data:', data.toString());

// 异步读取
// 回调太多，不优雅
// fs.readFile('./config.js', (err, data) => {
//   if(err) throw err;
//   console.log('data:', data.toString());
// })

// 如何将异步读取改为promise方法？ 用promisify
// try catch 只能捕获同步代码异常，不能捕获异步
// 但是async await 可以用try catch捕获
const {promisify} = require('util');
const readFile = promisify(fs.readFile);
process.nextTick(async () => {
  const data = await readFile('./config.js');
  console.log(data.toString());
})