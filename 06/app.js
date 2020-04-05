const Koa = require('koa');
const app = new Koa();
const session = require('koa-session');

app.keys = ['some secert'];

// SESSION配置
const SESS_CONFIG = {
  key: 'kkb:sess',
  maxAge: 86400000, //session有效期
  httpOnly: true, // 仅能服务端修改
  signed: true, // 签名，防篡改
}

// 注册
app.use(session(SESS_CONFIG, app));

app.use(ctx => {
  // console.log('session:', ctx.session);
  if(ctx.path === '/favicon.ico') return
  // 获取
  let n =  ctx.session.count || 0;

  // 设置
  ctx.session.count = ++n;
  ctx.body = `第${n}次访问`
}).listen(3000)