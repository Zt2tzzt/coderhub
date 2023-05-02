const connection = require('../app/database')

class PermissionService {
  /**
   * @description: 此函数用于：检查用户是否拥有某条记录的修改权限
   * @Author: ZeT1an
   * @param {string} resourceName 记录的表名
   * @param {string} resourceId 记录 id
   * @param {number} userId 用户 id
   * @return {boolean} 用户是否拥有某条记录的修改权限
   */
  async checkResource(resourceName, resourceId, userId) {
    const statement = `SELECT * FROM ${resourceName} WHERE id = ? AND user_id = ?;`
    const [result] = await connection.execute(statement, [resourceId, userId]);
    return !!result.length
  }
}

module.exports = new PermissionService()