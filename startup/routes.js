const morgan = require('morgan');
const login = require('../routes/login.js');
const register = require('../routes/register.js');
const bookStore = require('../routes/bookstore');
const fashionstore = require('../routes/fashionstore');
const Electronic = require('../routes/electronicstore');
const rr = require('../routes/returns');
const rentalStore = require('../routes/rentstore');
const movieStore = require('../routes/moviestore');
const error = require('../Middleware/error.js');
const express = require('express');

module.exports = function (app) {
    app.use(express.static('Public'));
    app.use(express.json());
    app.use(morgan('tiny'));



    app.use('/api/register', register);
    app.use('/api/login', login);
    app.use('/api/bookStore', bookStore);
    app.use('/api/fashion', fashionstore);
    app.use('/api/Electrics', Electronic);
    app.use('/api/rentalstore', rentalStore);
    app.use('/api/moviestore', movieStore);
    app.use('/api/returns', rr);

    app.use(error);

    app.get('/', (req, res) => {
        res.send("<h1>You are connected to our website now</h1>");
    });
}