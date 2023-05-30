const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
/* const userRouter = require('../router/user.router')
const loginRouter = require('../router/login.router') */
const registerRouters = require('../router')
const registerCmsRouters = require('../cms/router')

// 创建 Koa 服务器
const app = new Koa()

// 注册路由
app.use(bodyParser())
/* app.use(userRouter.routes())
app.use(userRouter.allowedMethods())
app.use(loginRouter.routes())
app.use(loginRouter.allowedMethods()) */
registerRouters(app)
registerCmsRouters(app)

// 将 app 导出
module.exports = app
