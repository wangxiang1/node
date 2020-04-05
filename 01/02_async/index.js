const logTime = (name) => {
  console.log(`Log...${name}  ${new Date().toLocaleString()}`);
}

// 可能造成回调地狱，不优雅
exports.callback = () => {
  setTimeout(() => {
    logTime('callback 1');
    setTimeout(() => {
      logTime('callback 2')
    }, 100);
  }, 100);
}


// promise 优雅
const promise = (name, delay = 100) => new Promise((resolve) => {
  setTimeout(() => {
    logTime(name)
    resolve();
  }, delay)
})

exports.promise = () => {
  promise('Promise 1')
    .then(promise('Promise 2'))
    .then(promise('Promise 3'))
}

exports.generater = () => {
  const generator = function* (name){
    yield promise(name + 1)
    yield promise(name + 2)
    yield promise(name + 3)
  }

  let co = generator => {
    if(it = generator.next().value){
      it.then((res) => {
        co(generator)
      })
    }else{
      return
    }
  }

  co(generator('Co-Generator'))
}


exports.asyncAwait = async () => {
  await promise('Async/Await 1')
  await promise('Async/Await 2')
  await promise('Async/Await 3')
  await promise('Async/Await 4')
}

// 事件监听方式
exports.event = async () => {
  console.log('event===========================');
  const asyncFun = name => event => {
    setTimeout(() => {
      logTime(name);
      event.emit('end'); // 触发事件
    }, 100);
    return event;
  }

  const array = [
    asyncFun('event 1'),
    asyncFun('event 2'),
    asyncFun('event 3')
  ];

  // events 模块只提供了一个对象： events.EventEmitter。EventEmitter 的核心就是事件触发与事件监听器功能的封装。
  const {EventEmitter} = require('events');

  // 创建 eventEmitter 对象
  const event = new EventEmitter();

  let i = 0;
  // 监听end事件，array[i++](event)：每次触发end的时候，end的监听会响应，调用array[i++](event)，再去触发下一个
  // i = 0时 => 触发array[0](event) => i 自增 1 => settimeout 触犯end事件 => end的监听事件响应 => 此时 i = 1 => 触发array[1](event) => ... => 直到 i = 3 不再触发end事件
  event.on('end', () => i < array.length && array[i++](event))
  // 触发第一次end
  event.emit('end')
}