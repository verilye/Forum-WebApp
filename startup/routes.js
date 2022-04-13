const express = require('express');
const login = require('../routes/login');
const register = require('../routes/register');
const forum = require('../routes/forum');
const profile = require('../routes/profile');


module.exports = function(app){
    
    app.use('/', login);
    app.use('/register', register);
    app.use('/forum', forum);
    app.use('/profile', profile);
}