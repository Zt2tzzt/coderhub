const app = require('./app')
const { SERVER_POST } = require('./config/server');
require('./utils/handle-error')

// 开启 Koa 服务器
app.listen(SERVER_POST, () => {
  console.log('coderhub 服务器启动成功~')
})
