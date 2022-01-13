const winston = require('winston');
module.exports = function(err,req,res,next){
    winston.log('info',err.message,err);
    res.status(500).send(`something failed miserably ${err}`);
}