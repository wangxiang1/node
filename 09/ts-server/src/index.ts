import * as Koa from 'koa';
import * as bodify from 'koa-body';
import * as serve from 'koa-static';
import {loader} from './utils/decors';
import { resolve } from 'path';

import { Sequelize } from 'sequelize-typescript';

const database = new Sequelize({
  port:3306,
  database:'kaikeba',
  username:'root',
  password:'root',
  dialect:'mysql',
  modelPaths: [`${__dirname}/model`],    
});

database.sync({force: true})

const app = new Koa();
app.use(serve(`${__dirname}/pulbic`));

app.use(bodify({
  multipart: true,
  strict: false, // 使用非严格模式，允许delete
}))

// app.use((ctx: Koa.Context) => {
//   ctx.body = "Hello Koa"
// })

app.use(loader(resolve(__dirname, './routes')).routes())

app.listen(3000, () => {
  console.log("启动成功");
})

// // 类装饰器
// function anotationClass(target) {
//   console.log('===== Class Anotation =====')
//   console.log('target :', target)
// }

// // 方法装饰器
// function anotationMethods (target, property, descriptor) {
//       // target 
//       console.log('===== Method Anotation ' + property + "====")
//       console.log('target:', target)
//       console.log('property:', property)
//       console.log('descriptor:', descriptor)
// }

// @anotationClass
// class Example {
//   @anotationMethods
//   instanceMember() { }

//   @anotationMethods
//   static staticMember() { }
// }

