const add = (x, y) => x + y;
const square = z => z * z;

// const fn = (x, y) => square(add(x, y));

// 聚合函数
// const compose = (fn1, fn2) => (...args) => fn2(fn1(...args));

// const fn = compose(add, square)

// 多个函数聚合
// const fn = compose(add, square, square);
const compose = (...[first, ...other]) => (...args) => {
  let ret = first(...args);

  other.forEach(fn => {
    ret = fn(ret)
  })

  return ret;
}

const fn = compose(add, square, square);

console.log(fn(1,2));