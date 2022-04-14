const Joi = require('joi');

const Post = {
    user_name:Joi.string()
        .required(),
    
    subject:Joi.string()
        .required()
        .min(3)
        .max(15),

    msg:Joi.string()
        .required()
        .min(3)
        .max(280)
    ,
    
    img:Joi.string()
    
}



module.exports = {createNewPost, updatePost}
   