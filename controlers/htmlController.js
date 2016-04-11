//load dependencies
var bodyParser = require('body-parser');
var home = require('../routes/home');

module.exports = function(app){
    app.get('/',home.homePage);
    
}