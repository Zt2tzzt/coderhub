const KoaRouter = require('@koa/router')
const { verifyAuth } = require('../middleware/login.middleware')
const { create, list } = require('../controller/label.controller')

const labelRouter = new KoaRouter({ prefix: '/label' })

// 1.增：创建标签
labelRouter.post('/', verifyAuth, create)
// 2.查：查询标签列表
labelRouter.get('/', list)

module.exports = labelRouter
