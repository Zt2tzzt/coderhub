const KoaRouter = require('@koa/router')
const userController = require('../controller/user.controller')
const { verifyUser, handlePassword } = require('../middleware/user.middleware')

// 创建路由对象
const userRouter = new KoaRouter({ prefix: '/users' })

// 在路由中，注册中间件
userRouter.post('/', verifyUser, handlePassword, userController.create)

module.exports = userRouter