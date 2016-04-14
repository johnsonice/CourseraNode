var express = require('express');

/* GET users listing. */
exports.getUserList=function(req,res,next) {
    res.json({
        result: true,
        data:{"test": "testing"}
    });
    
}
