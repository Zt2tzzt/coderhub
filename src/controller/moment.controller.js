const momentService = require('../service/moment.service')

class MomentController {
  /**
   * @description: 此中间件用于：发布动态
   * @Author: ZeT1an
   * @param {*} ctx koa ctx
   * @param {*} mext koa next
   * @return {void}
   */
  async create(ctx, mext) {
    // 1.获取动态内容
    const { content } = ctx.request.body

    // 2.获取用户信息
    const { id } = ctx.user

    // 3.将动态相关的数据，保存到数据库
    const result = await momentService.create(content, id)

    ctx.body = {
      code: 1,
      msg: '动态发布成功~',
      data: result
    }
  }

  /**
   * @description: 此函数用于：查询动态列表
   * @Author: ZeT1an
   * @param {*} ctx koa ctx
   * @param {*} next koa next
   * @return {void}
   */
  async list(ctx, next) {
    // 获取分页参数
    const { offset, limit } = ctx.query

    // 从数据库中，查询动态列表
    const result = await momentService.querylist(offset, limit)

    ctx.body = {
      code: 1,
      msg: '查询动态列表成功~',
      data: result
    }
  }

  /**
   * @description: 此中间件用于：查询动态详情
   * @Author: ZeT1an
   * @param {*} ctx koa ctx
   * @param {*} next koa next
   * @return {void}
   */
  async detail(ctx, next) {
    // 1.获取动态的 id
    const { momentId } = ctx.params

    // 2.根据 id，查询动态详情
    const result = await momentService.queryById(momentId)

    ctx.body = {
      code: 1,
      msg: '查询动态详情成功~',
      data: result[0]
    }
  }

  /**
   * @description: 此中间件用于：更新动态
   * @Author: ZeT1an
   * @param {*} ctx koa ctx
   * @param {*} next koa next
   * @return {*}
   */
  async updata(ctx, next) {
    // 1.获取动态 id
    const { momentId } = ctx.params
    // 2.获取要修改的内容
    const { content } = ctx.request.body
    // 3.执行数据库操作
    const result = await momentService.updateById(content, momentId)

    ctx.body = {
      code: 1,
      msg: '修改动态成功~',
      data: result
    }
  }

  /**
   * @description: 此中间件用于：删除动态
   * @Author: ZeT1an
   * @param {*} ctx koa ctx
   * @param {*} next koa next
   * @return {*}
   */
  async remove(ctx, next) {
    // 1.获取动态 id
    const { momentId } = ctx.params

    // 2.执行数据库操作
    const result = await momentService.removeById(momentId)

    ctx.body = {
      code: 1,
      msg: '删除动态成功~',
      data: result
    }
  }

  /**
   * @description: 此函数用于：为已存在的动态，添加标签
   * @Author: ZeT1an
   * @param {*} ctx koa ctx
   * @param {*} next koa next
   * @return {*}
   */
  async addLabels(ctx, next) {
    // 1.获取 labels, momentId
    const { preparedLabels, newLabels } = ctx
    const { momentId } = ctx.params

    // 2.在中间表 moment_label 插入记录
    try {
      // 判断 label_id 是否已经和 moment_id 在中间表中关联。
      const promises = preparedLabels.map(labelObj =>
        momentService.hasLabel(momentId, labelObj.id).then(res => {
          if (!res) {
            return momentService.addLabel(momentId, labelObj.id)
          }
        })
      )
      const result = await Promise.all(promises)

      ctx.body = {
        code: 1,
        msg: '已为动态新增标签，data 中是新增的标签~',
        data: {
          newLabels,
          newRelation: result.filter(res => !!res)
        }
      }
    } catch (err) {
      ctx.body = {
        code: -3001,
        msg: '为动态添加标签失败~',
        err
      }
    }
  }
}

module.exports = new MomentController()
