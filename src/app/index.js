const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const userRouter = require('../router/user.router')

// 创建 Koa 服务器
const app = new Koa()

// 注册路由
app.use(bodyParser())
app.use(userRouter.routes())
app.use(userRouter.allowedMethods())

// 将 app 导出
module.exports = app
