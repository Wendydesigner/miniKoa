# miniKoa
## 实现一个mini koa
- 继承Events的类
- http服务器: app.listen
- 中间件middleware洋葱模型compose:app.use
- ctx/req/res
- 错误处理error

## 测试miniKoa
- node ./__tests__/index.js 启动http服务
- curl http://localhost:3000
   得到返回 {"name":"wendy","age":18,"sex":"female"}
- 或打开浏览器输入http://localhost:3000 同样会看到接口返回