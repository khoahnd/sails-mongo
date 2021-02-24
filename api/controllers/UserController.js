/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const userService = new (require('../services/user-service'))();

module.exports = {
  findById: async (req, res) => {
    return userService.findById(req, res);
  },

  find: async (req, res) => {
    return userService.getList(req, res);
  },

  updateById: async (req, res) => {
    return userService.updateById(req, res);
  },

  deleteById: async (req, res) => {
    return userService.deleteById(req, res);
  }
};

