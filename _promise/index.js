'use strict'

const superagent = require('superagent')
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

exports.getTopicUrls = getTopicUrls;
exports.getToicTitle = getToicTitle;

if (require.main === module) {
  getTopicUrls('https://ruby-china.org').then((topicsUrl) => {
    return Promise.all(topicsUrl.map(getToicTitle));
  }).then((topics) => {
    console.log(topics);
  }).catch((err) => {
    console.log(err);
  });
}
