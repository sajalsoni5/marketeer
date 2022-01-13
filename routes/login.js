require('express-async-errors');
const express = require('express');
const {User} = require('../models/user');
const _ = require('lodash');
const router = express.Router();
const joi = require('joi');
const bcrypt = require('bcrypt');


router.get('/',(req,res)=>{
    res.send("you are on login page");
});

router.post('/',async(req,res)=>{
    const {error} = validate(req.body);
    throw new Error('could not login');
    if(error)
    {
        res.status(401).send(`Please check email or password ${error}`); 
        return;  
    }

    const user = await User.findOne({'email':req.body.email});
    if(!user)
        return res.status(404).send('email or password does not match');

    const validator = await bcrypt.compare(req.body.password,user.password);
    if(!validator)
        return res.status(404).send('email or password is wrong');
    
    const token = user.generateAuth();
    
    res.header('x-auth-token',token).send('corrrect');

});

function validate(you){
    schema = joi.object({
        email:joi.string().email().required(),
        password:joi.string().min(8).required()
    });

    return schema.validate(you);
}

module.exports = router;