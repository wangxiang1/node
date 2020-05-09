const Koa = require('koa')
const router = require('koa-router')()
const views = require('koa-views')
const chalk = require('chalk')
const log = contents => {
    console.log(chalk.red(contents))
}
const app = new Koa()

app.use(async (ctx, next) => {
  log('Hack...:' + ctx.url)
  await next()
})

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}));

const static = require('koa-static')
app.use(static(__dirname + '/views'))

router.get('/', async (ctx) => {
  // ctx.body = '1111'
  await ctx.render('index');
})

app.use(router.routes())
// app.use(router.allowedMethods())

app.listen(3001, ()=>{
  console.log('hacker is listen on 3001');
})