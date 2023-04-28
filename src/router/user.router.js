const KoaRouter = require('@koa/router')


// 创建路由对象
const userRouter = new KoaRouter({ prefix: '/users' })

// 在路由中，注册中间件
userRouter.get('/', (ctx, next) => {
  ctx.body = 'user list data~'
})

module.exports = userRouter