const http = require('http');
const EventEmitter = require('events');

class Koa extends EventEmitter{
    constructor() {
        super();
        this.middlewares = [];
        this.content = {};
    }
    use(fn) {
        if (fn instanceof Function != true) {
            throw Error("use的参数需要为function")
        }
        this.middlewares.push(fn);
    }
    createContent(req, res) {
        let context = Object.create(this.content);
        content.req = req;
        content.res = res;
        content.app = this;
        return context;
    }
    compose() {
        return async (ctx) => {
            const length = this.middlewares.length;
            let handleMiddleware = (fn, next) => {
                return async() => await fn(ctx, next);
            }
            let next = () => {return new Promise((resolve) => resolve())};
            while(length>=0) {
                next = handleMiddleware(this.middlewares[length], next);
                length--;
            }
            next();
        }
    }
    onError(err, ctx) {
        ctx.res.end(err.code || 'Internet Error');
        this.emit('error', err);
    }
    success(ctx) {
        let resBody = ctx.body;
        ctx.res.end(typeof resBody == "string" ? resBody : JSON.stringify(resBody));
    }
    request(ctx, fn) {
        return fn(ctx).then(() => this.success(ctx)).catch(err => this.onError(err, ctx));
    }
    cb() {
        return (req, res) => {
            let ctx = createContent(req, res);
            let compose = this.compose();
            return this.request(ctx, compose);
        }
    }
    listen(...args) {
        let server =  http.creatServer(this.cb());
        server.listen(...args);
    } 
}
module.exports = Koa;