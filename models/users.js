//user module
var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    password: {
        type: String
    },

    username: {
        type: String,
        index:{
            unique:true
        }
    },
    
    admin: {
        type: Boolean,
        default: false
    },
    
    firstname:{
        type:String,
        default:''
    },
        
    lastname:{
        type:String,
        default:''
    }

});

UserSchema.methods.getName = function(){
    return (this.firstname + ' ' + this.lastname);
};

UserSchema.plugin(passportLocalMongoose); //use passport-local-mongoose plugin

var Users = mongoose.model('Users', UserSchema);
module.exports = Users;