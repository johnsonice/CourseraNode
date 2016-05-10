
//authorization 
//using signed cookie and session 
// we set the signed key to be a random string '12345-67890-09876-54321'
 exports.auth = function(req,res,next){
     if(!req.signedCookies.user){
            var authHeader = req.headers.authorization;
            //console.log(req.headers);
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
                res.cookie('user','admin',{signed:true});
                next(); //authorized
            }else{
                var err = new Error('You are not authenticated!');
                err.status = 401;
                next(err);
                return;
            }
      } else{
           if(req.signedCookies.user === 'admin') {
               console.log(req.signedCookies);
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