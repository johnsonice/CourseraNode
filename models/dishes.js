//disses model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create comments sub document Schema
var dishcommentsSchema = new Schema({
	rating:{
		type:Number,
		min:1,
		max:5,
		required:true
	},
	comment:{
		type:String,
		require:true
	},
	author:{
		type: String,
		required:true
	}
	},
	{timestamps: true} // this will add created at and updated at automatically
);

//create a Schema
var dishSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	description: {
		type: String,
		required: true
	}, 
	comments:[dishcommentsSchema]
	},
	{timestamps: true} // this will add created at and updated at automatically
);

var Dishes = mongoose.model('Dish',dishSchema);
module.exports = Dishes;
