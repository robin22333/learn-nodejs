'use strict'

const fs = require('fs');

let readFile = (filename) => {
  return (callback) => {
    return fs.readFile(filename, callback);
  }
}

let _readFile = (filename) => {
  return new Promise((relsove, reject) => {
    fs.readFile(filename, (err, data) => {
      if(err) {
        return reject(err);
      }
      relsove(data);
    });
  });
}

let co = (func) => {
  let gen = func();
  let next = (err, data) => {
    let result = gen.next(data);
    if (result.done) {
      return;
    }
    result.value(next);
  }
  next();
}

let _co = (func) => {
  let gen = func();
  let next = (data) => {
    let result = gen.next(data);
    if (result.done) {
      return;
    }
    result.value.then(function(data) {
      next(data);
    });
  }
  next();
}

co(function* () {
  let res = yield readFile('A.txt');
  let content = yield readFile(res.toString('utf-8').trim());
  console.log(content.toString('utf-8').trim());
});

_co(function* () {
  let res = yield _readFile('A.txt');
  let content = yield _readFile(res.toString('utf-8').trim());
  console.log(content.toString('utf-8').trim());
});
