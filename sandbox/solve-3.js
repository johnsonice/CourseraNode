var rect = require('./rectangle-2'); // has error handle there
var argv = require('yargs')
    .usage('Usage: node $0 --l=[num] --b=[num]')
    .demand(['l','b'])
    .argv;


function solveRect(l,b){
    console.log("Solving for rectangle with l=" + argv.l + " and b = " + argv.b);
    
    rect(l,b,function(err,rect){
        if(err){
            console.log(err);
        }
        else{
            console.log("area: " + rect.area(l,b));
            console.log("perimeter: " + rect.perimeter(l,b));
        }
    });
}

solveRect(argv.l,argv.b);
