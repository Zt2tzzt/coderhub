# vue-ts-cms 后台管理系统接口

在项目中，新建 cms 文件夹，在其中，创建 router、service、controller 文件夹。

## 一、角色接口

在 postman 中，新增”角色接口“文件夹。

编写自动化注册 cms 路由的程序：

src\cms\router\index.js

```js
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
```

### 1.role router

新建 `role.router.js` 文件

src\cms\router\role.router.js

```js
const KoaRouter = require('@koa/router')
const { verifyAuth } = require('../../middleware/login.middleware');
const { create, remove, update, list, detail } = require('../controller/role.controller');

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

module.exports = roleRouter
```

### 2.role controller

新建 `role.controller.js` 文件。

src\cms\controller\role.controller.js

```js
const roleService = require('../service/role.service');

class RoleController {
  /**
   * @description: 此函数用于：创建角色
   * @Author: ZeT1an
   * @param {*} ctx
   * @param {*} next
   * @return {*}
   */
  async create(ctx, next) {
    // 1.获取到角色的对象信息
    const role = ctx.request.body
    console.log('role:', role)

    // 2.将数据插入到数据库中。
    const result = await roleService.create(role)

    // 3.返回结果
    ctx.body = {
      code: 1,
      msg: '创建角色成功~',
      data: result
    }
  }

  async remove(ctx, next) {}
  
  async update(ctx, next) {}

  /**
   * @description: 此函数用于：查询角色列表
   * @Author: ZeT1an
   * @param {*} ctx
   * @param {*} next
   * @return {*}
   */
  async list(ctx, next) {
    const { offset = 0, limit = 10 } = ctx.query;
    const result = await roleService.list(Number(offset), Number(limit))
    
    ctx.body = {
      code: 1,
      msg: '获取角色列表成功~',
      data: result
    }
  }

  async detail(ctx, next) { }
}

module.exports = new RoleController()
```

### 3.role service

在数据库中，创建表 role 表。

```mysql
CREATE TABLE IF NOT EXISTS role (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(20) NOT NULL UNIQUE,
  intro VARCHAR(200),
  createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

新建 `role.service.js` 文件。

创建角色方法编写：

插入语句的预处理形式，使用 `connection.query(statement)`，支持传入对象。

src\cms\service\role.service.js

```js
const connection = require('../../app/database')

class RoleService {
  async create(role) {
    // 编写 sql 语句
    const statement = `INSERT INTO role SET ?;`

    // 执行 sql
    const [result] = await connection.query(statement, [role]); // role 为对象，其中 key 为表中字段名，value 为要插入的值。
    return result
  }
}

module.exports = new RoleService()
```

查询角色列表方法编写：

src\cms\service\role.service.js

```js
const connection = require('../../app/database')

class RoleService {

  async list(offset, limit) {
    const statement = `SELECT * FROM role LIMIT ?, ?;`
    // 使用 query 方法，要求传入的 offset, limit 必须是 number 类型。
    const [result] = await connection.query(statement, [offset, limit]);
    return result
  }
}

module.exports = new RoleService()
```

## 二、菜单接口

在 postman 中，创建“菜单接口”文件夹；

在数据库中，创建 menu 表

```mysql
CREATE TABLE IF NOT EXISTS menu (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(20) NOT NULL,
  type TINYINT(1),
  icon VARCHAR(20) NOT NULL,
  parentId INT DEFAULT NULL,
  url VARCHAR(50) UNIQUE,
  permission VARCHAR(100) UNIQUE,
  sort INT DEFAULT 100,
  createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY(parentId) REFERENCES menu(id) ON DELETE CASCADE ON UPDATE CASCADE
);
```

在 menu 表中，插入若干记录。

### 1.menu router

创建菜单路由:

src\cms\router\menu.router.js

```js
const KoaRouter = require('@koa/router')
const { verifyAuth } = require('../../middleware/login.middleware');
const { create, list } = require('../controller/menu.controller');

const menuRouter = new KoaRouter({ prefix: '/menu' })

// 增，新增菜单
menuRouter.post('/', verifyAuth, create)
// 查，获取菜单列表
menuRouter.post('/', verifyAuth, list)

module.exports = menuRouter
```

### 2.创建菜单

#### 1.menu controller 1

编写 `menu.controller.js` 文件。

src\cms\controller\menu.controller.js

```js
const menuService = require('../service/menu.service');

class MenuController {
  /**
   * @description: 此函数用于：
   * @Author: ZeT1an
   * @param {*} ctx
   * @param {*} next
   * @return {*}
   */
  async create(ctx, next) {
    const menu = ctx.request.body
    const result = await menuService.create(menu)

    ctx.body = {
      code: 0,
      msg: '创建菜单成功~',
      data: result
    }
  }
}

module.exports = new MenuController()
```

#### 3.menu service 1

编写 `menu.service.js` 文件。

src\cms\service\menu.service.js

```js
const connection = require("../../app/database");

class MenuService {
  /**
   * @description: 此函数用于：
   * @Author: ZeT1an
   * @param {*} menu
   * @return {*}
   */
  async create(menu) {
    const statement = `INSERT INTO menu SET ?;`

    const [result] = await connection.query(statement, [menu]);
    return result
  }
}

