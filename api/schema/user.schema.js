const Joi = require('joi');

const validateUpdateUser = (data) => {
  const schema = Joi.object().keys({
    firstName: Joi.string().min(1).max(80).optional(),
    middleName: Joi.string().max(80).optional().allow(''),
    lastName: Joi.string().min(1).max(80).optional(),
  });
  return schema.validate(data);
};

module.exports = {
  validateUpdateUser
};
