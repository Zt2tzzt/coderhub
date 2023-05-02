const connection = require('../app/database')

class MomentService {
  /**
   * @description: 此函数用于：往数据库中，插入 moment 表的记录
   * @Author: ZeT1an
   * @param {string} content 动态内容
   * @param {number} userId 用户 id
   * @return {object} mysql 返回的结果
   */
  async create(content, userId) {
    const statement = 'INSERT INTO moment (content, user_id) VALUES (?, ?);'
    const [result] = await connection.execute(statement, [content, userId])

    return result
  }

  /**
   * @description: 此函数用于：查询动态列表
   * @Author: ZeT1an
   * @param {number} offset offset
   * @param {number} limit limit
   * @return {object} mysql 返回的结果
   */
  async querylist(offset = 0, limit = 10) {
    const statement = `
      SELECT
        m.id id,
        m.content content,
        m.createAt createTime,
        m.updateAt updateTime,
        JSON_OBJECT( 'id', u.id, 'name', u.NAME, 'createTime', u.createAt, 'updateTime', u.updateAt ) \`user\` 
      FROM
        moment m
        LEFT JOIN user u ON u.id = m.user_id 
        LIMIT ? OFFSET ?;
    `
    // const [result] = await connection.execute(statement, [String(limit), String(offset)])
    const [result] = await connection.execute(statement, [limit, offset])
    return result
  }

  /**
   * @description: 此函数用于：根据动态 id，查询动态详情。
   * @Author: ZeT1an
   * @param {number} id 动态 id
   * @return {object} mysql 返回的结果
   */
  async queryById(id) {
    const statement = `
      SELECT
        m.id id,
        m.content content,
        m.createAt createTime,
        m.updateAt updateTime,
        JSON_OBJECT( 'id', u.id, 'name', u.NAME, 'createTime', u.createAt, 'updateTime', u.updateAt ) \`user\` 
      FROM
        moment m
      LEFT JOIN \`user\` u ON u.id = m.user_id 
      WHERE m.id = ?;
    `
    const [result] = await connection.execute(statement, [id])
    return result
  }

  /**
   * @description: 此函数用于：根据动态 id，更新动态详情
   * @Author: ZeT1an
   * @param {string} content 动态内容
   * @param {string} id 动态 id
   * @return {object} mysql 返回的结果
   */
  async updateById(content, id) {
    const statement = 'UPDATE moment SET content = ? WHERE id = ?;'
    const [result] = await connection.execute(statement, [content, id]);
    return result
  }

  /**
   * @description: 此函数用于：根据动态 id，删除动态
   * @Author: ZeT1an
   * @param {string} id 动态 id
   * @return {object} mysql 返回的结果
   */
  async removeById(id) {
    const statement = "DELETE FROM moment WHERE id = ?;"
    const [result] = await connection.execute(statement, [id]);
    return result
  }
}

module.exports = new MomentService()
