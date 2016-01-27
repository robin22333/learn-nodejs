'use strict'

const http = require('http');
const url = require('url');

let proto = {};
let app = null;
// add middlleware

let createServer = function() {
  app = function(req, res) {
    app.handle(req, res);
  }
  // bind all function
  for (let funName in proto) {
    app[funName] = proto[funName];
  }
  app.route = '/';
  app.stack = [];
  return app;
}

proto.listen = function() {
  var server = http.createServer(this);
  return server.listen.apply(server, arguments);
}

// 请求到达时顺序调用中间件
proto.handle = function(req, res) {
  let index = 0;
  let stack = this.stack;
  let next = function(err) {
    let layer = stack[index ++];
    if (!layer) {
      return;
    }
    let path = url.parse(req.url).pathname;
    let route = layer.route;
    if (path.substring(0, route.length) !== route) {
      return next(err);
    }
    call(layer.handle, err, req, res, next);
  }
  next();
}

// add middlleware
proto.use = function(route, fun) {
  let handle = fun;
  let path = route;

  if (typeof route === 'function') {
    handle = route;
    path = '/';
  }

  this.stack.push({route: path, handle: handle});
}

let call = function(handle, err, req, res, next) {
  if (err && handle.length === 4) {
    handle(err, req, res, next);
  } else {
    handle(req, res, next);
  }
}

module.exports = createServer;
