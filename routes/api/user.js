var express = require('express');
var User = require('../../models/users');
var passport = require('passport');
var Verify = require('../../tools/auth/verify');

/* GET users listing. */
exports.getUserList = function(req,res,next) {
		User.find({},function(err,users){
			if(err) throw err;
			res.json(users);
		});
};

exports.register=function(req,res){
    req.checkBody('email','Email is required').notEmpty();
    req.checkBody('email','Email is not valid').isEmail();
    req.checkBody('password','password is required').notEmpty();
    
    var errors = req.validationErrors();
    if(errors){
        res.json(errors);
    }else{
        var user = new User();
        user.email = req.body.email.toLowerCase();
        user.password = req.body.password;
        if(req.body.username){
            user.username = req.body.username;
        }
        if(req.body.firstname){
            user.firstname = req.body.firstname;
        }
        if(req.body.lastname){
            user.lastname = req.body.lastname;
        } 
        
        user.createUser(user,function(err,user){
            if(err){
                res.status(err.status || 500);
                res.json({
                    message:err.message,
                    error:err
                })
            }
            res.json(user);
        });
    }

    /*
            user.save(function(err,user){
                passport.authenticate('local')(req,res,function(){
                    return res.status(200).json({status: 'Registration Successful!'});
                });
            });
     */
        

};

exports.login = function(req,res,next){
    passport.authenticate('local',function(err,user,info){
        if(err){
            return next(err);
        }
        
        if(!user){
            return res.status(401).json({
                err:info
            });
        }
        
        req.logIn(user,function(err){
            if(err){
                return res.status(500).json({
                    err:'Could not log in user'
                });
            }
            
            //console.log('User in users:', user);
            var token = Verify.getToken(user);
            res.status(200).json({
                 status:'login successful!',
                 success: true,
                 token: token  
            });
        });
    })(req,res,next);
};

exports.logout= function(req,res){
  req.logout();
  res.status(200).json({
      status:'Bye!'
  });
};