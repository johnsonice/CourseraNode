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
    User.register(
        new User({username: req.body.username}),
        req.body.password,
        function(err,user){
            if(err){
                return res.status(500).json({err: err});
            }
            passport.authenticate('local')(req,res,function(){
                return res.status(200).json({status: 'Registration Successful!'});
            });
        }
    ) // end of register
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
            
            console.log('User in users:', user);
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