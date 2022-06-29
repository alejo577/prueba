const Joi = require('joi');


const id = Joi.string().uuid();
const name = Joi.string().min(3).max(15);
const lastname = Joi.string().min(10);
const email = Joi.string().email();
const password = Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'));
const phone = Joi.number().integer().min(10);

const createUserSchema = Joi.object({
    name: name.required(),
    lastname: lastname.required(),
    email: email.required(),
    password: password.required(),
    phone: phone.required(),
});

const updateUserSchema = Joi.object({
    name: name,
    lastname: lastname,
    email: email,
    password: password,
    phone: phone,
});

const getUserSchema = Joi.object({
    id: id.required(),
})
module.exports = { createUserSchema, updateUserSchema, getUserSchema }