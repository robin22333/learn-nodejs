'use strict'

const koa = require('koa');
const koa_router = require('koa-router')();
const views = require('koa-views');
const index = require('./router/index');

let app = koa();

app.use(views('views', {
  root: __dirname + '/views',
  default: 'ejs'
}));

// koa 中间件有点类似 struts2 的拦截器
// 执行到 yield next 后暂停该中间件，执行下一个中间件，直到找不到下一个中间件
// 然后逐级调用上层中间件 yield next 之后的代码
app.use(function* (next) {
  console.log('first middlewares start');
  yield next;
  console.log('first middlewares end');
});

app.use(function* (next) {
  console.log('second middlewares start');
  yield next;
  console.log('second middlewares end');
});

app.use(function* (next) {
  console.log('third middlewares start');
  yield next;
  console.log('third middlewares end');
});
// => first middlewares start
// => second middlewares start
// => third middlewares start
// => third middlewares end
// => second middlewares end
// => first middlewares end

// log execution time
app.use(function* (next) {
  let start_at = Date.now();
  yield next;
  this.set('X-Execution-Time', Date.now() - start_at);
});

// log request
app.use(function* (next) {
  if (this.url.indexOf('favicon.ico') !== -1) {
    yield next;
    return;
  }
  let start_at = Date.now();
  yield next;
  let duration = Date.now() - start_at;
  console.log('%s %s-%s', this.method, this.url, duration + 'ms');
});

koa_router.use('/', index.routes(), index.allowedMethods());
app.use(koa_router.routes());
// 等价于
// app.
//  use(index.routes()).
//  use(index.allowedMethods());

app.on('error', function(err, ctx){
  console.error('server error', err, ctx);
});

app.listen(3000);
