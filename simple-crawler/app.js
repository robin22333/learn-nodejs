var express = require('express');
var superagent = require('superagent');
var cheerio = require('cheerio');

var app = express();

app.get('/', function(req, res) {
    var url = 'https://ruby-china.org'
    superagent.get(url + '/topics')
        .end(function(err, sres) {
        if (err) {
            return next(err);
        }
        var $ = cheerio.load(sres.text);
        var item = [];
        $('.topic .title a').each(function(i,e){
            var $e = $(e);
            item.push({
                title: $e.text(),
                href: url + $e.attr('href')
            });
        });
        res.send(item);
    });
});

app.listen(3000, function(req, res){
    console.log('app is running at 3000 port');
});
