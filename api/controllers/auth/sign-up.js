module.exports = {


  friendlyName: 'Signup',


  description: 'Signup user.',


  inputs: {
    firstName: {
      type: 'string',
      minLength: 1,
      maxLength: 35,
      required: true,
    },
    middleName: {
      type: 'string',
      minLength: 1,
      maxLength: 35,
    },
    lastName: {
      type: 'string',
      minLength: 1,
      maxLength: 35,
      required: true,
    },
    gender: {
      type: 'string',
      isIn: ['other', 'male', 'female'],
    },
    dob: {
      type: 'string',
    },
    email: {
      type: 'string',
      required: true,
      unique: true,
    },
    password: {
      type: 'string',
      required: true,
      minLength: 8
    },
    isAdmin: {
      type: 'boolean'
    },
  },


  exits: {
    success: {
      description: 'All done.',
      responseType: 'success'
    },
    somethingHappened: {
      responseType: 'badRequest'
    }
  },


  fn: async function (inputs, exits) {
    if (inputs) {
      throw { somethingHappened: { message: 'ngu' } };
    }
    // All done.
    return exits.success(inputs);
  }
};
