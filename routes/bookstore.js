require('express-async-errors');
const {Book,bookValidator} = require('../models/book');
const express = require('express');
const _ = require('lodash');
const router = express.Router();
const joi = require('joi');
const {isValidObjectId, mongoose } = require('mongoose');
const ObjectId= require('mongoose').Types.ObjectId;


router.get('/',(req,res)=>{
    res.send("Welcome to the BOok Store");
});


router.post('/addbook',async(req,res)=>{
    let {error} = bookValidator(req.body);
    if(error){
        res.send(`Please provide the correct info: ${error}`);
        return;
    }

    const Books = new Book(_.pick(req.body,['name','price','genre','author','publishYear']));
    
    let result = await Books.save();
    res.status(200).send(result);
    
});

router.get('/showBooks',async(req,res,next)=>{
    const Books = await Book.find();
    res.status(200).send(Books);
    
});

router.put('/updPrc/:id',async(req,res,next)=>{
   
    if(!isValidObjectId(req.params.id))
        return res.status(400).send("Not a valid id");

    const Books = await Book.findById(req.params.id);

    if(!Books)
    {
        res.status(404).send(`item not found${req.params.id}`);
        return;
    }
    Books.price = req.body.price;
    await Books.save();
    res.status(200).send(`saved the book , ${Books}`);
    
});

router.delete('/deleteItem/:id',async(req,res,next)=>{
    if(!isValidObjectId(req.params.id))
        return res.status(400).send("Not a Valid product");
    
    const Books = await Book.findById(req.params.id);
    if(!Books)
        return res.status(404).send("Book not found");
    
    await Book.deleteOne({_id:req.params.id});
    res.status(200).send("Book is deleted");}
    
);



module.exports = router;