const connection = require('../app/database')

class CommentService {
  /**
   * @description: 此函数用于：将评论插入到 comment 表中。
   * @Author: ZeT1an
   * @param {string} comment 评论内容
   * @param {number} momentId 关联的动态 id
   * @param {number} userId 评论的用户 id
   * @return {object} mysql 返回的结果
   */
  async create(comment, momentId, userId) {
    const statement = 'INSERT INTO comment (content, moment_id, user_id) VALUES (?, ?, ?);'
    const [result] = await connection.execute(statement, [comment, momentId, userId])
    return result
  }

  /**
   * @description: 此函数用于：将回复评论的评论，插入到 comment 表中
   * @Author: ZeT1an
   * @param {*} content 评论内容
   * @param {*} momentId 关联的动态 id
   * @param {*} commentId 回复的评论 id
   * @param {*} userId 用户 id
   * @return {object} mysql 返回的结果
   */
  async reply(content, momentId, commentId, userId) {
    const statement = 'INSERT INTO comment (content, moment_id, comment_id, user_id) VALUES (?, ?, ?, ?);';
    const [result] = await connection.execute(statement, [content, momentId, commentId, userId]);
    return result
  }

  /**
   * @description: 此函数用于：删除评论
   * @Author: ZeT1an
   * @param {number} id 评论 id
   * @return {object} mysql 返回的结果
   */
  async remove(id) {
    const statement = "DELETE FROM comment WHERE id = ?;"
    const [result] = await connection.execute(statement, [id]);
    return result
  }
}

module.exports = new CommentService()
