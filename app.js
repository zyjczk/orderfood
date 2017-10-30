var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');//session插件
var api = require('./routes/api');
var index = require('./routes/index');
var users = require('./routes/users');
var detail = require('./routes/detail');
var employee = require('./routes/employee');
var food = require('./routes/food');
var uploadfile = require('./routes/uploadfile');
var department = require('./routes/department');
var company = require('./routes/company');
var wx = require('./routes/wx');
// var testLvyi = require('./routes/testLvyi');

var app = express();
//配置cookie
app.use(cookieParser('orderfood_msg'));
//配置session
app.use(session({
    secret:'orderfood_msg',
    resave:true,
    saveUninitialized:false
}));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/api', api);
app.use('/users', users);
app.use('/detail', detail);
app.use('/employee', employee);
app.use('/food', food);
app.use('/uploadfile', uploadfile);
app.use('/department', department);
app.use('/company', company);
app.use('/wx', wx);
// app.use('/testLvyi', testLvyi);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
