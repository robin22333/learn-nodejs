'use strict'

const connect = require('./connect');
const url = require('url');

let app = connect();

app.use(function(req, res, next) {
  req.query = url.parse(req.url, true).query;
  req.url = url.parse(req.url).pathname;
  next();
});

app.use(function(req, res, next) {
  console.log(req.url);
  next();
});

app.use('/user', function(req, res, next) {
  let _id = req.query.id;
  let user = {
    id: _id,
    name: 'robin22333'
  };
  res.writeHead(200, {"Content-Type":"text/plain"});
  res.write(JSON.stringify(user));
  res.end();
});

app.use(function(req, res, next) {
  let path = req.url;
  if (path === '/') {
    res.writeHead(200, {"Content-Type":"text/plain"});
    res.write('REQUEST SUCCESS!');
    res.end();
  } else {
    let err = new Error('404 NOT FOUND!');
    next(err);
  }

});

app.listen(8888, function() {
  console.log('server listen on port 8888');
});

app.use(function(err, req, res, next) {
  res.writeHead(404, {"Content-Type":"text/plain"});
  res.write(err.message);
  res.end();
});
