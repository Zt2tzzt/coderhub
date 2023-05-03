const pwermissionService = require('../service/permission.service');
const { OPERATION_IS_NOT_ALLOWED } = require('../config/error');

/**
 * @description: 此中间件用于：验证用户是否有操作数据库表中，某一条记录的权限。
 * @Author: ZeT1an
 * @param {*} ctx koa ctx
 * @param {*} next koa next
 * @return {*}
 */
const verifyPermission = async (ctx, next) => {
  // 1.获取登录用户的 id
  const userId = ctx.user.id;

  /**
   * 2.获取资源（表名）的 name/id，比如：
   * - 要求动态路由，第一个 param，必须是 xxxId，其中 "xxx" 必须是数据库中的表名。
   * - 比如 momentId
   */
  const keyName = Object.keys(ctx.params)[0]
  const resourceId = ctx.params[keyName]
  const resourceName = keyName.replace('Id', '')

  // 2.查询 user 是否有修改 resource 的权限
  const isPermission = await pwermissionService.checkResource(resourceName, resourceId, userId)
  if (!isPermission) {
    return ctx.app.emit('error', OPERATION_IS_NOT_ALLOWED, ctx)
  }

  await next()
}

module.exports = {
  verifyPermission
}