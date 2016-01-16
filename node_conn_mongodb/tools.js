'use strict'

const moment = require('moment');

exports.formatDate = (date, friendly) => {
  date = moment(date);

  if (friendly) {
    return date.fromNow();
  } else {
    return date.format('YYYY-MM-DD HH:mm');
  }

};
