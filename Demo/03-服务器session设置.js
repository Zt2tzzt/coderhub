const Koa = require('koa')
const KoaRouter = require('@koa/router')
const koaSession = require('koa-session')

// 创建 Koa 服务器
const app = new Koa()

// 创建路由对象
const userRouter = new KoaRouter({ prefix: '/users' })

const session = koaSession({
  key: 'sessionid',
  signed: true,
  maxAge: 60 * 1000 * 5,
}, app)
app.keys = ['aaa', 'bbb', 'zzt', 'kobe']
app.use(session)

// 在路由中，注册中间件
userRouter.get('/login', (ctx, next) => {
  ctx.session.slogan = 'Never Mind the Scandal and Libel'

  ctx.body = '登录成功~'
})

userRouter.get('/list', (ctx, next) => {
  // 验证用户的登录凭证，即 cookie
  const value = ctx.session.slogan
  console.log('value:', value)

  if (value === 'Never Mind the Scandal and Libel') {
    ctx.body = 'user list data~'
  } else {
    ctx.body = '没有权限访问用户列表，请先登录~'
  }
})

// 注册路由
app.use(userRouter.routes())
app.use(userRouter.allowedMethods())


// 开启 Koa 服务器
app.listen(9000, () => {
  console.log('koa 服务器启动成功~')
})