module.exports = new MenuService()
```

### 3.查询菜单

#### 1.menu controller 2

编写 `menu.controller.js` 文件。

获取系统中完整菜单权限。

src\cms\controller\menu.controller.js

```js
async list(ctx, next) {
  const result = await menuService.wholeMenu()
  
  ctx.body = {
    code: 1,
    msg: '获取完整菜单成功~',
    data: result
  }
}
```

#### 2.menu service 2

编写 `menu.service.js` 文件。

使用子查询，查询二、三级菜单。

src\cms\service\menu.service.js

```js
async wholeMenu() {
  const statement = `
    SELECT
      m1.id id,
      m1.NAME NAME,
      m1.type type,
      m1.url url,
      m1.icon icon,
      m1.sort sort,
      m1.createAt createAt,
      m1.updateAt updateAt,
      (SELECT
        JSON_ARRAYAGG(
          JSON_OBJECT(
            "id", m2.id,
            "name", m2.NAME,
            "type", m2.type,
            "parentId", m2.parentId,
            "url", m2.url,
            "sort", m2.sort,
            "createAt", m2.createAt,
            "updateAt", m2.updateAt,
            "children", (
              SELECT
                JSON_ARRAYAGG(
                  JSON_OBJECT(
                    "id", m3.id,
                    "name", m3.NAME,
                    "type", m3.type,
                    "parentId", m3.parentId,
                    "url", m3.url,
                    "sort", m3.sort,
                    "permission", m3.permission,
                    "createAt", m3.createAt,
                    "updateAt", m3.updateAt 
                  ) 
                ) 
              FROM
                menu m3 
              WHERE
                m3.parentId = m2.id 
              ORDER BY
                m3.sort 
            )) 
        ) 
      FROM
        menu m2 
      WHERE
        m1.id = m2.parentId 
      ORDER BY
        m2.sort 
      ) children 
    FROM
      menu m1 
    WHERE
      m1.type = 1;`

  const [result] = await connection.query(statement)
  return result
}
```

### 4.中间表（role_menu)

在 role 表和 menu 表之间，创建关系表 `role_menu` 表。

```mysql
CREATE TABLE IF NOT EXISTS `role_menu`(
  roleId INT NOT NULL,
  menuId INT NOT NULL,
  createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (roleId, menuId),
  FOREIGN KEY (roleId) REFERENCES role(id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (menuId) REFERENCES menu(id) ON DELETE CASCADE ON UPDATE CASCADE
);
```

### 5.给角色分配菜单权限

编写“给角色分配权限”的功能

修改 `role.controller.js` 中，`assignMenu` 方法。

```js
async assignMenu(ctx, next) {
  // 1.获取参数
  const roleId = ctx.params.roleId
  const menuIds = ctx.request.body.menuIds
  console.log(roleId, menuIds)

  // 2.分配权限
  await roleService.assignmenu(roleId, menuIds)

  // 3.返回结果
  ctx.body = {
    code: 1,
    msg: '分配权限成功~'
  }
}
```

在 `role.service.js` 中，编写分配权限的功能：

有两种方案：

方案一：判断角色被分配的权限，在中间表中，是否已经存在，若不存在，再插入进中间表（类似于前面给动态分配标签的接口）；

方案二：直接在中间表中，删除已有的权限，再重新插入记录（项目中采用）。

src\cms\service\role.service.js

```js
async assignmenu(roleId, menuIds) {
  // 1.先删除之前的关系
  const deleteStatement = `DELETE FROM role_menu WHERE roleId = ?`;
  await connection.query(deleteStatement, [roleId])

  // 2.插人新的值
  const insertStatement = `INSERT INTO role_menu (roleId, menuId) VALUES (?, ?);`
  for (const menuId of menuIds) {
    await connection.query(insertStatement, [roleId, menuId])
  }
}
```

#### 1.解耦（难点）

获取角色权限时，进行解耦（难点）。

尝试编写 sql 语句，查询 `roleId = 2` 的角色，分配了哪些权限菜单，

获取到菜单 id 的数组。

```mysql
SELECT rm.roleId, JSON_ARRAYAGG(rm.menuId) menuIds
FROM role_menu rm
WHERE rm.roleId = 2
GROUP BY rm.roleId
```

在 `role.service.js` 中，编写 `getRoleMenu` 方法。

用于获取角色分配的菜单权限 id 数组，根据这些 id，匹配菜单对象，并返回。

src\cms\service\role.service.js

```js
async getRoleMenu(roleId) {
  // 1.根据 roleId，获取所有的 menuId
  const getMenuIdsStatement = `
    SELECT rm.roleId, JSON_ARRAYAGG(rm.menuId) menuIds
    FROM role_menu rm
    WHERE rm.roleId = ?
    GROUP BY rm.roleId
  `
  const [result] = await connection.query(getMenuIdsStatement, [roleId])
  const menuIds = result?.[0]?.menuIds

  if (!menuIds) return []

  // 2.获取完整菜单树
  const wholeMenu = await menuService.wholeMenu()
  console.log('wholeMenu:', wholeMenu)

  // 3.从完整菜单树中，过滤 menuId，使用递归
  function filterMenu(menus) {
    const newMenu = []

    for (const item of menus) {
      if (item.children) {
        item.children = filterMenu(item.children)
      }
      if (menuIds.includes(item.id)) {
        newMenu.push(item)
      }
    }

    return newMenu
  }
  return filterMenu(wholeMenu)
}
```

在 `role.controller.js` 中，修改 `list` 方法：

加入“获取菜单信息”的功能。

src\cms\controller\role.controller.js

```js
async list(ctx, next) {
  // 1.获取角色基本信息
  const { offset = 0, limit = 10} = ctx.query;
  const result = await roleService.list(Number(offset), Number(limit))

  // 2.获取菜单信息
  for (const role of result) {
    const menu = await roleService.getRoleMenu(role.id)
    console.log('menu:', menu)
    role.menu = menu
  }

  // 3.返回响应结果
  ctx.body = {
    code: 1,
    msg: '获取角色列表成功~',
    data: result
  }
}
```
