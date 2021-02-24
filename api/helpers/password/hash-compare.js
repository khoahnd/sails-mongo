const bcrypt = require('bcrypt');

module.exports = {

  friendlyName: 'Password Hash Generator',

  description: 'Password Hash Generator',

  inputs: {
    candidatePassword: {
      description: 'Candidate password',
      type: 'string',
      required: true
    },
    password: {
      description: 'Password',
      type: 'string',
      required: true
    }
  },

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: async function (inputs, exits) {
    const { candidatePassword, password } = inputs;
    try {
      const isMath = await bcrypt.compare(candidatePassword, password);
      return exits.success(isMath);
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      return exits.success(false);
    }
  }
};
