var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var robots = require('robots.txt');
var CDN = require('express-simple-cdn');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
var max_age = 0;
if (app.get('env') !== 'development') {
  max_age = 3600000; // 1h
}
app.use(express.static(path.join(__dirname, 'public'), { maxAge: max_age }));
app.use(robots(__dirname + '/robots.txt'));

app.use('/', routes);
app.use('/users', users);

app.locals.pretty = true;

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Use CDN when in production
if (app.get('env') === 'development') {
  app.locals.CDN = function(path) { return CDN(path); };
} else {
  app.locals.CDN = function(path) { return CDN(path, '//cdn.streamingkollen.tv'); };
}

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
