var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let {expressjwt} = require("express-jwt") // 得到中间件

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var usersInfoRouter = require('./routes/usersInfo')

var app = express();

const cors = require("cors");
app.use(cors()); //使用cors中间件

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 在路由之前解析jwt
// app.use(expressjwt({
//   secret:'testkey',
//   algorithms:["HS256"]
// }).unless({
//   path:["/api/users",/^\/api\/articles\/users\/\w+/,{
//     url:/^\/api\/articles\/\w+/,
//     methods:['GET']
//   }],//这些路由不会被校验
// })
// )

app.use('/', indexRouter);
app.use('/api/usersInfo', usersInfoRouter);
app.use('/api/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
