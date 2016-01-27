'use strict'

const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

let app = express();

app.listen(5000, () => {
  console.log('listen on port 5000....');
});

app.use(cookieParser('secret bytes'));

app.use(session({
  secret: 'secret bytes',
  store: new RedisStore({
    host: '127.0.0.1',
    port: '6379'
  })
}));

app.use((req, res, next) => {
  let username = req.signedCookies['username'];
  if (username) {
    findByUsername(username, (err, user) => {
      if (err) {
        return;
      }
      req.session.user = user;
    });
  }
  next();
});

app.get('/', (req, res) => {
  if (req.session.user) {
    // console.log(req.session);
    res.send(JSON.stringify(req.session.user));
  } else {
    res.send('未登录');
  }
});

app.get('/login', (req, res) => {
  if (req.session.user) {
    res.redirect('/');
  } else {
    var opts = {
      path: '/',
      maxAge: 1000 * 60,
      signed: true,
      httpOnly: true
    };
    res.cookie('username', 'robin22333', opts);
    res.send('登录成功');
  }
});

// 模拟数据库中获取 user
let findByUsername = (username, callback) => {
  let user = {
    name: 'robin22333',
    pass: '123456',
    email: 'luobin1105@qq.com'
  }
  callback(null, user);
}
