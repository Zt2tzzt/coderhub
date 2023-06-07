const menuService = require('../service/menu.service');

class MenuController {
  /**
   * @description: 此函数用于：
   * @Author: ZeT1an
   * @param {*} ctx
   * @param {*} next
   * @return {*}
   */
  async create(ctx, next) {
    const menu = ctx.request.body
    const result = await menuService.create(menu)

    ctx.body = {
      code: 0,
      msg: '创建菜单成功~',
      data: result
    }
  }

  /**
   * @description: 此函数用于：
   * @Author: ZeT1an
   * @param {*} ctx
   * @param {*} next
   * @return {*}
   */
  async list(ctx, next) {
    const result = await menuService.wholeMenu()
    
    ctx.body = {
      code: 1,
      msg: '获取完整菜单成功~',
      data: result
    }
  }
}

module.exports = new MenuController()