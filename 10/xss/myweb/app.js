const express = require('express')
const app = express()
const port = 3000

app.set("engine","ejs");

app.get("/home",function(req,res){
  res.set('X-XSS-Protection', 0) // 关闭浏览器的XSS防护机制
  res.setHeader('Content-Security-Policy', "script-src 'self'; object-src 'none'") // CSP内容安全策略
  // res.set('X-FRAME-OPTIONS', 'DENY')
  res.render("index.ejs",{title:"hello", from: req.query.from}); //这里的文件路径都不用写文件夹，直接写文件，后缀注意是.ejs
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
})
