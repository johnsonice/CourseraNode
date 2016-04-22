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
		name:'Uthapizza4',
		description:'Test'
	},function(err,dish){
		if(err) throw err;
		res.json('dish created; id: '+ dish.id);
	});
};


exports.updateDish = function(req,res,next) {
	var dishId = req.params.id;
	Dishes.findByIdAndUpdate(dishId,{
			$set:{
				description:'Updated Test2'
			}
		},{
			new: true
		}
		)
	.exec(function(err,dish){
		if(err) throw err;
		res.json(dish);
	});

};

//insert comments to a dish
exports.insertComment = function(req,res,next) {
	var dishId = req.params.id;
	console.log(dishId);
	Dishes.findById(dishId)
		.exec(function(err,dish){
		if(err) throw err;
		dish.comments.push({
			rating:4,
			comment:'it is not as good',
			author:'chengyu Huang'
		});

		dish.save(function(err,dish){
			if(err) throw err;
			res.json(dish);
		});

	});

};