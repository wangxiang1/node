const fs = require('fs');
const handlebars = require('handlebars');// Handlebars 是 JavaScript 一个语义模板库，通过对view和data的分离来快速构建Web模板。
const chalk = require('chalk');

module.exports = async () => {

  // 获取页面列表
  const list = 
  fs.readdirSync('./src/views')
    .filter(v => v !== 'Home.vue')
    .map(v => ({
      name: v.replace('.vue', '').toLowerCase(),
      file: v
    }));
  
  // 生成路由定义
  compile({list}, './src/router.js', './template/router.js.hbs')
  // 生成菜单  
  compile({list}, './src/App.vue', './template/App.vue.hbs')

  /**
   * 编译模板文件
   * @param {*} meta 数据定义
   * @param {*} filePath 目标文件路径
   * @param {*} templetePath 模板文件路径
   */
  function compile(meta, filePath, templetePath) {
    // 判断模板是否存在
    if (fs.existsSync(templetePath)) {
      const content = fs.readFileSync(templetePath).toString(); // 读模板
      const result = handlebars.compile(content)(meta); // 编译
      fs.writeFileSync(filePath, result); // 写入
      console.log(chalk.green(`🚀${filePath} 创建成功`));
    }
  }
}