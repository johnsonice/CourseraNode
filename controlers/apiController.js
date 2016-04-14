//load dependencies
var bodyParser = require('body-parser');
var user = require('../routes/api/user');

module.exports = function(app){
    app.get("/api/test",user.getUserList);
    
    
}


