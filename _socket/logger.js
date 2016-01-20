'use strict'

const c = require('colors');

c.setTheme({
  silly: 'rainbow',
  input: 'grey',
  verbose: 'cyan',
  prompt: 'grey',
  info: 'green',
  data: 'grey',
  help: 'cyan',
  warn: 'yellow',
  debug: 'blue',
  error: 'red'
});

exports.debug = (msg) => {
  console.log(msg.verbose);
}

exports.error = (msg) => {
  console.log(msg.error);
}

exports.info = (msg) => {
  console.log(msg.info);
}
