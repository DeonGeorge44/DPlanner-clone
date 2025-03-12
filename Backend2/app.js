var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//Require-Project-Middlewares
const mongoose = require('mongoose')
const cors = require('cors')

require('dotenv').config();


//routes
// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
const routes = require('./routes/route/auth');
const userprofileRouter = require('./routes/route/userprofileRoute');
const foodRouter = require('./routes/route/foodRoute');
const dailydietRouter = require('./routes/route/dailydietRoute');
const instantplanRouter = require('./routes/route/instantplanRoute');





//Connecting Mongoose
console.log('MONGO_URL:', process.env.MONGO_URL);
mongoose
  .connect(process.env.MONGO_URL) // , { useNewUrlParser: true, useUnifiedTopology: true }
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



//Middlewares 
app.use(express.json()); 
app.use(cors());

//Routes for API 
app.use(routes);
app.use('/userprofile',userprofileRouter);
app.use('/food', foodRouter);
app.use('/dailydiet',dailydietRouter);
app.use('/instantplan',instantplanRouter);



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
