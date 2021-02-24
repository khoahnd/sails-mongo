const { errors } = require('../common');
const { InternalServer, Unauthorized } = require('../response');
const AuthService = require('../services/auth-service');

/**
 * @name isAuth
 * @desc Verify if the requester is properly auth
 *
 * EXPERIMENTAL Set up a real authentication process
 *              with a JWT token
 */
module.exports = async function isAuth(req, res, next) {
  const { authorization } = req.headers;
  try {
    const authService = new AuthService();
    const auth = await authService.authorization(authorization);
    if (!auth.isVerify) {
      if (auth.errorType.toLowerCase() === 'tokenexpirederror') {
        return Unauthorized(res, {
          message: errors.auth.ERR_INVALID_AUTHORIZATION,
        });
      }
      return Unauthorized(res, {
        message: errors.auth.ERR_INVALID_AUTHORIZATION,
      });
    }
    req.userContext = auth.userContext;
  } catch (error) {
    return InternalServer({ res, error });
  }
  next();
};
