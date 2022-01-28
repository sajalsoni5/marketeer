require('express-async-errors');
const express = require('express');
const _ = require('lodash');
const router = express.Router();
const {isValidObjectId} = require('mongoose');
const auth = require('../Middleware/auth')
router.get('/',(req,res)=>{
    res.send('hello return')
})
router.post('/',auth,(req,res)=>{
    if(!req.body.user_id)
        return res.status(400).send('user id not provided');

    if(!req.body.movie_id)
        return res.status(400).send('movie id not provided');

});


module.exports = router;