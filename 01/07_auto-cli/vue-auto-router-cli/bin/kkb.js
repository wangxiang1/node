#!/usr/bin/env node
const program = require('commander'); // Commander.js 是 一个帮助快速开发Nodejs命令行工具的package
program.version(require('../package').version)
// 定义命令 
program
  .command('init <name>')
  .description('init project')
  .action(require('../lib/init'))

program
  .command('refresh')
  .description('refresh project')
  .action(require('../lib/refresh'))

// process 对象是一个全局变量，它提供当前 Node.js 进程的有关信息，以及控制当前 Node.js 进程
// process.argv 属性返回一个数组，这个数组包含了启动Node.js进程时的命令行参数
program.parse(process.argv)