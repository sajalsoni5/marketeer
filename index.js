const express = require('express');
const mongoose = require('mongoose');
const joi = require('joi');
const jwt = require('jsonwebtoken');
const morgan = require('morgan');
const config = require('config');
const login = require('./routes/login.js');
const register = require('./routes/register.js');
const bookStore = require('./routes/bookstore');
const fashionstore = require('./routes/fashionstore');
const Electronic = require('./routes/electronicstore');
const error = require('./Middleware/error.js');
const winston = require('winston');
const { transports } = require('winston');

process.on('uncaughtException',(ex)=>{
    winston.error(ex.message,ex);
})

mongoose.connect(config.get('db'))
.then(()=>console.log('connneted to database'))
.catch((err)=>console.log('Unable to connect to db',err));


winston.add(winston.transports.File,{filename:'./logs/logfile.log'});

const app = express();

app.use(express.static('Public'));
app.use(express.json());
app.use(morgan('tiny'));



app.use('/api/register',register);
app.use('/api/login',login);
app.use('/api/bookStore',bookStore);
app.use('/api/fashion',fashionstore);
app.use('/api/Electrics',Electronic);

app.use(error);

app.get('/',(req,res)=>{
    res.send("<h1>You are connected to our website now</h1>");
});




let ports = config.get('port');
app.listen(ports,'127.0.0.1',()=>console.log(`Listening on port ${ports}`));

