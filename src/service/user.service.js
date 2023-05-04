const connection = require('../app/database')

class UserService {
  /**
   * @description: 此函数用于：将用户记录，插入 user 表中。
   * @Author: ZeT1an
   * @param {object} user 用户信息
   * @return {object} mysql 返回的结果
   */
  async create(user) {
    // 1.获取用户 user
    const { name, password } = user

    // 2.拼接 statement
    const statement = 'INSERT INTO `user` (name, password) VALUES (?, ?);'

    // 3.执行 sql 语句
    const [result] = await connection.execute(statement, [name, password])

    return result
  }

  /**
   * @description: 此函数用于：根据用户名，查询用户
   * @Author: ZeT1an
   * @param {string} name 用户名
   * @return {object} mysql 返回结果
   */
  async findUserByName(name) {
    const statement = 'SELECT * FROM `user` WHERE name = ?;'
    const [values] = await connection.execute(statement, [name])

    return values
  }

  /**
   * @description: 此函数用于：根据用户 id，更新 user 表中的 avatar_url 字段
   * @Author: ZeT1an
   * @param {string} avatarUrl 用户头像 url
   * @param {number} userId 用户 id
   * @return {object} mysql 返回结果
   */
  async updateUserAvatar(avatarUrl, userId) {
    const statement = `UPDATE user SET avatar_url = ? WHERE id = ?;`
    const [result] = await connection.execute(statement, [avatarUrl, userId]);

    return result
  }
}

module.exports = new UserService()
