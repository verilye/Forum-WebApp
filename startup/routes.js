const express = require('express');
const login = require('../pages/login/login');
const register = require('../pages/register/register');
const forum = require('../pages/forum/forum');
const user = require('../pages/user/user');

module.exports = function(app){

    app.use(express.json());
    app.use('/', login);
    app.use('/register', register);
    //app.use('/forum', forum);
    // app.use('/user', user);
}