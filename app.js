var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var router = require('./router');
const mongoose = require('mongoose');
const userDao = require('./dao/usersDAO');

var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use((req,res,next)=>{
  console.log(req.body,'%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%',req.url);
  next();
});
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json({type:'*/*'}));

app.use(router);

const mongoURI = 'mongodb+srv://divyanshu26:divyanshu26@sandbox.pjwwf.mongodb.net/library?retryWrites=true&w=majority'
mongoose.connect(
  mongoURI,
  {useNewUrlParser:true}
).catch(err=>{
  console.log('failed to connect');
}).then(async (client)=>{
  console.log('connected');
  //console.log(client === mongoose,mongoose.__proto__);
  console.log(mongoose.__proto__ === mongoose.Mongoose.prototype);
  client.connection.db.listCollections().toArray((err,names)=>{
    console.log(err,names);
  });
  //let val = userDao.injectDB(client);
  //console.log(val);
});














// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  console.log('errror',err);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send({'error':'resource not found'});
});

module.exports = app;
