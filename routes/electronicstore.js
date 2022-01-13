const {Electronic,validate} = require('../models/Electronic');
const express = require('express');
const _ = require('lodash');
const router = express.Router();
const joi = require('joi');
const {isValidObjectId} = require('mongoose');
require('express-async-errors');

router.get('/',(req,res)=>{
    res.send("Welcome to the Electronic Store...");
});


router.post('/additem',async(req,res)=>{
    let {error} = validate(req.body);
    if(error){
        res.send(`Please provide the correct info: ${error}`);
        return;
    }

    const Electro = new Electronic(_.pick(req.body,['itemName','price','category','Madein']));
    let result = await Electro.save();
    res.status(200).send(result);
})

router.get('/showme',async(req,res)=>{
    
    const Electro = await Electronic.find();
    res.status(200).send(Electro);
});

router.put('/updItem/:id',async(req,res)=>{
   
    if(!isValidObjectId(req.params.id))
        return res.status(400).send("Not a valid id");

    const Electro = await Electronic.findById(req.params.id);

    if(!Electro)
    {
        res.status(404).send(`item not found${req.params.id}`);
        return;
    }
    Electro.price = req.body.price;
    await Electro.save();
    res.status(200).send(`saved the item , ${Electro}`);
})

router.delete('/deleteItem/:id',async(req,res)=>{
    if(!isValidObjectId(req.params.id))
        return res.status(400).send("Not a Valid product");

    const Electro = await Electronic.findById(req.params.id);

    if(!Electro)
        return res.status(404).send("Item not found");
    
    await Electronic.deleteOne({_id:req.params.id});
    res.status(200).send("ITEM is deleted");
});

module.exports = router;