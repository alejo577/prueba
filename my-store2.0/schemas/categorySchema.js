const Joi = require('joi');


const id = Joi.string().uuid();
const category = Joi.string().min(3).max(15);
const description = Joi.string(). max(500);


const createCategorySchema = Joi.object({
    category: category.required(),
    description: description.required(),
});

const updateCategorySchema = Joi.object({
    category: category,
    description: description
});

const getCategorySchema = Joi.object({
    id: id.required(),
})
module.exports = { createCategorySchema, updateCategorySchema, getCategorySchema }