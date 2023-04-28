const Koa = require('koa')
const userRouter = require('./router/user.router')

// 创建 Koa 服务器
const app = new Koa()



// 注册路由
app.use(router.routes())
app.use(router.allowedMethods())


// 开启 Koa 服务器
app.listen(8000, () => {
  console.log('coderhub 服务器启动成功~')
})
