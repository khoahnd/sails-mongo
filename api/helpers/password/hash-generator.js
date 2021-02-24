const bcrypt = require('bcrypt');

module.exports = {
  friendlyName: 'Password Hash Generator',

  description: 'Password Hash Generator',

  inputs: {
    password: {
      description: 'password',
      type: 'string',
      required: true,
    },
  },

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: async function (inputs, exits) {
    const { password } = inputs;
    const salt = await bcrypt.genSalt(
      sails.config.custom.SALT_WORK_FACTOR,
    );
    const hash = await bcrypt.hash(password, salt);
    return exits.success(hash);
  },
};
