var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var expressSession = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var config = require('./config');

//var routes = require('./routes/index');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressSession({
    secret: process.env.SESSION_SECRET || 'secret',
    resave:false,
    saveUninitialized: false
}))
app.use(express.static(path.join(__dirname, 'public')));
    
// authorize using passort 
    //passport config
    var User = require('./models/users');
    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(User.createStrategy());
    passport.serializeUser(function(user,done){
        done(null,user.id)
    });
    passport.deserializeUser(function(id,done){
        User.findById,function(err,user){
            done(err,user);
        }
    });
        
// connect to mongodb 
  //set up options
  var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }, 
                  replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };
  // mongolab uri for testing database  
  var mongodbUri = 'mongodb://johnsonice:JOHNSONice16@ds013881.mlab.com:13881/johnsonice';
  //connect
  mongoose.connect(config.mongoUrl, options);
  var conn = mongoose.connection;  

  conn.on('error', console.error.bind(console, 'connection error:'));  
  
  conn.once('open', function() {
    // Wait for the database connection to establish, then start the app. 
    console.log('connected to mlab');
    //load all routes
        //handel html requests 
        var htmlController = require('./controlers/htmlController.js');
        //handel api requests 
        var apiController = require('./controlers/apiController.js');  
    // pass express app object to controller
        apiController(app); // handel all aip request, put, post, delate              
        htmlController(app); // render all html files 

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
      var err = new Error('Not Found!!!');
      err.status = 404;
      next(err);
    });
    // error handlers
    // development error handler
    // will print stacktrace
    if (app.get('env') === 'development') {
      app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.json({
          message: err.message,
          error: err
        });
      });
    }

    // production error handler
    // no stacktraces leaked to user
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.json({
        message: err.message,
        error: {}
      });
    });

}); // end of mongodb connection 
module.exports = app;
