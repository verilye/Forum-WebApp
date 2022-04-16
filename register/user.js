const jwt = require('jsonwebtoken');
const Joi = require('joi');

const User = Joi.object({
    user_name: Joi.string()
        .alphanum()
        .min(3)
        .max(20)
        .required(),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    
    repeat_password: Joi.ref('password'),
})

User.methods.generateAuthToken = function(){

    return token = jwt.sign({_id:this.id}, config.get('jwtPrivateKey'));

}

exports.User = User;