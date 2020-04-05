module.exports = async (ctx, next) => {
  console.log('LOGGER:',ctx.method + '   '+ ctx.path);
  const start = new Date();
  await next();
  const duration = new Date() - start;
  console.log('LOGGER:', ctx.method + '  ' + ctx.path + '  '+ ctx.status + '  '+ duration + 'ms');
}