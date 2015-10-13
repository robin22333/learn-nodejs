var superagent = require('superagent');
var cheerio = require('cheerio');
var async = require('async');
var url = require('url');

var ruby_china_url = 'https://ruby-china.org/topics';
var concurrencyCount = 0;

superagent.get(ruby_china_url)
  .end(function(err, res) {
    if (err) {
        return console.log(err);
    }
    var $ = cheerio.load(res.text);
    var topicsUrl = [];
    $('.topic .title a').each(function(i,e) {
        var $e = $(e);
        var href = url.resolve(ruby_china_url, $e.attr('href'));
        topicsUrl.push(href);
    });

    var fetchUrl = function(url, callback) {
        concurrencyCount ++;
        var startTime = Date.now();
        console.log('现在的并发数是', concurrencyCount, ',正在抓取的是' + url);
        superagent.get(url)
          .end(function(err, res) {
            if (err) {
                return console.log(err);
            }
            var $ = cheerio.load(res.text);
            var title = $('.media-heading').text();
            var endTime = Date.now();
            var delay = endTime - startTime;
            //console.log('现在的并发数是', concurrencyCount, ',正在抓取的是', url, ',耗时', delay, '毫秒');
            concurrencyCount --;
            callback(null, title);
        });
    }

    async.mapLimit(topicsUrl, 5, function(url, callback) {
        fetchUrl(url, callback);
    }, function(err ,result){
        console.log('result');
        console.log(result);
    });
});
