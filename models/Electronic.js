const mongoose = require('mongoose');
const joi = require('joi');

const elSchema = new mongoose.Schema({
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
    category:{
        type:String,
        minlength:2,
        enum:['home appliance','Mobile','Laptop','Computers','Computer peripherals']
        },

    Madein:String
    
});

const Electronic = mongoose.model('Electronics',elSchema);

function validate(el){
    let schema = joi.object({
        itemName:joi.string().min(2).required(),
        price:joi.number().min(0).required(),
        category:joi.string().min(3),
        Madein:joi.string().min(3)
    });
    return schema.validate(el);
}

module.exports.Electronic = Electronic;
module.exports.validate = validate;