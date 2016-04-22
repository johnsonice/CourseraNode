//dishcomments model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create a Schema
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

var dishcomments = mongoose.model('dishcomments',dishcommentsSchema);
module.exports = dishcomments;
