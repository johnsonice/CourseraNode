var User = require('../../models/users');
var jwt=require('jsonwebtoken');
var config = require('../../config');

exports.getToken = function(user){
  return jwt.sign(user,config.secretKey,{
      expiresIn: 3600
  });
};

exports.verifyOrdinaryUser = function(req,res,next){
  //check header or url parameters or post parameters for token 
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  
  //decode token 
  if(token){
      //verifies secret and checks exp 
      jwt.verify(token, config.secretKey,function(err,decoded){
         if(err){
             var err = new Error('You are not authenticated!');
             err.status = 401;
             return next(err);
         } else{
             //if ecerything is good, save to request for user in other routs
             req.decoded = decoded;
             next();
         }
      });
  }else{
      var err = new Error('No token provided!');
      err.status = 403;
      return next(err);
  }
};

exports.verifyAdmin = function(req,res,next){
    var isAdmin = req.decoded._doc.admin;
    if(isAdmin){
        return next();
    }else{
        //if user is not admin return error 
        var err = new Error('You are not authorized to perform this operation!');
        err.status = 403;
        return next(err);
    }
};