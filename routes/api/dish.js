//dishes routes
var express = require('express');
var Dishes = require('../../models/dishes');

/* GET users listing. */
exports.getDishList = function(req,res,next) {
		Dishes.find({},function(err,dishes){
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
        console.log(dish);
		dish.comments.push({
			rating:req.body.rating,
			comment:req.body.comment,
			author:req.body.author
		});

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