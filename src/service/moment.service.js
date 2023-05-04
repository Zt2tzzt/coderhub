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
        JSON_OBJECT(
          'id', u.id,
          'name', u.name,
          'avatarUrl', u.avatar_url,
          'createTime', u.createAt,
          'updateTime', u.updateAt
        ) \`user\`,
        ( SELECT
            COUNT(*)
          FROM comment c
          WHERE c.moment_id = m.id
        ) commentCount,
        ( SELECT
            COUNT(*)
          FROM moment_label ml
          WHERE ml.moment_id = m.id
        ) labelCount
      FROM
        moment m
        LEFT JOIN \`user\` u ON u.id = m.user_id 
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
        JSON_OBJECT( 'id', u.id, 'name', u.name, 'createTime', u.createAt, 'updateTime', u.updateAt, 'avatarUrl', u.avatar_url ) \`user\`,
        (SELECT
          JSON_ARRAYAGG(
            JSON_OBJECT(
              'id',
              c.id,
              'content',
              c.content,
              'commentId',
              c.comment_id,
              'user',
              JSON_OBJECT( 'id', cu.id, 'name', cu.name, 'avatarUrl', u.avatar_url) 
            )) 
        FROM
          \`comment\` c
          LEFT JOIN \`user\` cu ON c.user_id = cu.id 
        WHERE
          c.moment_id = m.id 
        ) comments,
        (JSON_ARRAYAGG( JSON_OBJECT( 'id', l.id, 'name', l.NAME )) ) labels 
        
      FROM
        moment m
        LEFT JOIN \`user\` u ON u.id = m.user_id 
        LEFT JOIN moment_label ml ON ml.moment_id = m.id
        LEFT JOIN label l ON ml.label_id = l.id 
      WHERE
        m.id = ?
      GROUP BY
        m.id;
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
    const [result] = await connection.execute(statement, [content, id])
    return result
  }

  /**
   * @description: 此函数用于：根据动态 id，删除动态
   * @Author: ZeT1an
   * @param {string} id 动态 id
   * @return {object} mysql 返回的结果
   */
  async removeById(id) {
    const statement = 'DELETE FROM moment WHERE id = ?;'
    const [result] = await connection.execute(statement, [id])
    return result
  }

  /**
   * @description: 此函数用于：查询动态是否已经与标签关联
   * @Author: ZeT1an
   * @param {number} momentId 动态 id
   * @param {number} labelId 标签 id
   * @return {boolean} 动态是否已经与标签关联
   */
  async hasLabel(momentId, labelId) {
    const statement = `SELECT * FROM moment_label WHERE moment_id = ? AND label_id = ?;`
    const [result] = await connection.execute(statement, [momentId, labelId])
    return !!result.length
  }

  /**
   * @description: 此函数用于：为动态添加标签，在中间表 moment_label 中插入记录
   * @Author: ZeT1an
   * @param {*} momentId 动态 id
   * @param {*} labelId 标签 id
   * @return {object} mysql 返回结果
   */
  async addLabel(momentId, labelId) {
    const statement = `INSERT INTO moment_label (moment_id, label_id) VALUES (?, ?);`
    const [result] = await connection.execute(statement, [momentId, labelId])
    return { ...result, momentId, labelId }
  }
}

module.exports = new MomentService()
