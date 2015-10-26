"use strict"

var express = require('express');
var http = require('http');
var app = express();

/*
var routes = require('./routes/routes')(app);
*/

app.all('*', function(req, res, next) {
    res.writeHead(200, {'Content-Type':'text/plain'});
    next();
});

app.get('/', function(req, res, next) {
    res.end('Welcome the home page\n');
});

app.get('/user', function(req, res, next) {
    res.end('Welcome the user page\n');
});

app.get('*',function(req, res) {
    res.end('404 Error\n');
});

http.createServer(app).listen(3000);
