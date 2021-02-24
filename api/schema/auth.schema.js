const Joi = require('joi');

const validateSignUp = (data) => {
  const schema = Joi.object().keys({
    firstName: Joi.string().min(1).max(80).required(),
    middleName: Joi.string().max(80).optional(),
    lastName: Joi.string().min(1).max(80).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password: Joi.string().min(8).max(30).required(),
    isAdmin: Joi.bool().optional().default(false)
  });
  return schema.validate(data);
};

const validateSignIn = (data) => {
  const schema = Joi.object().keys({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password: Joi.string().min(8).max(30).required(),
  });
  return schema.validate(data);
};

module.exports = {
  validateSignUp,
  validateSignIn
};
