const Joi = require('joi');

const emailSchema = Joi.string().email();

const passwordSchema = Joi.string().min(6);

const displayNameSchema = Joi.string().min(8);

module.exports = {
  emailSchema,
  passwordSchema,
  displayNameSchema,
};