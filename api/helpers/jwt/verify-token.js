const jwt = require('jsonwebtoken');
const { SECRET } = sails.config.custom;

module.exports = {
  friendlyName: 'Verify token',

  description: 'Verify token',

  inputs: {
    token: {
      type: 'string',
      defaultsTo: '',
    },
    type: {
      type: 'string',
      defaultsTo: '',
    },
  },

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: async function (inputs, exits) {
    let { token, type } = inputs;
    let response = {};
    try {
      if (type !== 'refresh') {token = token.split(' ')[1];}
      switch (type) {
        case 'refresh':
          response.payload = await jwt.verify(token, `refresh_${SECRET}`);
          break;
        default:
          response.payload = await jwt.verify(token, SECRET);
          break;
      }
      response.isVerify = response.payload.exp * 1000 > _.now();
      return exits.success(response);
    } catch (error) {
      response.isVerify = false;
      response.errorType = error.name
        ? error.name.toLowerCase()
        : 'undefined_error';
      return exits.success(response);
    }
  },
};
