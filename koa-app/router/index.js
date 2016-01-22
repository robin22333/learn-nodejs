'use strict'

var router = require('koa-router')();

router.get('/', function* (next) {
  yield this.render('index', {
    title: 'koa index'
  });
});

router.get('home', function* (next) {
  yield this.render('index', {
    title: 'koa home'
  });
});

router.get(':id', function* (next) {
  // console.log(this.params);
  // => {id: id}
  // console.log(this.request.params);
  // => undefined
  // this.params !== this.request.params

  yield this.render('index', {
    title: 'koa ' + this.params.id
  });
});

router.get('get', function* (next) {
  // console.log(this.query);
  // console.log(this.request.query);
  // this.query === this.request.query

  yield this.render('index', {
    title: 'koa ' + this.query.name
  });
});

router.get('user', 'users/:id', function *(next) {
  yield this.render('index', {
    title: 'koa user ' + this.params.id
  });
});

router.url('user', 3);
// => "/users/3"


// middleware
router.get(
  'user/:id',
  function* (next) {
    let user = {
      name: 'robin22333',
      age: 22
    }
    this.user = yield user;
    yield next;
  },
  function* (next) {
    yield this.render('user', {
      user: this.user
    })
  }
);

module.exports = router;
