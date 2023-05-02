const userService = require('../service/user.service')

class UserController {
  /**
   * @description: 此中间件用于：用户注册
   * @Author: ZeT1an
   * @param {*} ctx koa ctx
   * @param {*} next koa next
   * @return {*}
   */
  async create(ctx, next) {
    // 1.获取用户传递过来的信息
    const user = ctx.request.body

    // 2.将用户信息存储到数据库中
    const result = await userService.create(user)

    // 3.返回响应结果
    ctx.body = {
      msg: '创建用户成功~',
      data: result
    }
  }
}

module.exports = new UserController()
