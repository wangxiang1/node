const fs = require('fs');

// test("测试文件名生成", () => {
//   // 引入的是个class，需要实例化
//   const src = new (require("../index"))();
//   const ret = src.getTestFileName("/abc/class.js");
//   console.log("getTestFileName:", ret);
//   expect(ret).toBe("/abc/__test__/class.spec.js");
// });

// test('测试测试代码生成', () => {
//   const src = new (require('../index'))();
//   const ret = src.getTestSource('fun', 'class');

//   console.log(ret);
//   expect(ret)
//   .toBe(`
// test('TEST fun', () => {
//   const fun = require('../class');
//   const ret = fun();
// });
// `)
// })

test("集成测试 测试生成测试代码文件", () => {
  // 准备环境
  // 删除测试文件夹
  fs.rmdirSync(__dirname + '/data/__test__', {
    recursive: true // 迭代，删除这个文件夹底下的所有文件
  })

  const src = new (require('../index'))();
  src.getJestSource(__dirname + '/data');
  
});