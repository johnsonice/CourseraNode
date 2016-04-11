var express = require('express');

/* GET home page. */
exports.homePage=function(req,res,next) {
    res.json({
        result: "Render Home Page here"
    });
}


