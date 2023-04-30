const app = require('../app')
const {
  NAME_OR_PASSWORD_IS_REQUIRED,
  NAME_IS_ALREADY_EXIST,
  NAME_IS_NOT_EXIST,
  PASSWORD_IS_INCORRENT,
  UNAUTHORIZATION,
  INVALID_AUTHORIZATION
} = require('../config/error')

app.on('error', (err, ctx) => {
  console.log('发生错误了~')
  let code = 0
  let msg = ''

  switch (err) {
    case NAME_OR_PASSWORD_IS_REQUIRED:
      code = -1001
      msg = '用户名或密码不能为空~'
      break
    case NAME_IS_ALREADY_EXIST:
      code = -1002
      msg = '用户名已经被占用，请输入新的用户名~'
      break
    case NAME_IS_NOT_EXIST:
      code = -1003
      msg = '用户名不存在，请检查用户名~'
      break
    case PASSWORD_IS_INCORRENT:
      code = -1004
      msg = '输入的密码错误，请检查密码~'
      break
    case UNAUTHORIZATION:
      code = -1005
      msg = '未授权的请求~'
      break
    case INVALID_AUTHORIZATION:
      code = -1006
      msg = '无效的授权信息~'
    default:
      break
  }

  ctx.body = { code, msg }
})
