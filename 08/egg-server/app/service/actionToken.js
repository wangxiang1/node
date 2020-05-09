const {Service} = require('egg');

class ActionTokenService extends Service{
  async apply(_id){
    console.log(this.ctx.app);
    return this.ctx.app.jwt.sign({
      data:{
        _id
      }, 
      exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7) // 7天有效期
    }, this.ctx.app.config.jwt.secret);
  }
}

module.exports = ActionTokenService;