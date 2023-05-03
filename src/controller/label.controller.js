const labelService = require('../service/label.service')

class LabelController {
  /**
   * @description: 此中间件用于：创建标签
   * @Author: ZeT1an
   * @param {*} ctx koa ctx
   * @param {*} next koa next
   * @return {*}
   */
  async create(ctx, next) {
    // 1.获取标签名称
    const { name } = ctx.request.body;
    // 2.操作数据库存储
    const result = await labelService.create(name)

    ctx.body = {
      code: 1,
      msg: '创建标签成功~',
      data: result
    }
  }

  /**
   * @description: 此中间件用于：查询标签列表
   * @Author: ZeT1an
   * @param {*} ctx koa ctx
   * @param {*} next koa next
   * @return {*}
   */
  async list(ctx, next) {
    // 1.获取 offset 和 limit
    const { offset = 0, limit = 10 } = ctx.query;
    // 2.从数据库中，查询动态列表
    const result = await labelService.queryList(offset, limit)

    ctx.body = {
      code: 1,
      msg: '查询标签列表成功~',
      data: result
    }
  }
}

module.exports = new LabelController()