'use strict'

const getTopicUrls = require('../index').getTopicUrls
    , getToicTitle = require('../index').getToicTitle
    , should = require('should');

const ruby_china_url = 'https://ruby-china.org';

describe('test/main.test.js', () => {

  it('topicUrls should be an instanceOf(Array)', () => {
    getTopicUrls(ruby_china_url).then((topicUrls) => {
      topicUrls.should.be.an.instanceOf(Array);
    })
  });

  it('topicUrls length should be a lengthOf(25)', () => {
    getTopicUrls(ruby_china_url).then((topicUrls) => {
      topicUrls.length.should.be.a.lengthOf(25);
    })
  });

  it('topics should be an instanceOf(Array)', () => {
    getTopicUrls(ruby_china_url).then((topicsUrl) => {
      return Promise.all(topicsUrl.map(getToicTitle));
    }).then((topics) => {
      topics.should.be.an.instanceOf(Array);
    });
  });

  it('topics length should be a lengthOf(25)', () => {
    getTopicUrls(ruby_china_url).then((topicsUrl) => {
      return Promise.all(topicsUrl.map(getToicTitle));
    }).then((topics) => {
      topics.length.should.be.a.lengthOf(25);
    });
  });
});
