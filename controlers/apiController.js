//load dependencies
var bodyParser = require('body-parser');
var user = require('../routes/api/user');
var dish = require('../routes/api/dish');
var Verify = require('../tools/auth/verify');
module.exports = function(app){
	//user
        //varify admin rights
    app.get("/api/users",Verify.verifyOrdinaryUser,Verify.verifyAdmin,user.getUserList); //added varify user function
    app.post("/api/user/register",user.register);
    app.post("/api/user/login",user.login); 
    app.get("/api/user/logout",user.logout); 
    //dishes routes
    app.get("/api/dishes",Verify.verifyOrdinaryUser,dish.getDishList);
    app.delete("/api/dish/:id",dish.remove);
    app.post("/api/newdish",dish.newDish);
    app.put("/api/updatedish/:id",dish.updateDish);
     //comments
    app.post("/api/dishcomments/:id",Verify.verifyOrdinaryUser,dish.insertComment);
    app.put("/api/dishcomments/:dishId/:commentId",Verify.verifyOrdinaryUser,dish.editComments);
    app.delete("/api/dishcomments/:id",Verify.verifyOrdinaryUser,dish.removeComments);
}


