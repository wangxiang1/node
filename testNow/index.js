const path = require('path')
const fs = require('fs')

module.exports = class TestNow{

  /**
   * 生成方法的测试代码
   * @param {*} methodName 方法名
   * @param {*} classFile require路径
   * @param {*} isClass 是否为class
   */
  getTestSource(methodName, classFile, isClass = false){
    console.log('getTestSource:', methodName, classFile, isClass);
    return `
test('${'TEST ' + methodName }', () => {
  const ${isClass ? '{' + methodName + '}' : methodName} = require('${'../' + classFile}');
  const ret = ${methodName}();
});
`
  }

  /**
   * 生成方法名
   * @param {*} filename 代码文件名
   */
  getTestFileName(filename){
    // 将文件名拆开
    // 目录名
    const dirName = path.dirname(filename);
    // 文件名
    const baseName = path.basename(filename);
    // 拓展名 .js
    const extName = path.extname(filename);
    const testName = baseName.replace(extName, `.spec${extName}`)
    console.log('dirname=',dirName, 'extName=',extName, 'testName=', testName);

    // 路径组装
    return path.format({
      root: dirName + '/__test__/',
      base: testName
    })
  }

  // path()：执行的时候的默认文件夹
  getJestSource(sourcePath = path.resolve('./')){
    console.log('getJestSource:', sourcePath);
    const testPath = `${sourcePath}/__test__`; // 测试代码文件夹
    if (!fs.existsSync(testPath)) { // 判断测试代码文件夹是否存在,不存在，则创建
      fs.mkdirSync(testPath);
    }

    // 遍历代码文件
    let list = fs.readdirSync(sourcePath);

    list
      .map(v => `${sourcePath}/${v}`) // 添加完整路径
      .filter(v => fs.statSync(v).isFile()) // 过滤文件；statSync 判断是不是文件或者文件夹
      .filter(v => v.indexOf('.spec') === -1) // 排除测试代码
      .map(v => this.genTestFile(v))
  }

  genTestFile(filename){
    console.log('filename:',filename);
    const testFileName = this.getTestFileName(filename);

    // 判断此文件是否存在
    if (fs.existsSync(testFileName)) {
      console.log('该测试代码已存在：', testFileName);
      return
    }

    const mod = require(filename)
    let source 
    if (typeof mod === 'object') {
      source = Object.keys(mod)
        .map(v => this.getTestSource(v, path.basename(filename), true))
        .join('\n');
    }else if(typeof mod === 'function'){
      const basename = path.basename(filename);
      source = this.getTestSource(basename.replace('.js', ''), basename)
    }

    console.log('source======', source);
    console.log('testFileName:', testFileName);

    fs.writeFileSync(testFileName, source); // 写入文件
  }
}
