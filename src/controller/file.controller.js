const fileService = require('../service/file.service')
const { SERVER_PORT, SERVER_HOST } = require('../config/server')
const userService = require('../service/user.service')

class FileController {
  /**
   * @description: 此函数用于：将头像信息保存到 avatar 表中；将头像 url 更新到 user 表的 avatar_url 字段。
   * @Author: ZeT1an
   * @param {*} ctx koa ctx
   * @param {*} next koa next
   * @return {*}
   */
  async create(ctx, next) {
    // 1.获取文件信息
    console.log('file:', ctx.request.file)
    const { filename, mimetype, size } = ctx.request.file
    const { id } = ctx.user

    // 2.将头像信息，存储到数据库中
    await fileService.create(filename, mimetype, size, id)

    // 3.将头像的 url，保存到 user 表中（更新 user 表）
    const avatarUrl = `${SERVER_HOST}:${SERVER_PORT}/users/avatar/${id}`
    await userService.updateUserAvatar(avatarUrl, id)

    ctx.body = {
      code: 1,
      msg: '头像上传成功~',
      data: avatarUrl
    }
  }
}

module.exports = new FileController()
