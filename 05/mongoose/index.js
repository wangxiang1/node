const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/testmongo', {useNewUrlParser: true});

const conn = mongoose.connection;

conn.on('error', err => console.log(err))

conn.once('open', async () => {
  const Schema = mongoose.Schema({
    category: String,
    name: String,
  })

  const Model = mongoose.model('fruits_mongoose', Schema);
  let ret = await Model.create({
    category: '水果',
    name: '苹果',
    price: 9
  });

  console.log('插入数据：', ret);

})