const mongodb = require('./db');
mongodb.once("connect", async () => {
  const col = mongodb.col('fruits');
  await col.deleteMany();  // 删除已存在的
  const data = new Array(100).fill().map((v, i) => {
    return {
      name: 'XX' + i,
      price: i,
      category: Math.random() > 0.5 ? '蔬菜' : '水果'
    }
  });

  await col.insertMany(data);
  console.log('插入成功');
});