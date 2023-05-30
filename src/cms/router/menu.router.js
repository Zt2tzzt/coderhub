const KoaRouter = require('@koa/router')
const { verifyAuth } = require('../../middleware/login.middleware');
const { create, list } = require('../controller/menu.controller');

const menuRouter = new KoaRouter({ prefix: '/menu' })

// 增，新增菜单
menuRouter.post('/', verifyAuth, create)
// 查，获取菜单列表
menuRouter.get('/', verifyAuth, list)

module.exports = menuRouter