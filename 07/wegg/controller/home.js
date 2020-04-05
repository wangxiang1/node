module.exports = app => ({
  index: async () => {
    // ctx.body = '首页controller'
    const name = await app.$service.user.getName();
    // app.ctx.body = 'ctrl user '+ name;
    console.log(app.$model);
    app.ctx.body = await app.$model.user.findAll()
  },
  detail: async () => {
    app.ctx.body = '详情页面controller'
  }
});