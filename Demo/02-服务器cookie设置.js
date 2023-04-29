const Koa = require('koa')
const KoaRouter = require('@koa/router')

// 创建 Koa 服务器
const app = new Koa()

// 创建路由对象
const userRouter = new KoaRouter({ prefix: '/users' })

// 在路由中，注册中间件
userRouter.get('/login', (ctx, next) => {
  // 在服务器中，为浏览器设置 cookie
  ctx.cookies.set('slogan', 'Never Mind the Scandal and Libel', {
    maxAge: 60 * 1000 * 5
  })

  ctx.body = '登录成功~'
})

userRouter.get('/list', (ctx, next) => {
  // 验证用户的登录凭证，即 cookie
  const value = ctx.cookies.get('slogan')
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
