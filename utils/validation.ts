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

export const productSchemaToAddNewOne = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  category: Joi.string().required(),
  sizes: Joi.array().required(),
  onSale: Joi.string().required(),
  priceDrop: Joi.number().required(),
  imageUrl: Joi.string().required(),
});

export const cartPropsValidation = Joi.object({
  userID: Joi.string().required(),
  productID: Joi.string().required(),
});
