const Koa = require('koa');
const app = new Koa();

app.use(async (ctx, next) => {
  const start = new Date().getTime();
  console.log(`start: ${ctx.url}`)
  await next(); // next 执行下一个中间件
  const end = new Date().getTime();
  console.log(`请求${ctx.url}耗时：${end - start}ms`)
}) 

app.use(async (ctx, next) => {

  // ctx 上下文环境
  ctx.body = [
    {
      name: 'wangxiangdddddddddddd'
    }
  ];

  await next(); // next 执行下一个中间件

})

app.listen(3000)