/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const userService = new (require('../services/user-service'))();

module.exports = {
  findById: async (req, res) => {
    return userService.findUserById(req, res);
  },

  // find: async (req, res) => {

  // },

  updateById: async (req, res) => {
    return userService.updateUserById(req, res);
  },

  // deleteById: async (req, res) => {

  // }
};

