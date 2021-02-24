const { errors } = require('../common');
const { InternalServer, Forbidden } = require('../response');

/**
 * @name isAdmin
 * @desc Verify if the requester is an administrator
 *
 * EXPERIMENTAL Set up a real authorization process
 *              with a userContext
 */
module.exports = async function isAdmin(req, res, next) {
  const { userContext } = req;
  try {
    if (!userContext.isAdmin) {
      return Forbidden(res, {
        message: errors.auth.ERR_NOT_ADMIN_USER,
      });
    }
  } catch (error) {
    return InternalServer({ res, error });
  }
  next();
};
