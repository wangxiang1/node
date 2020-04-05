const http = require("http");
const context = require("./context");
const request = require("./request");
const response = require("./response");

class WKoa {
  // 初始化中间件数组
  constructor(){
    this.middlewares = [];
  }

  listen(...args) {
    const server = http.createServer(async (req, res) => {
      // this.callback(req, res);
      // 创建上下文
      const ctx = this.creacteContext(req, res);
      // this.callback(ctx);
      // 中间件组合
      const fn = this.compose(this.middlewares);
      // 执行
      await fn(ctx);
      // 响应
      res.end(ctx.body);
    });

    server.listen(...args);
  }

  // use(callback) {
  //   this.callback = callback;
  // }

  use(callback) {
    this.middlewares.push(callback);
  }

  /**
   * 构建上下文
   */
  creacteContext(req, res) {
    const ctx = Object.create(context); // 创建一个新对象，使用现有的对象来提供新创建的对象的__proto__
    ctx.request = Object.create(request);
    ctx.response = Object.create(response);

    ctx.req = ctx.request.req = req;
    ctx.res = ctx.response.res = res;

    return ctx;
  }

/**
 * 中间件组合
 * @param {*} middlewares
 */
compose(middlewares) {
  // console.log("middlewares:", middlewares);
  return function(ctx) {
    // 上下文
    return dispatch(0);
    // 返回执行承诺
    function dispatch(i) {
      // console.log(i);
      let fn = middlewares[i];
      // console.log(fn);
      if (!fn) {
        return Promise.resolve();
      }

      return Promise.resolve(
        fn(ctx, function next() {
          const r = dispatch(i + 1);
          // console.log("next:", r);
          // promise完成后 再执行下一个
          return r;
        })
      );
    }
  };
}
}

module.exports = WKoa;
