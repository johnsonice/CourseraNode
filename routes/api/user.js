var express = require('express');
var User = require('../../models/users');

/* GET users listing. */
exports.getUserList = function(req,res,next) {
		User.find({},function(err,users){
			if(err) throw err;
			res.json(users);
		});
    /*
    res.json({
        result: true,
        data:{"test": "testing"}
    });
    */
};
