const Koa = require('koa')
const KoaRouter = require('@koa/router')
const jwt = require('jsonwebtoken')

// 创建 Koa 服务器
const app = new Koa()

// 创建路由对象
const userRouter = new KoaRouter({ prefix: '/users' })

const secretKey = 'aaabbbcccxxx'

// 在路由中，注册中间件
userRouter.get('/login', (ctx, next) => {
  // 1.颁发 token
  const payload = { id: 111, name: 'zzt' }
  const token = jwt.sign(payload, secretKey, {
    expiresIn: 60 // 单位：秒
  })

  ctx.body = {
    code: 0,
    token,
    msg: '登录成功~'
  }
})

userRouter.get('/list', (ctx, next) => {
  // 1.获取客户端携带过来的 token
  const authorization = ctx.headers.authorization
  const token = authorization.replace('Bearer ', '')
  console.log('token:', token)

  // 2.验证 token
  try {
    const result = jwt.verify(token, secretKey)
    console.log('result:', result)
    // result: { id: 111, name: 'zzt', iat: 1682824424, exp: 1682824484 }

    ctx.body = {
      code: 0,
      data: [
        { id: 111, name: 'zzt' },
        { id: 112, name: 'kobe' },
        { id: 113, name: 'lilei' }
      ]
    }
  } catch (err) {
    console.log('err:', err)
    ctx.body = {
      code: -1010,
      msg: 'token 过期或者无效~'
    }
  }

})

// 注册路由
app.use(userRouter.routes())
app.use(userRouter.allowedMethods())


// 开启 Koa 服务器
app.listen(9000, () => {
  console.log('koa 服务器启动成功~')
})
