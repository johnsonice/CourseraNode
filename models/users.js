//user module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    email: {
        type: String,
        index: {
            unique: true
        }
    },
    password: {
        type: String
    },

    username: {
        type: String,
        default: ''
    }

});


var Users = mongoose.model('User', UserSchema);
module.exports = Users;