/**
 * Users.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  // DEV PURPOSE, set to true
  schema: true,
  // We use uuid for the ID
  primaryKey: 'id',
  dontUseObjectIds: true,

  attributes: {
    id: {
      type: 'string',
      isUUID: true,
      columnName: '_id',
      required: true,
      unique: true,
    },
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
    email: {
      type: 'string',
      required: true,
      unique: true,
    },
    password: {
      type: 'string',
    },
    isAdmin: {
      type: 'boolean'
    },
    isDelete: {
      type: 'boolean'
    },
  },

  customToJSON() {
    return _.omit(this, ['password', 'isDelete']);
  },
};
