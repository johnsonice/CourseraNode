//user module
var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs'); // for encription 


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
    
    email:{
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

//this two are used the new schema object
UserSchema.methods.getName = function(){
    return (this.firstname + ' ' + this.lastname);
};

UserSchema.methods.createUser = function(newUser,callback){
   this.model('Users')
       .find({email:this.email})
       .exec(function(err,item){
           if(!item){
            bcrypt.genSalt(10,function(err,salt){
                bcrypt.hash(newUser.password,salt,function(err,hash){
                    newUser.password = hash;
                    newUser.save(callback);
                });
            }); 
           } else{
               var err = new Error('Duplicate email address');
               err.message = 'Duplicate email address'; 
               err.status = 500;
               callback(err);
           }
       })
};


var Users = mongoose.model('Users', UserSchema);
module.exports = Users;

// these functions are exported with the users module
module.exports.getUserByEmail = function(email,callback){
    var query = {email:email};
    this.model('Users').findOne(query,callback);
};

module.exports.comparePassword = function(candidatePassword,hash,callback){
    bcrypt.compare(candidatePassword,hash,function(err,isMatch){
        //if(err) throw err;
        callback(err,isMatch);
    })
}