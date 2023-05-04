const connection = require('../app/database')

class FileService {
  /**
   * @description: 此函数用于：在头像表 avatar 中，插入记录
   * @Author: ZeT1an
   * @param {string} filename 文件名
   * @param {string} mimetype 文件类型
   * @param {number} size 文件大小
   * @param {number} userId 用户 id
   * @return {*}
   */
  async create(filename, mimetype, size, userId) {
    const statement = 'INSERT INTO avatar (filename, mimetype, size, user_id) VALUES (?, ?, ?, ?);'
    const [result] = await connection.execute(statement, [filename, mimetype, size, userId])
    return result
  }

  /**
   * @description: 此函数用于：根据用户 id，获取用户头像
   * @Author: ZeT1an
   * @param {number} userId 用户 id
   * @return {object} mysql 返回的结果
   */
  async queryAvatarByUserId(userId) {
    const statement = 'SELECT * FROM avatar WHERE user_id = ?;';
    const [result] = await connection.execute(statement, [userId]);

    return result.pop()
  }
}

module.exports = new FileService()
