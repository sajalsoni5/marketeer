require('express-async-errors');
const express = require('express');
const _ = require('lodash');
const {User,validate} = require('../models/user.js');
const bcrypt = require('bcrypt');

const router = express.Router();

router.get('/',(req,res)=>{
    res.status(200).send("Register as a new User");
});

router.post('/',async(req,res)=>{
    let {error} = validate(req.body);
    if(error){
        res.send(`Please provide the correct info ${error}`);
        return;
    }
    const found = await User.findOne({email:req.body.email});
    if(found)
    {
        console.log(typeof found);
        console.log(JSON.stringify(found));
        return res.status(404).send(`${found}, User already exists`);
    }
    const salt = await bcrypt.genSalt(10);
    
    const user = new User(_.pick(req.body,['name','email','password','age','isAdmin']));
    
    user.password =  await bcrypt.hash(req.body.password,salt);
    let result = await user.save();
    const token = user.generateAuth();
    
    res.header('x-auth-token',token).status(200).send(result);
    
})

module.exports = router;