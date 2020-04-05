test('node 异步编程测试', done => {
  const { callback, promise, generater,asyncAwait, event } = require('../index.js');
  // callback();
  // promise();
  // generater();
  // asyncAwait();
  event();
  // 延迟一秒结束
  setTimeout(done, 1000)
  console.log('END ================');
})