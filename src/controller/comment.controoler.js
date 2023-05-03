const commentService = require('../service/comment.service')

class CommentController {
  /**
   * @description: 此中间件用于：发布评论
   * @Author: ZeT1an
   * @param {*} ctx koa ctx
   * @param {*} next koa next
   * @return {*}
   */
  async create(ctx, next) {
    // 1.获取 body 中的参数
    const { content, momentId } = ctx.request.body
    // 2.获取用户 id
    const { id } = ctx.user

    // 2.操作数据库，将数据库进行存储
    const result = await commentService.create(content, momentId, id)

    ctx.body = {
      code: 0,
      msg: '发表评论成功~',
      data: result
    }
  }

  /**
   * @description: 此中间件用于：回复评论
   * @Author: ZeT1an
   * @param {*} ctx koa ctx
   * @param {*} next koa next
   * @return {*}
   */
  async reply(ctx, next) {
    // 1.获取 body 中的参数
    const { content, momentId, commentId } = ctx.request.body;
    // 2.获取用户 id
    const { id } = ctx.user;

    // 3.数据库操作
    const result = await commentService.reply(content, momentId, commentId, id)

    ctx.body = {
      code: 1,
      msg: '回复评论成功~',
      data: result
    }
  }

  /**
   * @description: 此中间件用于：删除评论
   * @Author: ZeT1an
   * @param {*} ctx koa ctx
   * @param {*} next koa next
   * @return {*}
   */
  async remove(ctx, next) {
    // 1.获取评论 id
    const { commentId } = ctx.params;
    // 2.数据库操作
    const result = await commentService.remove(commentId);

    ctx.body = {
      code: 1,
      msg: '删除评论成功~',
      data: result
    }
  }
}

module.exports = new CommentController()
