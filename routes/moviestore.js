require('express-async-errors');
const {Movie,validateMovie} = require('../models/movie');
const express = require('express');
const _ = require('lodash');
const router = express.Router();
const {isValidObjectId} = require('mongoose');
const auth = require('../Middleware/auth');
const admin = require('../Middleware/admin');


router.get('/',(req,res)=>{
    res.send("Welcome to the Movie Store");
});


router.post('/addMovie',auth,async(req,res)=>{
    let {error} = validateMovie(req.body);
    if(error){
        res.status(400).send(`Please provide the correct info: ${error}`);
        return;
    }

    const Movies = new Movie(_.pick(req.body,['title','price','stock']));
    
    let result = await Movies.save();
    res.status(200).send(result);
    
});

router.get('/showMovies',async(req,res,next)=>{
    const Movies = await Movie.find();
    res.status(200).send(Movies);
    
});

router.put('/updPrc/:id',auth,async(req,res,next)=>{
   
    if(!isValidObjectId(req.params.id))
        return res.status(400).send("Not a valid id");

    const Movies = await Movie.findById(req.params.id);

    if(!Movies)
    {
        res.status(404).send(`item not found${req.params.id}`);
        return;
    }
    Movies.price = req.body.price;
    const result = await Movies.save();
    res.status(200).send(`saved the book , ${result}`);
    
});

router.delete('/deleteItem/:id',[auth,admin],async(req,res,next)=>{
    if(!isValidObjectId(req.params.id))
        return res.status(400).send("Not a Valid product");
    
    const Movies = await Movie.findById(req.params.id);
    if(!Movies)
        return res.status(404).send("Book not found");
    
    await Movie.deleteOne({_id:req.params.id});
    res.status(200).send("Movie is deleted");}
    
);



module.exports = router;