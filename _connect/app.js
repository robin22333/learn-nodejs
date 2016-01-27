'use strict'

const connect = require('./connect');
const url = require('url');

let app = connect();

app.use(function(req, res, next) {
  console.log(url.parse(req.url).pathname);
  next();
});

app.use('/user', function(req, res, next) {
  console.log('/user ---middlleware');
  next();
});

app.use(function(req, res, next) {
  let path = url.parse(req.url).pathname;
  if (path === '/' || path === '/user') {
    res.writeHead(200, {"Content-Type":"text/plain"});
    res.write('REQUEST SUCCESS!');
    res.end();
  } else {
    let err = {
      msg: '404 NOT FOUND!'
    }
    next(err);
  }

});

app.listen(8888, function() {
  console.log('server listen on port 8888');
});

app.use(function(err, req, res, next) {
  res.writeHead(404, {"Content-Type":"text/plain"});
  res.write(err.msg);
  res.end();
});
