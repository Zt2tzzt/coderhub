const userService = require('../service/user.service')
const fileService = require('../service/file.service')
const fs = require('fs')
const { UPLOAD_PATH } = require('../config/path');

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

  /**
   * @description: 此函数用于：根据用户 id，返回用户头像
   * @Author: ZeT1an
   * @param {*} ctx koa ctx
   * @param {*} next koa next
   * @return {*}
   */
  async showAvatarImage(ctx, next) {
    // 1.获取用户 id
    const { userId } = ctx.params;
    // 2.根据用户 id，获取用户头像信息
    const avatarInfo = await fileService.queryAvatarByUserId(userId)

    // 3.返回头像文件
    const { filename, mimetype } = avatarInfo;
    ctx.type = mimetype
    ctx.body = fs.createReadStream(`${UPLOAD_PATH}/${filename}`)

  }

}

module.exports = new UserController()
