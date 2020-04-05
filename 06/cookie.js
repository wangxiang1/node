const http = require('http');
const session = {};
http.createServer((req, res) => {
  if (req.url === 'favicon.ico') {
    res.end('');
    return;
  }
  console.log(req.headers.cookie);

  // 设置cookie
  // res.setHeader('Set-Cookie','cookie1=joisdfnoiagn');
  // res.end('Hello Cookie')

  const sessionKey = 'sid';
  const cookie = req.headers.cookie;
  console.log('session:', session);
  if(cookie && cookie.indexOf(sessionKey) > -1){
    res.end('Come Back');
    const pattern = new RegExp(`${sessionKey}=([^;]+);?\s*`)
    const sid = pattern.exec(cookie)[1];
    console.log('session:====',sid ,session ,session[sid])
  }else{
    const sid = (Math.random() * 9999999).toFixed();
    // 设置cookie  cookie存的是key
    res.setHeader('Set-Cookie', `${sessionKey}=${sid}`);
    // session存的是value
    session[sid] = {name: 'wangxiang', age: 18};
    res.end('Hello');

  }
}).listen(3000)