const koa = require('koa');
const {initRouter, initController, initService, loadConfig} = require('./wloader');

class Wegg {

  constructor(conf){
    this.$app = new koa(conf);
    // 加载配置项
    loadConfig(this);

    this.$service = initService();
    this.$ctrl = initController(this);
    this.$router = initRouter(this);
    this.$app.use(this.$router.routes());
  }

  start(port){
    this.$app.listen(port, () => {
      console.log('服务端启动端口：', port);
    })
  }
}

module.exports = Wegg;