async function fn1(next) {
  console.log('fn1');
  await next();
  console.log('end fn1');
}

async function fn2(next) {
  console.log('fn2');
  await delay();
  await next();
  console.log('end fn2');
}

async function fn3(next) {
  console.log('fn3');
}

function delay() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, 2000);
  })
}

function compose(middlewares){
  console.log('middlewares:', middlewares);
  return function () {
    return dispatch(0);
    // 返回执行承诺
    function dispatch(i) {
      console.log(i);
      let fn = middlewares[i];
      console.log(fn);
      if (!fn) {
        return Promise.resolve();
      }

      return Promise.resolve(
        fn(
          function next() {
            const r = dispatch(i+1);
            console.log('next:', r);
            // promise完成后 再执行下一个
            return r;
          }
        )
        );
    }
  }
}

const middlewares = [fn1, fn2, fn3]
const finalFn = compose(middlewares);
finalFn();


const fnn = (value) => {
  console.log('fnnn'+value);
}

const pro = new Promise((resolve) => {
  console.log('promise resolve333')
  resolve();
})

const fnnn = () => {
  console.log('fnn==========222');
  return () => pro()
  // return () => '1111'
}

const fc = async () => {
  console.log('fc:=========111');
  await fnnn()
}

console.log('fnnn:', fc());// 函数
// console.log('pro:',pro); // promise对象
