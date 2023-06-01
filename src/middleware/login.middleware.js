const {
  NAME_OR_PASSWORD_IS_REQUIRED,
  NAME_IS_NOT_EXIST,
  PASSWORD_IS_INCORRENT,
  UNAUTHORIZATION,
  INVALID_AUTHORIZATION
} = require('../config/error')
const userService = require('../service/user.service')
const md5password = require('../utils/md5-password')
const { PUBLIC_KEY } = require('../config/secret')
const jwt = require('jsonwebtoken')

/**
 * @description: 此中间件用于：验证用户登录时的用户名和密码
 * @Author: ZeT1an
 * @param {*} ctx koa ctx
 * @param {*} next koa next
 * @return {*}
 */
const verifyLogin = async (ctx, next) => {
  const { name, password } = ctx.request.body

  // 1.判断用户名、密码是否为空
  if (!name || !password) {
    return ctx.app.emit('error', NAME_OR_PASSWORD_IS_REQUIRED, ctx)
  }

  // 2.查询该用户是否在数据库中存在
  const users = await userService.findUserByName(name)
  const user = users[0]
  if (!user) {
    return ctx.app.emit('error', NAME_IS_NOT_EXIST, ctx)
  }

  // 3.查询数据库中，密码和用户传递的密码，是否一直
  if (user.password !== md5password(password)) {
    return ctx.app.emit('error', PASSWORD_IS_INCORRENT, ctx)
  }

  // 4.将 user 对象，保存在 ctx 中
  ctx.user = user

  next()
}

/**
 * @description: 此中间件用于：验证请求的授权（token 令牌）
 * @Author: ZeT1an
 * @param {*} ctx koa ctx
 * @param {*} next koa next
 * @return {*}
 */
const verifyAuth = async (ctx, next) => {
  // 1.获取 token 不能为空
  const authorization = ctx.headers.authorization
  if (!authorization) {
    return ctx.app.emit('error', UNAUTHORIZATION, ctx)
  }

  // 2.验证 token 是否是有效的
  const token = authorization.replace('Bearer ', '')
  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ['RS256']
    })

    // 3.将 user 信息，保存在 ctx 中
    ctx.user = result
  } catch (err) {
    console.log('err:'.err)
    return ctx.app.emit('error', INVALID_AUTHORIZATION, ctx)
  }

  await next()
}

module.exports = {
  verifyLogin,
  verifyAuth
}
