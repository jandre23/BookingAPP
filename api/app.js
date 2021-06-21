var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiRouter= require('./routes/api/index');

const mongoose= require('mongoose');
mongoose.Promisee= global.Promise;

//const {MongoClient} = require('mongodb');

const uri = "mongodb+srv://andre23:nylegend23@cluster0.mprrz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
//const client = new MongoClient(uri,{ useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true }).then((db)=>{console.log("success...");}).catch((err)=>{console.log(err);})

/*
try {
        // Connect to the MongoDB cluster
        client.connect();
       
 
       
 
    } catch (e) {

        console.error(e);
    } finally {
         
         client.close();

    }
*/
 


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/api', apiRouter);
app.use('/users', usersRouter);


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
