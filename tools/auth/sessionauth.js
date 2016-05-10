var session = require('express-session');
var fileStore = require('session-file-store')(session);
//authorization 
//using signed cookie and session 
// we set the signed key to be a random string '12345-67890-09876-54321'
 exports.session = session({
        name:'session-id',
        secret: '12345-67890-09876-54321',
        saveUnitialized:true,
        resave:true,
        store: new fileStore()
    });
 
 exports.auth = function(req,res,next){
     if(!req.session.user){
            var authHeader = req.headers.authorization;
            console.log(req.headers);
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
                req.session.user = 'admin';
                next(); //authorized
            }else{
                var err = new Error('You are not authenticated!');
                err.status = 401;
                next(err);
                return;
            }
      } else{
           if(req.session.user === 'admin') {
               console.log('req.session: ' + req.session);
               next();
           }else{
                var err = new Error('You are not authenticated!');
                err.status = 401;
                next(err);
                return;
           }// end if inner if
      } // end of outer if 
   }
    
exports.message = function(err,req,res,next){
        res.writeHead(err.status ||500,{
            'WWW-Authenticate': 'Basic',
            'Content-Type': 'text/plain'
        });
        res.end(err.message);
    }