import Joi from 'joi';

// Joi is used for validation purposes
export const userSchemaForValidationOnRegistration = Joi.object({
  name: Joi.string().alphanum().required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string()
    .min(6)
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    .required(),
  role: Joi.string().required(),
});

export const userSchemaForValidationOnLogin = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string()
    .min(6)
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    .required(),
});
