(async () => {
  const {MongoClient}  = require('mongodb');
  const client = new MongoClient(
    'mongodb://localhost:27017',
    {
      useNewUrlParser: true
    }
    );

    let ret;
    // 创建连接
    ret = await client.connect();
    // console.log('ret:',ret);

    const db = client.db('testmongo');
    const fruits = db.collection('fruits');

    // 添加文档
    ret = await fruits.insertOne({
      name: '芒果',
      price: 20.1
    });
    // console.log('insert：', JSON.stringify(ret));

    // 查询文档
    ret = await fruits.findOne();
    console.log('select:', ret);

    // 更新文档
    ret = await fruits.updateOne({name: '芒果'}, {
      $set:{
        name: '苹果'
      }
    })

    // 删除文档
    ret = await fruits.deleteMany();
    client.close();
})()