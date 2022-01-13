const mongoose = require('mongoose');
const joi = require('joi');

const fashSchema = new mongoose.Schema({
    itemName:{
        type:String,
        required:true,
        minlength:2,
        maxlength:50
    },
    price:{
        type:Number,
        required:true,
        min:0
    },
    Brand:{
        type:String,
        minlength:2,
        enum:['gucci','puma','adidas','levis','zara','reebok','leecooper']
        
    },
    fabric:String
    
});

const Clothe = mongoose.model('fashionStore',fashSchema);

function validate(cl){
    let schema = joi.object({
        itemName:joi.string().min(2).required(),
        price:joi.number().min(0).required(),
        Brand:joi.string().min(3),
        fabric:joi.string().min(2)
    });
    return schema.validate(cl);
}

module.exports.Clothe = Clothe;
module.exports.validate = validate;