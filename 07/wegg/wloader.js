const fs = require('fs');
const path = require('path');
const Router = require('koa-router');

// 读取指定目录文件
function load(dir, cb) {
  // 获取绝对路径
  const url = path.resolve(__dirname, dir);

  // 读文件
  const files = fs.readdirSync(url);

  // 遍历文件夹
  files.forEach(filename => {
    filename = filename.replace('.js', '');
    const file = require(url + '/' + filename);

    // 处理逻辑
    cb(filename, file);
  })
}

function initRouter(app) {
  const router = new Router();

  load('routes', (filename, routes) => {
    const prefix = filename === 'index' ? '' : `/${filename}`; // 前缀

    routes = typeof routes === 'function' ? routes(app) : routes;

    // 遍历对象
    Object.keys(routes).forEach(key => {
      const [method, path] = key.split(' ');
      console.log('正在映射地址：', `${method.toLocaleUpperCase()} ${prefix}${path}`);

      // router.get('/user/info', async ctx => {})
      // router[method](prefix + path, routes[key]);
      router[method](prefix + path, async ctx => {
        app.ctx = ctx; // 挂载上下文到app
        await routes[key](app); // 路由处理，接收app
      })
    });
  });

  return router;
}

function initController(app) {
  const controllers = {};

  load('controller', (filename, controller) => {
    controllers[filename] = controller(app);
  })

  return controllers;
}

function initService() {
  const services = {};

  load('service', (filename, service) => {
    services[filename] = service;
  })

  return services;
}


const Sequelize = require('sequelize');
function loadConfig(app) {
  load('config', (filename, config) => {
    if(config.db){
      app.$db = new Sequelize(config.db);
      // 加载模型
      app.$model = {};
      load('model', (filename, {schema, options}) => {
        app.$model[filename] = app.$db.define(filename, schema, options)
      });
      app.$db.sync()
    }

    if(config.middleware){
      config.middleware.forEach(mid => {
        const midPath = path.resolve(__dirname, 'middleware', mid);
        app.$app.use(require(midPath));
      })
    }
  })
}

module.exports = {initRouter, initController, initService, loadConfig}