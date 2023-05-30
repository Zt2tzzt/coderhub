const KoaRouter = require('@koa/router')
const { verifyAuth } = require('../../middleware/login.middleware');
const { create, remove, update, list, detail, assignMenu } = require('../controller/role.controller');

const roleRouter = new KoaRouter({ prefix: '/role' })

// 增：新增角色
roleRouter.post('/', verifyAuth, create)
// 删：根据 id，删除角色
roleRouter.delete('/:roleId', verifyAuth, remove)
// 改，根据 id，修改角色
roleRouter.patch('/:roleId', verifyAuth, update)
// 查，查询角色列表
roleRouter.get('/', verifyAuth, list)
// 查，根据 id，查询角色
roleRouter.get('/:roleId', verifyAuth, detail)

// 给角色分配权限
roleRouter.post('/:roleId/menu', verifyAuth, assignMenu)

module.exports = roleRouter