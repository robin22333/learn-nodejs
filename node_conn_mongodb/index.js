'use strict'

const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/test', {
  server: {poolSize: 20}
}, (err) => {
  if (err) {
    console.error('connect to %s error: ', 'mongodb://127.0.0.1/test', err.message);
    process.exit(1);
  }
});

require('./user');

let User = mongoose.model('User');

let robin = {
  name: 'robin22333',
  pass: '123456',
  tags: ['web', 'nodejs'],
  age: 21,
  cmmyName: '云聚',
};

let saveNewUser = (user, callback) => {
  let _user = new User(user);
  _user.save(callback);
}

let getUserByName = (name, callback) => {
  User.findOne({name: name}, callback);
}

let getUsersByNames = (names, callback) => {
  if (names.length === 0) {
    return callback(null, []);
  }
  User.find({name: {$in: names}}, callback);
}

saveNewUser(robin, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('save success');
});

getUserByName('luob', (err, user) => {
  if (err) {
    return console.log(err);
  }
  console.log('query success');
  console.log(JSON.stringify(user, null, '  '));
});

getUsersByNames(['luob', 'daniela'], (err, users) => {
  if (err) {
    return console.log(err);
  }
  for (let user of users) {
    console.log(user.uname + ',' + user.create_at_ago());
  }
});
