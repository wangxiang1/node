import { middlewares } from './../../../../kaikeba-code-master/node/09/ts-server/src/utils/decors';
import * as glob from 'glob';
import * as Koa from 'koa';
import * as KoaRouter from 'koa-router';

type HTTPMethod = 'get' | 'put' | 'del' | 'post' | 'patch'

type LoadOptions = {
    extname?: string
}

type RouteOptions = {
    prefix?: string; //  通用前缀
    middlewares?: Array<Koa.Middleware>
}

const router = new KoaRouter();
// router['get'](url, mid)

const decorate = (method: HTTPMethod, path: string, options: RouteOptions = {}, router: KoaRouter) => {
  return (target, property, descriptor) => {
    // 添加中间件数组
    const middlewares = [];
    if(options.middlewares){
      middlewares.push(...options.middlewares);
    }

    middlewares.push(target[property])
    
    console.log('target============', property, middlewares);
    const url = options && options.prefix ? options.prefix + path : path;
    router[method](url, ...middlewares);
  }
} 

export const method = method => (path: string, options?: RouteOptions) => decorate(method, path, options, router)
export const get = method('get');
export const post = method('post');

export const loader = (folder: string, options: LoadOptions = {}): KoaRouter => {
  console.log('loader==============');
  const extname = options.extname || '.{js,ts}';
  // 文件被引入后，所有class都会被加载，class里的方法的装饰器都会执行，router得到了注册
  glob.sync(require('path').join(folder, `./**/*${extname}`)).forEach(item => require(item));
  console.log('loader==============', router.routes());
  return router;
}
