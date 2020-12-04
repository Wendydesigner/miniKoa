/**
 * 测试case
 */
const Koa = require('../index.js');
const app = new Koa();
let resBody = {};
app.use(async(ctx, next) => {
    resBody.name = "wendy";
    await next();
    ctx.body = resBody;
});
app.use(async(ctx, next) => {
    resBody.age = 18;
    await next();
});
app.use(async(ctx, next) => {
    resBody.sex = "female";
});
app.listen(3000, () => { console.log(`Listening the port 3000`) });