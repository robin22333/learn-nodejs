var express = require('express');
var utility = require('utility');

var app = express();

app.get('/', function(req, res) {
    var name = req.query.name;
    
    var md5value = utility.md5(name);
    var sha1value = utility.sha1(name);
    res.send(md5value + '-' + sha1value);
});

app.listen(3000, function(req, res) {
    console.log('app is running at port 3000');
});
