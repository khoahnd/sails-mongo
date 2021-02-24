const { SECRET, TOKEN_EXPIRES, REFRESH_TOKEN_EXPIRES } = sails.config.custom;

module.exports = {

  friendlyName: 'Token generator',

  description: 'Token generator',

  inputs: {
    payload: {
      description: 'Payload token',
      type: 'ref',
      required: true
    },
    type: {
      description: 'type',
      type: 'string',
      required: true
    },
    refreshToken: {
      description: 'refreshToken',
      type: 'string'
    }
  },

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: async function (inputs, exits) {
    const { payload, type, refreshToken } = inputs;
    const response = {};
    switch (type) {
      case 'sign-up':
      case 'sign-in':
        const tokenObj = await sails.helpers.jwt.tokenHelper.with({ payload, secret: SECRET, expiresIn: TOKEN_EXPIRES });
        response.accessToken = tokenObj.token;
        response.expires = tokenObj.expires;
        const refreshTokenObj = await sails.helpers.jwt.tokenHelper.with({ payload, secret: `refresh_${SECRET}`, expiresIn: REFRESH_TOKEN_EXPIRES });
        response.refreshToken = (refreshToken && refreshToken.length > 0) ? refreshToken : refreshTokenObj.token;
        break;
    }
    return exits.success(response);
  }
};
