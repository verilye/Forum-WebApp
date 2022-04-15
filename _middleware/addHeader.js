module.exports = function(req,res,next){

    try{

        res.setHeader("Content-Type", "application/json");

    }catch(err){
        console.log(err);
    }

    next();
    
}