'use strict'

const co = require('co')
    , fs = require('fs')
    , superagent = require('superagent')
    , cheerio = require('cheerio')
    , url = require('url');

let getTopicUrls = (ruby_china_url) => {
  return new Promise((relsove, reject) => {
    superagent.get(ruby_china_url + '/topics')
      .end((err, res) => {
        if (err) {
          return reject(err);
        }
        let $ = cheerio.load(res.text);
        let topicsUrl = [];
        $('.topic .title a').each((i, e) => {
          let $e = $(e);
          let href = url.resolve(ruby_china_url, $e.attr('href'));
          topicsUrl.push(href);
        });
        relsove(topicsUrl);
      });
  });
}

let getToicTitle = (topicUrl) => {
  return new Promise((relsove, reject) => {
    superagent.get(topicUrl)
      .end((err, res) => {
        if (err) {
          return reject(err);
        }
        let $ = cheerio.load(res.text);
        let title = $('.media-heading').text();
        relsove(title);
      });
  });
}

co(function* () {
  let topicsUrl = yield getTopicUrls('https://ruby-china.org');
  let promises = topicsUrl.map(getToicTitle);
  let titles = yield promises;
  console.log(titles);
});
