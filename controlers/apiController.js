//load dependencies
var bodyParser = require('body-parser');
var user = require('../routes/api/user');
var dish = require('../routes/api/dish');

module.exports = function(app){
	//test
    app.get("/api/test",user.getUserList);
    
    //dishes routes
    app.get("/api/dishes",dish.getDishList);
    app.delete("/api/dish/:id",dish.remove);
    app.post("/api/newdish",dish.newDish);
    app.put("/api/updatedish/:id",dish.updateDish);
     //comments
    app.post("/api/dishcomments/:id",dish.insertComment);
    app.delete("/api/dishcomments/:id",dish.removeComments);
}


