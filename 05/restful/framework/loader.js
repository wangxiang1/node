// loader 解析model里有哪些模型
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

function load(dir, callback) {
  // 获取绝对路径
  const url = path.resolve(__dirname, dir);

  const files = fs.readdirSync(url);
  files.forEach(filename => {
    //去掉后缀
    filename = filename.replace('.js', '');

    // 导入文件
    const file = require(url + '/' + filename);

    //处理
    callback(filename, file)
  })
}

// config 连接信息
// app koa实例
const loadModel = config => app => {
  mongoose.connect(config.db.url, config.db.options);
  const conn = mongoose.connection;
  conn.on("error", () => console.error("连接数据库失败"))
  app.$model = {};

  // model 文件存储了schema字段，此处直接解构了
  load('../model', (filename, {schema}) => {
    console.log('load model: '+ filename, schema);
    // 简历mongoose模型
    app.$model[filename] = mongoose.model(filename, schema);
  })

}

module.exports = {
  loadModel
}