const labelService = require('../service/label.service')

/**
 * @description: 此中间件用于：验证标签是否存在，不存在则在 label 表中，插入标签记录，并获取标签 id；存在则获取标签 id
 * @Author: ZeT1an
 * @param {*} ctx koa ctx
 * @param {*} next koa next
 * @return {*}
 */
const verifyLabelExist = async (ctx, next) => {
  // 1.获取客户端传递过来的所有 labels
  const { labels } = ctx.request.body;

  const promises = labels.map(label => {
    return labelService.queryLabelByName(label).then(res => {
      if (res) {
        return {
          isNew: false, // 不是新增的标签
          id: res.id,
          name: label
        }
      } else {
        return labelService.create(label).then(res => {
          return {
            isNew: true, // 是新增的标签
            id: res.insertId,
            name: label
          }
        })
      }
    })
  });

  const preparedLabels = await Promise.all(promises)
  const nweLabels = preparedLabels.filter(label => label.isNew)

  console.log('preparedLabels:', preparedLabels)
  ctx.preparedLabels = preparedLabels
  ctx.nweLabels = nweLabels

  await next()
}

module.exports = {
  verifyLabelExist
}