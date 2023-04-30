const fs = require('fs')
const Koa = require('koa')
const KoaRouter = require('@koa/router')
const jwt = require('jsonwebtoken')

// 创建 Koa 服务器
const app = new Koa()

// 创建路由对象
const userRouter = new KoaRouter({ prefix: '/users' })

// 读取公钥和私钥
const privateKey = fs.readFileSync('./keys/private.key')
const publicKey = fs.readFileSync('./keys/public.key')

// 在路由中，注册中间件
userRouter.get('/login', (ctx, next) => {
  // 1.颁发 token
  const payload = { id: 111, name: 'zzt' }
  // jwt.sign 支持传 buffer 类型
  const token = jwt.sign(payload, privateKey, {
    expiresIn: 60,
    algorithm: 'RS256'
  })

  ctx.body = {
    code: 0,
    token,
    msg: '登陆成功~'
  }
})

userRouter.get('/list', (ctx, next) => {
  // 1.获取客户端的 token
  const authorization = ctx.header.authorization
  const token = authorization.replace('Bearer ', '')
  console.log('token:', token)

  // 2.验证 token
  try {
    const result = jwt.verify(token, publicKey, {
      algorithms: ['RS256']
    })
    console.log('result:', result)

    ctx.body = {
      code: 0,
      data: [
        { id: 111, name: 'zzt' },
        { id: 112, name: 'kobe' },
        { id: 113, name: 'messi' },
      ]
    }
  } catch (err) {
    console.log('err:', err)
    ctx.body = {
      code: -1010,
      msg: 'token 过期或无效~'
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
