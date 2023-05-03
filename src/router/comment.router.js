const KoaRouter = require('@koa/router')
const commentControoler = require('../controller/comment.controoler')
const { verifyAuth } = require('../middleware/login.middleware')
const { verifyPermission } = require('../middleware/permission.middleware');

const commentRouter = new KoaRouter({ prefix: '/comment' })

// 1.增：发布评论
commentRouter.post('/', verifyAuth, commentControoler.create)
// 2.增：回复评论
commentRouter.post('/reply', verifyAuth, commentControoler.reply)
// 3.删：删除评论
commentRouter.delete('/:commentId', verifyAuth, verifyPermission, commentControoler.remove)

module.exports = commentRouter
