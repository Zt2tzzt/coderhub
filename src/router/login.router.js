const KoaRouter = require('@koa/router')
const { login, test } = require('../controller/login.controller');
const { verifyLogin, verifyAuth } = require('../middleware/login.middleware')

const loginRouter = new KoaRouter({ prefix: '/login' })

loginRouter.post('/', verifyLogin, login)
loginRouter.get('/test-auth', verifyAuth, test)

module.exports = loginRouter
