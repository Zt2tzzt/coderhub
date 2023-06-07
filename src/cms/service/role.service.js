const connection = require('../../app/database')
const menuService = require('./menu.service')

class RoleService {
  /**
   * @description: 此函数用于：在 role 表中，插入角色记录。
   * @Author: ZeT1an
   * @param {*} role
   * @return {*}
   */
  async create(role) {
    // 编写 sql 语句
    const statement = `INSERT INTO role SET ?;`

    // 执行 sql
    const [result] = await connection.query(statement, [role]) // role 为对象，其中 key 为表中字段名，value 为要插入的值。
    return result
  }

  /**
   * @description: 此函数用于：查询 role 表中的记录
   * @Author: ZeT1an
   * @param {*} offset
   * @param {*} limit
   * @return {*}
   */
  async list(offset, limit) {
    const statement = `SELECT * FROM role LIMIT ?, ?;`
    // 使用 query 方法，要求传入的 offset, limit 必须是 number 类型。
    const [result] = await connection.query(statement, [offset, limit])
    return result
  }

  /**
   * @description: 此函数用于：为角色分配菜单权限，删除原有的记录，向 role_menu 表中插入记录。
   * @Author: ZeT1an
   * @param {*} roleId
   * @param {*} menuIds
   * @return {*}
   */
  async assignmenu(roleId, menuIds) {
    // 1.先删除之前的关系
    const deleteStatement = `DELETE FROM role_menu WHERE roleId = ?`
    await connection.query(deleteStatement, [roleId])

    // 2.差人新的值
    const insertStatement = `INSERT INTO role_menu (roleId, menuId) VALUES (?, ?);`
    for (const menuId of menuIds) {
      await connection.query(insertStatement, [roleId, menuId])
    }
  }

  /**
   * @description: 此函数用于：获取角色对应的菜单权限记录
   * @Author: ZeT1an
   * @param {*} roleId 角色 id
   * @return {Array} 菜单详情对象的数组
   */
  async getRoleMenu(roleId) {
    // 1.根据 roleId，获取所有的 menuId
    const getMenuIdsStatement = `
      SELECT rm.roleId, JSON_ARRAYAGG(rm.menuId) menuIds
      FROM role_menu rm
      WHERE rm.roleId = ?
      GROUP BY rm.roleId
    `
    const [result] = await connection.query(getMenuIdsStatement, [roleId])
    console.log('result', result)
    const menuIds = result?.[0]?.menuIds
    console.log('menuIds', menuIds)

    if (!menuIds) return []

    // 2.获取完整菜单树
    const wholeMenu = await menuService.wholeMenu()
    console.log('wholeMenu:', wholeMenu)

    // 3.从完整菜单树中，过滤 menuId，使用递归
    function filterMenu(menus) {
      const newMenu = []

      for (const item of menus) {
        if (item.children) {
          item.children = filterMenu(item.children)
        }
        if (menuIds.includes(item.id)) {
          newMenu.push(item)
        }
      }

      return newMenu
    }

    return filterMenu(wholeMenu)
  }
}

module.exports = new RoleService()
