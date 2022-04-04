const express = require('express');
const login = require('../routes/login');
const register = require('../routes/register');
const forum = require('../routes/forum');
const user = require('../routes/user');

module.exports = function(app){

    app.use(express.json());
    app.use('/', login);
    app.use('/register', register);
    //app.use('/forum', forum);
    // app.use('/user', user);
}