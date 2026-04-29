# NodeJS Study
慕课网584 Node.js 工程师养成计划
Node.js 学习练习仓库，按课程章节和主题拆成多个 `unit` 目录。每个目录相对独立，包含对应阶段的示例代码、练习项目或服务端接口。

## 目录说明

| 目录 | 主要内容 | 说明 |
| ---- | -------- | ---- |
| `unit2` | Node.js 文件系统练习 | 包含文件读取、写入、追加等 `fs` 模块基础示例。 |
| `unit3` | Node CLI 脚手架练习 | 使用 `commander`、`inquirer`、`chalk`、`ora`、`download-git-repo` 搭建命令行工具。 |
| `unit4` | 原生 Node Web 服务器 | 使用原生 `http` 模块处理请求方法、路由、控制器拆分和静态 HTML 响应。 |
| `unit5-express` | Express 框架练习 | 包含 Express 基础项目、路由拆分、模板视图和基于文件数据的接口练习。 |
| `unit6-mongoDB` | MongoDB 原生驱动练习 | 使用 `mongodb` 包连接本地 MongoDB，练习集合查询等基础操作。 |
| `unit7-express-project` | Express 视频接口项目 | 基于 `Express + MongoDB + Mongoose + Redis` 的完整接口练习，包含用户、频道、视频、评论、点赞、收藏、热门视频等功能。 |
| `unit9-ioredis` | Redis / ioredis 练习 | 使用 `ioredis` 操作 Redis，练习字符串、集合、有序集合和热度排行等功能。 |

## 快速查看

### `unit2`

文件系统基础示例：

```text
read.js     # 读取文件
write.js    # 写入文件
append.js   # 追加内容
file.js     # 文件相关练习
a.txt       # 测试文本
```

### `unit3`

自定义 CLI 工具练习：

```bash
cd unit3
npm install
```

核心内容：

```text
bin/cli.js              # 命令入口
lib/core/mycommander.js # commander 命令配置
lib/core/action.js      # 命令动作
test/                  # chalk、inquirer、ora 等库的练习
```

### `unit4`

原生 Node HTTP 服务练习：

```text
server.js          # HTTP 服务
router.js          # 路由处理
controller.js      # 控制器拆分
request-method.js  # 请求方法练习
index.html         # HTML 响应示例
```

### `unit5-express`

Express 框架练习，包含两个子项目：

```text
express-fm/ # 使用 Express 重构文件数据接口逻辑
express-g/  # Express Generator 风格项目，包含 routes、views、public、bin/www
```

### `unit6-mongoDB`

MongoDB 原生驱动练习：

```bash
cd unit6-mongoDB
npm install
node index.js
```

默认连接：

```text
mongodb://127.0.0.1:27017
```

### `unit7-express-project`

视频接口项目：

```bash
cd unit7-express-project
npm install
npm run dev
```

默认服务：

```text
http://localhost:8888
```

依赖服务：

```text
MongoDB: mongodb://localhost:27017/express-video
Redis:   127.0.0.1:6379
```

详细接口和目录说明见：

```text
unit7-express-project/README
```

### `unit9-ioredis`

Redis 练习：

```bash
cd unit9-ioredis
npm install
npm run dev
```

默认连接本机 Redis：

```text
127.0.0.1:6379
```

## 常用依赖服务

本仓库后续章节会用到本地 MongoDB 和 Redis。

检查 MongoDB：

```bash
mongosh
```

检查 Redis：

```bash
redis-cli ping
```

返回 `PONG` 表示 Redis 可用。

## 备注

- 各 `unit` 目录相对独立，运行前需要进入对应目录安装依赖。
- `unit7-express-project` 是当前功能最完整的项目，建议优先查看它的 README。
- 根目录没有统一的 `package.json`，不要在根目录直接执行 `npm install` 期望安装所有子项目依赖。
