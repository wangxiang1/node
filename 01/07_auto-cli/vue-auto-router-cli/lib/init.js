const { promisify } = require('util');
// 打印欢迎页面
const figlet = promisify(require('figlet'));
const clear = require('clear');
const chalk = require('chalk');
const open = require('open');
const log = content => console.log(chalk.green(content));
const {clone} = require('./download');
module.exports = async name => {
  // 打开欢迎页面
  clear(); // 清空
  const data = await figlet('WANG XIANG HI !!!');
  log(data);

  await clone('github:su37josephxia/vue-template', name); 

  // 安装依赖  cwd：指定命令运行的目录
  log('安装依赖')
  // await spawn('cnpm', ['install'], {cwd: `../${name}`});
  log(process.platform)
  await spawn(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['install'], {
    cwd: `./${name}`
  } )
  log(`
  👌
  ===============
  安装成功
  ===============
  `)

  open('http://localhost:8080');
  
  await spawn(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['run', 'serve'], {
    cwd: `./${name}`
  } );
}

function spawn(...args) {
  const{ spawn } = require('child_process'); // 子进程 
  return new Promise(resolve => {
    const proc = spawn(...args);
    proc.stdout.pipe(process.stdout);
    proc.stderr.pipe(process.stderr);
    proc.on('close', () => {
      resolve()
    })
  })
}