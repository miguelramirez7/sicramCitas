var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var cors = require("cors");
var logger = require('morgan');
// RUTA DE USUARIOS 
var indexUserApiRouter = require('./routes/api/indexusr');
var indexDoctorApiRouter = require('./routes/api/indexct');
var indexOrgApiRouter = require('./routes/api/indexorg');
var usersRouter = require('./routes/users');
var cmpScrapApiRouter = require('./routes/api/scrap');
var passport = require('passport');
// INICIANDO LA APP 
var app = express();
require("./database/database");
require('./config/userpassport');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Cors para dividir los svv
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//----------------------------------------------------------------
//            AGREGANDO RUTAS PADRES
//----------------------------------------------------------------
app.use('/api', indexUserApiRouter);
app.use('/users', usersRouter);
app.use('/api', indexDoctorApiRouter);
app.use('/api', indexOrgApiRouter);
app.use('/cmp', cmpScrapApiRouter);
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
