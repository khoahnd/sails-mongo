/**
 * AuthController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const authService = new (require('../services/auth-service'))();

module.exports = {
  signUp: async (req, res) => {
    return authService.signUp(req, res);
  },

  signIn: async (req, res) => {
    return authService.signIn(req, res);
  }
};
