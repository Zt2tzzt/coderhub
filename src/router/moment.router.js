const KoaRouter = require('@koa/router')
const { verifyAuth } = require('../middleware/login.middleware')
const {
  create,
  list,
  detail,
  updata,
  remove,
  addLabels
} = require('../controller/moment.controller')
const { verifyPermission } = require('../middleware/permission.middleware')
const { verifyLabelExist } = require('../middleware/label.middleware')

const momentRouter = new KoaRouter({ prefix: '/moment' })

// 1.增：发布动态
momentRouter.post('/', verifyAuth, create)
// 2.查：查询动态列表
momentRouter.get('/', list)
// 3.查：查询动态详情
momentRouter.get('/:momentId', detail)
// 4.改：修改动态
momentRouter.patch('/:momentId', verifyAuth, verifyPermission, updata)
// 5.删：删除动态
momentRouter.delete('/:momentId', verifyAuth, verifyPermission, remove)

// 6.增：为已存在的动态，添加标签
/**
 * 1. 验证用户令牌（已完成）；
 * 2. 验证用户是否有操作这个动态的权限（已完成）。
 * 3. 验证标签名称，是否已经存在于 `label` 表中。
 *   - 如果存在，那么直接使用即可；
 *   - 如果不存在，那么将标签添加到 `label` 表在。
 * 4. 将标签与动态关联
 *   - 此时，所有标签，都在 label 表中；
 *   - 将动态 id 和标签 id，添加到关系表中。
 */
momentRouter.post('/:momentId/labels', verifyAuth, verifyPermission, verifyLabelExist, addLabels)

module.exports = momentRouter
