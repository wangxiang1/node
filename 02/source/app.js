const WKoa = require("./wkoa");
const app = new WKoa();

// app.use((ctx) => {
//   ctx.body = 'Hi, WangXiang'
// })

const delay = () => new Promise(resolve => setTimeout(() => resolve(), 2000));

app.use(async (ctx, next) => {
  ctx.body = "1";
  await next();
  ctx.body += "5";
});

app.use(async (ctx, next) => {
  ctx.body += "2";
  await delay();
  await next();
  ctx.body += "4";
});

app.use(async (ctx, next) => {
  ctx.body += "3";
});

app.listen(3001, () => {
  console.log("启动成功：3001");
});
