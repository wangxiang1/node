const {Controller} = require('egg');

/**
 * @Controller 用户管理
 */
class UserController extends Controller{
  constructor(ctx){
    super(ctx)
  }

  /**
   * @summary 获取用户
   * @description 获取用户信息
   * @router get /api/user
   */
  async getUser(){
    const {ctx} = this;
    ctx.body = '123333'
  }

  /**
   * @summary 创建用户
   * @description 创建用户，记录用户账户、密码、类型
   * @router post /api/user
   * @request body createUserRequest *body
   * @response 200 baseResponse 创建成功
   */
  async create(){
    const {ctx} = this;
    // 校验参数
    ctx.validate(ctx.rule.createUserRequest);
    // 组装payload
    const payload = ctx.request.body || {};
    // 调用service
    const res = await ctx.service.user.create(payload);
    ctx.helper.success({ctx, res})
  }
}

module.exports = UserController;