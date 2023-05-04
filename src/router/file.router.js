const KoaRouter = require('@koa/router')
const { verifyAuth } = require('../middleware/login.middleware')
const { handleAvatar } = require('../middleware/file.middleware')
const { create } = require('../controller/file.controller')

const fileRouter = new KoaRouter({ prefix: '/file' })

// 增：插入头像，更新用户头像 url
fileRouter.post('/avatar', verifyAuth, handleAvatar, create)

module.exports = fileRouter
