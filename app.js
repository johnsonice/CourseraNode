var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

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
app.use(express.static(path.join(__dirname, 'public')));

//authorization 
//basic
function auth(req,res,next){
    //console.log(req.headers);
    var authHeader = req.headers.authorization;
    if(!authHeader){
        var err = new Error('You are not authenticated!');
        err.status = 401;
        next(err);
        return;
    }
    var auth = new Buffer(authHeader.split(' ')[1],
    'base64').toString().split(':');
    var user = auth[0];
    var pass = auth[1];
    if (user == 'admin' && pass == 'password') {
        next();
    }else{
        var err = new Error('You are not authenticated!');
        err.status = 401;
        next(err);
        return;
    }
}
app.use(auth);
app.use(function(err,req,res,next){
    res.writeHead(err.status ||500,{
        'WWW-Authenticate': 'Basic',
        'Content-Type': 'text/plain'
    });
    res.end(err.message);
});




// connect to mongodb 
  //set up options
  var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }, 
                  replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };
  // mongolab uri for testing database  
  var mongodbUri = 'mongodb://johnsonice:JOHNSONice16@ds013881.mlab.com:13881/johnsonice';
  //connect
  mongoose.connect(mongodbUri, options);
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

}); // end of mongodb connection 
module.exports = app;
