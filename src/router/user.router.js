const KoaRouter = require('@koa/router')
const { create, showAvatarImage } = require('../controller/user.controller')
const { verifyUser, handlePassword } = require('../middleware/user.middleware')

// 创建路由对象
const userRouter = new KoaRouter({ prefix: '/users' })

// 增：用户注册
userRouter.post('/', verifyUser, handlePassword, create)
// 查：获取用户头像
userRouter.get('/avatar/:userId', showAvatarImage)

module.exports = userRouter