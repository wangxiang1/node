function* fun() {
  console.log('one');
  yield '1'
  console.log('two');
  yield '2'
  console.log('three');
  yield ''
}

const fn = fun();

// console.log(fn.next());
// console.log(fn.next());
// console.log(fn.next());
// console.log('==================');
// console.log(fn.next());

// 迭代器 执行
for (const [key, value] of fn) {
  console.log('iterator: ',key, value);
}
