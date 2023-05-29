const crypto = require('crypto')

const md5password = pwd => {
  const md5 = crypto.createHash('md5')
  // 使用 md5 加密，并转成十六进制的形式。
  const md5pwd = md5.update(pwd).digest('hex')
  return md5pwd
}

module.exports = md5password
