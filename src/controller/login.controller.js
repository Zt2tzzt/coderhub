const { PRIVATE_KEY } = require('../config/secret')
const jwt = require('jsonwebtoken')

class LoginController {
  /**
   * @description: 此中间件用于：用户登录，颁发令牌。
   * @Author: ZeT1an
   * @param {*} ctx koa ctx
   * @param {*} next koa next
   * @return {*}
   */
  login(ctx, next) {
    // 1.获取用户信息
    const { id, name } = ctx.user

    // 2.颁发令牌
    const token = jwt.sign({ id, name }, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24,
      algorithm: 'RS256'
    })

    // 3.返回用户信息
    ctx.body = { code: 1, data: { id, name, token } }
  }

  test(ctx, next) {
    ctx.body = '验证身份通过~'
  }
}

module.exports = new LoginController()
