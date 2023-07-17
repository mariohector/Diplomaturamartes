var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('dotenv').config();
var pool = require('./models/db');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

//Consulta a la base de datos
// Habiacreado l base de datos con el nombre
// ejercicio.
//---------SELECT--------------//
// pool.query('SELECT * FROM empleados').then(function(resultados){
//   console.log(resultados);
// });

//---------INSERT-------------//
// var obj = {
//   nombre: 'Juan',
//   apellido: 'Lopez',
//   trabajo: 'Programador Junior',
//   edad: 34,
//   salario: 89765,
//   mail: 'juanlopez@FileSystemEntry.com.ar'
// }

// pool.query('INSERT INTO empleados SET ?', [obj]).then(function(resultados){
//  console.log(resultados);
// });

// var obj = {
//   nombre: 'Pedro',
//   apellido: 'Martines',
//   trabajo: 'Programador Senior',
//   edad: 29,
//   salario: 125400,
//   mail: 'pedromartines@softy.com'
// }

// pool.query('INSERT INTO empleados SET ?', [obj]).then(function(resultados){
//  console.log(resultados);
// });

//----------UPDATE-------------//
// var id_emp = 24;
// var obj = {
//   mail: 'juanlopez@systemdata.com.ar'
// }

// pool.query('UPDATE empleados SET ? WHERE id_emp=?', [obj, id_emp]).then(function(resultados){
//  console.log(resultados);
// });

//-----------DELETE----------//
// var id_emp = 22;

// pool.query('DELETE FROM empleados WHERE id_emp=?',[id_emp]).then(function(resultados){
//  console.log(resultados);
// });


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
