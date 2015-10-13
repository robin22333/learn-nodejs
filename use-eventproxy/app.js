var superagent = require('superagent');
var cheerio = require('cheerio');
var eventproxy = require('eventproxy');
var url = require('url');

var ruby_china_url = 'https://ruby-china.org';

superagent.get(ruby_china_url + '/topics')
  .end(function(err, res) {
    if (err) {
        return console.log(err);
    }
    var $ = cheerio.load(res.text);
    var topicsUrl = [];
    $('.topic .title a').each(function(i, e) {
        var $e = $(e);
        var href = url.resolve(ruby_china_url, $e.attr('href'));
        topicsUrl.push(href);
    });
    console.log(topicsUrl);
    
    var ep = eventproxy();

    ep.after('load_url', topicsUrl.length, function(topics) {
        topics = topics.map(function(topic) {
            var topicUrl = topic[0];
            var topicHtml = topic[1];
            var $ = cheerio.load(topicHtml);
            var title = $('.media-heading').text();
            var comment = $('.reply .markdown').eq(0).text().trim();
            return {
                title: title, 
                href: topicUrl,
                comment: comment
            }
        });
        console.log('result: ');
        console.log(topics);
    });

    topicsUrl.forEach(function (topicUrl) {
        superagent.get(topicUrl)
          .end(function(err, res) {
            if (err) {
                return console.log(err);
            }
            ep.emit('load_url', [topicUrl, res.text]);
        });
    });
});
