//dishes routes
var express = require('express');
var Dishes = require('../../models/dishes');

/* GET users listing. */
exports.getDishList = function(req,res,next) {
		Dishes.find({})
        .populate('comments.postedBy')
        .exec(function(err,dishes){
			if(err) throw err;
			res.json(dishes);
		});
};

exports.newDish = function(req,res,next) {
    Dishes.create({
		name:req.body.name,
		description:req.body.description
	},function(err,dish){
		if(err) throw err;
		res.json('dish created; id: '+ dish.id + " dishname: " + dish.name);
	});
 
};

exports.remove = function(req,res,next){
    var dishId = req.params.id;
    Dishes.findByIdAndRemove(dishId)
    .exec(function(err,dish){
        if(err) throw err;
        res.json(dish);
    })
};


exports.updateDish = function(req,res,next) {
	var dishId = req.params.id;
	Dishes.findByIdAndUpdate(dishId,{
			$set:{
				description:req.body.description
			}
		},{new: true}
	)
	.exec(function(err,dish){
		if(err) throw err;
		res.json(dish);
	});

};

//how to handle subdocuments
//insert comments to a dish
exports.insertComment = function(req,res,next) {
	var dishId = req.params.id;
	Dishes.findById(dishId)
		.exec(function(err,dish){
		if(err) throw err;
        req.body.postedBy = req.decoded._doc._id; //store user id here for population
		dish.comments.push({
			rating:req.body.rating,
			comment:req.body.comment,
			postedBy:req.body.postedBy
		});
        console.log(dish);
		dish.save(function(err,dish){
			if(err) throw err;
			res.json(dish);
		});
	});
};

exports.removeComments = function(req,res,next) {
	var dishId = req.params.id;
	Dishes.findById(dishId)
		.exec(function(err,dish){
            if(err) throw err;
            dish.comments = [];

            dish.save(function(err,dish){
                if(err) throw err;
                res.json(dish);
            });
	      });
};

exports.editComments = function(req,res,next){
    var dishId = req.params.dishId;
    var commentId = req.params.commentId
    var userId = req.decoded._doc._id;
    
    Dishes.findById(dishId)
        .exec(function(err,dish){
            dish.comments.id(commentId).remove();
            req.body.postedBy = userId;
            dish.comments.push(req.body);
            
            dish.save(function(err,dish){
                if(err) throw err;
                console.log('Updated Comments!');
                res.json(dish);
            }); 
        });  
};