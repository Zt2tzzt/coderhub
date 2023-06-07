const roleService = require('../service/role.service')

class RoleController {
  /**
   * @description: 此函数用于：创建角色
   * @Author: ZeT1an
   * @param {*} ctx
   * @param {*} next
   * @return {*}
   */
  async create(ctx, next) {
    // 1.获取到角色的对象信息
    const role = ctx.request.body
    console.log('role:', role)

    // 2.将数据插入到数据库中。
    const result = await roleService.create(role)

    // 3.返回结果
    ctx.body = {
      code: 1,
      msg: '创建角色成功~',
      data: result
    }
  }

  async remove(ctx, next) {}

  async update(ctx, next) {}

  /**
   * @description: 此函数用于：查询角色列表
   * @Author: ZeT1an
   * @param {*} ctx
   * @param {*} next
   * @return {*}
   */
  async list(ctx, next) {
    // 1.获取角色基本信息
    const { offset = 0, limit = 10 } = ctx.query
    const result = await roleService.list(Number(offset), Number(limit))

    // 2.获取菜单信息
    for (const role of result) {
      const menu = await roleService.getRoleMenu(role.id)
      console.log('menu:', menu)
      role.menu = menu
    }

    // 3.返回响应结果
    ctx.body = {
      code: 1,
      msg: '获取角色列表成功~',
      data: result
    }
  }

  async detail(ctx, next) {}

  /**
   * @description: 此函数用于：分配角色菜单。
   * @Author: ZeT1an
   * @param {*} ctx
   * @param {*} next
   * @return {*}
   */
  async assignMenu(ctx, next) {
    // 1.获取参数
    const roleId = ctx.params.roleId
    const menuIds = ctx.request.body.menuIds
    console.log(roleId, menuIds)

    // 2.分配权限
    await roleService.assignmenu(roleId, menuIds)

    // 3.返回结果
    ctx.body = {
      code: 1,
      msg: '分配权限成功~'
    }
  }
}

module.exports = new RoleController()
