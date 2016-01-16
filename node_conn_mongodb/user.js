'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const tools = require('./tools');

let UserSchema = new Schema({
  name: {type: String},
  pass: {type: String},
  tags: {type: [String]},
  age: {type: Number},
  cmmyName: {type: String},
  create_at: {type: Date, default: Date.now()},
  isValid: {type: Boolean, default: true}
});

UserSchema.virtual('uname').get(function() {
  return this.cmmyName + '-' + this.name;
});

UserSchema.plugin((schema) => {
  schema.methods.create_at_ago = function () {
    return tools.formatDate(this.create_at, true);
  };
});

mongoose.model('User', UserSchema);
