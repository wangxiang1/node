module.exports = {
  'get /': async app => { // /user
    // ctx.body = '用户首页'
    const name = await app.$service.user.getName();
    app.ctx.body = name;
  },
  'get /info': async app => { // /user/info
    // ctx.body = '用户详情页面'
    app.ctx.body = app.$service.user.getAge();
  }
}