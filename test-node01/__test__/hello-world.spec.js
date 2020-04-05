test('测试hello world', () => {
  const res = require('../hello-world')
  // console.log('result: ',res);

  // 断言
  // jest **** --watch （可以监听测试是否正确）
  expect(res)
  .toBe('hello world');

})