const Joi = require('joi');

const registerUser = {
  body: Joi.object().keys({
    userId: Joi.string().required(),
  }),
};

module.exports = {
  registerUser,
};
