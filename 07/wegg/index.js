// const app = new (require('koa'))();
// const {initRouter} = require('./wloader');
// app.use(initRouter().routes());
// app.listen(3000);

const Wegg = require('./wegg');
const app = new Wegg();
app.start(3000);