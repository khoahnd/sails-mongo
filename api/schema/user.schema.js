const Joi = require('joi');

const validateUpdateUser = (data) => {
  const schema = Joi.object().keys({
    firstName: Joi.string().min(1).max(80).optional(),
    middleName: Joi.string().min(1).max(80).optional(),
    lastName: Joi.string().min(1).max(80).optional(),
  });
  return schema.validate(data, { allowUnknown: false });
};

module.exports = {
  validateUpdateUser
};
