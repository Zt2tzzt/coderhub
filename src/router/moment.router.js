const KoaRouter = require('@koa/router')
const { verifyAuth } = require('../middleware/login.middleware')
const momentController = require('../controller/moment.controller');
const { verifyPermission } = require('../middleware/permission.middleware');
const momentService = require('../service/moment.service');

const momentRouter = new KoaRouter({ prefix: '/moment' })

// 1.增：发布动态
momentRouter.post('/', verifyAuth, momentController.create)
// 2.查：查询动态列表
momentRouter.get('/', momentController.list)
// 3.查：查询动态详情
momentRouter.get('/:momentId', momentController.detail)
// 4.改：修改动态
momentRouter.patch('/:momentId', verifyAuth, verifyPermission, momentController.updata)
// 5.删：删除动态
momentRouter.delete('/:momentId', verifyAuth, verifyPermission, momentController.remove)

module.exports = momentRouter