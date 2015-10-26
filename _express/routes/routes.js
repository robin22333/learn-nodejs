"use strict"

//routes/routes.js

module.exports = function(app) {
    app.get('/', function(req, res){
        res.send('Hello World');
    });

    app.get('/user', function(req, res){
        res.send('user list');
    });

    app.get('/product', function(req, res){
        res.send('product list');
    });

}
