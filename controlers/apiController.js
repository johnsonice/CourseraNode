//load dependencies
var bodyParser = require('body-parser');
var user = require('../routes/api/user');
var dish = require('../routes/api/dish');

module.exports = function(app){
	//test
    app.get("/api/test",user.getUserList);
    
    //dishes routes
    app.get("/api/dishes",dish.getDishList);
    app.use("/api/newdish",dish.newDish);
    app.use("/api/updatedish/:id",dish.updateDish);
    app.use("/api/newdishcomment/:id",dish.insertComment);
}


