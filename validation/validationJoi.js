//VALIDATION
const Joi = require('@hapi/joi');

//REGISTER VALIDATION
const registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(2).required(),
        password: Joi.string().min(6).required(),
    });
    return schema.validate(data);
}

//LOGIN VALIDATION
const loginValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(2).required(),
        password: Joi.string().min(6).required(),
    });
    return schema.validate(data);
}

//POST VALIDATION
const postValidation = (data) => {
    const schema = Joi.object({
        title: Joi.string().min(1).required().messages({'string_empty': 'Añadir un titulo al post'}),
        text: Joi.string().min(1).required().messages({'string_empty': 'Añadir un texto al post'}),
    });
    return schema.validate(data);
}

//COMMENT VALIDATION
const commentValidation = (data) => {
    const schema = Joi.object({
        text: Joi.string().min(1).required().messages({'string_empty': 'Añadir un texto al comentario'}),
    });
    return schema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.postValidation = postValidation;
module.exports.commentValidation = commentValidation;

//if(error) return res.status(400).send(error.details[0].message);
