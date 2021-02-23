/**
 * AuthenticationController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  signIn: (req, res) => {
    return res.status(200).json({ a: 'test' });
  },

  logout: (req, res) => {
    return res.status(200).json({ a: 'test' });
  },
};

