const Koa = require('koa')
const KoaRouter = require('@koa/router')
const static = require('koa-static')

// 创建 Koa 服务器
const app = new Koa()

app.use(static('./client'))

app.use(async (ctx, next) => {
  // 1.为简单请求，开启 CORS
  ctx.set('Access-Control-Allow-Origin', '*') // * 表示所有源
})

// 创建路由对象
const userRouter = new KoaRouter({ prefix: '/users' })

// 在路由中，注册中间件
userRouter.get('/list', (ctx, next) => {
  ctx.body = [
    { id: 111, name: 'zzt', age: 18 },
    { id: 112, name: 'kobe', age: 28 },
    { id: 113, name: 'james', age: 38 },
  ]
})

// 注册路由
app.use(userRouter.routes())
app.use(userRouter.allowedMethods())

// 开启 Koa 服务器
app.listen(8000, () => {
  console.log('koa 服务器启动成功~')
})
