const Koa = require('koa');
const app = new Koa();
const port = 3000;

const conf = require('./conf');
const { loadModel } = require('./framework/loader');

loadModel(conf)(app);

const bodyParser = require('koa-bodyparser');
app.use(bodyParser());

const restful = require('./framework/router');
app.use(restful)

app.listen(port, () => {
  console.log('app start success');
})