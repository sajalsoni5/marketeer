const morgan = require('morgan');
const login = require('../routes/login.js');
const register = require('../routes/register.js');
const bookStore = require('../routes/bookstore');
const fashionstore = require('../routes/fashionstore');
const Electronic = require('../routes/electronicstore');
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

    app.use(error);

    app.get('/', (req, res) => {
        res.send("<h1>You are connected to our website now</h1>");
    });
}