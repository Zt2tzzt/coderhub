const mysql = require('mysql2')

// 1.创建连接池
const connectionPool = mysql.createPool({
  host: 'localhost',
  port: 3306,
  database: 'coderhub',
  user: 'root',
  password: '1016zetian.L.wee1219',
  connectionLimit: 5
})

// 2.获取连接是否成功
connectionPool.getConnection((err, connection) => {
  // 1.判断是否有错误信息
  if (err) {
    console.log('获取连接失败~', err)
    return
  }

  // 2.获取 connection，尝试和数据库建立一下连接
  connection.connect(err => {
    if (err) {
      console.log('连接数据库失败~', err)
    } else {
      console.log('连接数据库成功，可以操作数据库~')
    }
  })
})

// 3.获取连接池中的连接对象（promise）
const connection = connectionPool.promise()

module.exports = connection
