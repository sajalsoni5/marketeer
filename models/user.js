const mongoose = require('mongoose');
const joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:2,
        maxlength:50
    },
    age:{
        type:Number,
        required:true,
        min:12,
        max:150
    },
    email:{
        type:String,
        required:true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        trim:true,
        unique:true,
        lowercase:true        
    },
    password:{
        type:String,
        required:true,
        min:8,
        max:1000
    },
    isAdmin:Boolean
});

userSchema.methods.generateAuth = function(){
    const token= jwt.sign({id:this._id,email:this.email,isAdmin:this.isAdmin},config.get('private'));
    return token;
}

const User  = mongoose.model('user',userSchema);
function validateU(user){
    let schema = joi.object({
        name:joi.string().min(3).required(),
        password:joi.string().min(8).required(),
        age:joi.number().min(12).required(),
        email:joi.string().email().required(),
        isAdmin:joi.boolean()
    });

    return schema.validate(user);
}

module.exports.User = User;
module.exports.validate = validateU;

