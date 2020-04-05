const conf = require('./conf');
const {EventEmitter} = require('events');

// 客户端
const {MongoClient} = require('mongodb');

class Mongodb {
  constructor(conf){
    this.conf = conf;
    this.emmiter = new EventEmitter();

    // 连接
    this.client = new MongoClient(conf.url, {useNewUrlParser: true});
    this.client.connect(err => {
      if(err) throw err
      console.log('连接成功');
      this.emmiter.emit('connect');
    })
  }

  // 返回集合
  col(colName, dbName = conf.dbName){
    return this.client.db(dbName).collection(colName);
  }

  /**
   * @description 用于订阅连接事件
   * @param {*} event
   * @param {*} cb
   * @memberof Mongodb
   */
  once(event, cb){
    this.emmiter.once(event, cb);
  }
}

module.exports = new Mongodb(conf);