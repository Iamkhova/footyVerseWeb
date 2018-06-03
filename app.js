require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var Raven = require('raven');


Raven.config(process.env.RAVEN_DDN).install();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var internalAPIS = require('./routes/internalAPIS');
var app = express();

/////////////////////////////////////////
/// LOGGLY WINSTON CONFIGURATION
const winston  = require('winston');
require('winston-loggly-bulk');

app.use(Raven.requestHandler());

// The error handler must be before any other error middleware
app.use(Raven.errorHandler());

winston.add(winston.transports.Loggly, {
  inputToken: process.env.WINSTON_TOKEN,
  subdomain: process.env.WINSTON_SUBDOMAIN,
  tags: ["Winston-NodeJS"],
  json:true
});
/////////////////////////////////////////




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', internalAPIS);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
/*
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
*/
app.use(function onError(err, req, res, next) {
  // The error id is attached to `res.sentry` to be returned
  // and optionally displayed to the user for support.
  // add this line to include winston logging
  winston.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

  res.statusCode = 500;
  res.end(res.sentry + '\n');
});
module.exports = app;
