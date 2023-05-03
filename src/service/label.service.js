const connection = require("../app/database");

class LabelService {
  /**
   * @description: 此函数用于：在数据库中，插入 label 记录。
   * @Author: ZeT1an
   * @return {object} mysql 返回的结果。
   */
  async create(name) {
    const statement = 'INSERT INTO label (name) VALUES (?);';
    const [result] = await connection.execute(statement, [name])
    return result
  }

  /**
   * @description: 此函数用于：分页查询标签列表。
   * @Author: ZeT1an
   * @param {number} offset offset
   * @param {number} limit limit
   * @return {object} mysql 返回的结果。
   */
  async queryList(offset = 0, limit = 10) {
    const statement = "SELECT * FROM label LIMIT ? OFFSET ?;"
    const [result] = await connection.execute(statement, [String(limit), String(offset)]);
    return result
  }

  /**
   * @description: 此函数用于：根据、标签名称，查询标签记录
   * @Author: ZeT1an
   * @param {*} name 标签名称
   * @return {object} mysql 返回的结果
   */
  async queryLabelByName(name) {
    const statement = 'SELECT * FROM label WHERE name = ?;'
    const [result] = await connection.execute(statement, [name]);
    return result[0]
  }
}

module.exports = new LabelService()