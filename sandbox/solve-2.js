var rect = require('./rectangle-2'); // has error handle there

function solveRect(l,b){
    console.log("Solving for rectangle with l=" + l + " and b = " + b);
    
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

solveRect(1,1);
