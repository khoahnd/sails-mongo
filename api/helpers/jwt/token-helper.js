const jwt = require('jsonwebtoken');

module.exports = {

  friendlyName: 'Token Generator',

  description: 'Token Generator',

  inputs: {
    payload: {
      description: 'Payload token',
      type: 'ref',
      required: true
    },
    secret: {
      description: 'Secret key',
      type: 'string',
      required: true
    },
    expiresIn: {
      description: 'Secret key',
      type: 'number',
      required: true
    }
  },

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: async function (inputs, exits) {
    const { payload, secret, expiresIn } = inputs;
    const token = await jwt.sign(payload, secret, {expiresIn: expiresIn});
    return exits.success({ token, expires: jwt.decode(token).exp });
  }
};
