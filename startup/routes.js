const express = require('express');
const login = require('../pages/login/login')
const database = require('../pages/database/database');

module.exports = function(app){

    app.use(express.json());
    app.use('/', login);
    app.use('/database', database);
}