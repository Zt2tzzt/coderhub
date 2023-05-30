const fs = require('fs')

const registerCmsRouters = app => {
  // 1.读取当前目录下的所有文件
  const files = fs.readdirSync(__dirname)

  // 2.遍历所有的文件
  files.forEach(file => {
    if (!file.endsWith('.router.js')) return

    const router = require(`./${file}`)
    app.use(router.routes())
    app.use(router.allowedMethods())
  });
}

module.exports = registerCmsRouters
