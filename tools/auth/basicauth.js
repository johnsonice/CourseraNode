
//authorization 
//basic - need to be authorized to access anything 
 exports.auth = function(req,res,next){
        var authHeader = req.headers.authorization;
        if(!authHeader){
            var err = new Error('You are not authenticated!');
            err.status = 401;
            next(err);
            return;
        }
        var auth = new Buffer(authHeader.split(' ')[1],
        'base64').toString().split(':');
        //console.log(auth); 
        var user = auth[0];
        var pass = auth[1];
        if (user == 'admin' && pass == 'password') {
            next(); //authorized
        }else{
            var err = new Error('You are not authenticated!');
            err.status = 401;
            next(err);
            return;
        }
    }
    
exports.message = function(err,req,res,next){
        res.writeHead(err.status ||500,{
            'WWW-Authenticate': 'Basic',
            'Content-Type': 'text/plain'
        });
        res.end(err.message);
    }