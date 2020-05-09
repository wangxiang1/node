const {Service} = require('egg');

class UserService extends Service{

  /**
   * @description 创建用户
   * @param {*} payload
   * @returns
   * @memberof UserService
   */
  async create(payload){
    const {ctx} = this;
    payload.password = await ctx.genHash(payload.password);
    return ctx.model.User.create(payload);
  }

  /**
   * 删除多个用户
   * @param {*} payload 
   */
  async removes(payload) {
    return this.ctx.model.User.remove({ _id: { $in: payload } })
  }

  /**
   * 根据手机号查找
   * @param {*} mobile 
   */
  async findByMobile(mobile) {
    return this.ctx.model.User.findOne({mobile: mobile})
  }

  /**
   * 查找用户
   * @param {*} id 
   */
  async find(id) {
    return this.ctx.model.User.findById(id)
  }
}

module.exports = UserService;