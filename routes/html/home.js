var express = require('express');

/* GET home page. */
exports.homePage=function(req,res,next) {
    res.send(
         "Render Home Page here"
    );
}


