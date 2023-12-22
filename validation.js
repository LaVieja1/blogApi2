//VALIDATION
const Joi = require('@hapi/joi');

//REGISTER VALIDATION
const registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(2).required(),
        password: Joi.string().min(6).required(),
    })
    return schema.validate(data);
}

//LOGIN VALIDATION
const loginValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(2).required(),
        password: Joi.string().min(6).required(),
    })
    return schema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;

//if(error) return res.status(400).send(error.details[0].message);
