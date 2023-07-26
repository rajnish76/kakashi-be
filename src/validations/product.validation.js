const Joi = require('joi');

const addProduct = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    imageUrl: Joi.string().required(),
    quantity: Joi.number().required(),
    isActive: Joi.boolean().required(),
    taxable: Joi.boolean().required(),
  }),
};

module.exports = {
  addProduct,
};
