const Koa = require('koa')
const KoaRouter = require('@koa/router')

// 创建 Koa 服务器
const app = new Koa()

// 创建路由对象
const router = new KoaRouter({ prefix: '/users' })

// 在路由中，注册中间件
router.get('/', (ctx, next) => {
  ctx.body = 'user list data~'
})

// 注册路由
app.use(router.routes())
app.use(router.allowedMethods())


// 开启 Koa 服务器
app.listen(8000, () => {
  console.log('coderhub 服务器启动成功~')
})
