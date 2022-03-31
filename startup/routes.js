const express = require('express');
const login = require('../pages/login/login')
const register = require('../pages/register/register')
const database = require('../pages/database/database');

module.exports = function(app){

    app.use(express.json());
    app.use('/', login);
    app.use('/register', register);
    app.use('/database', database);
}