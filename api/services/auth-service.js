const UserRepository = require('../repositories/user-repository');
const { BadRequest, ResponseSuccessful } = require('../response');
const { authSchema } = require('../schema');
const { constants, errors } = require('../common');

class AuthService extends UserRepository {
  constructor() {
    super(User);
  }

  async signUp(req, res) {
    const data = req.body;
    const { error } = authSchema.validateSignUp(data);
    if (error) {
      return BadRequest(res, error);
    }
    data.password = (data.password || '').trim();
    data.password = await sails.helpers.password.hashGenerator.with({
      password: data.password,
    });
    const respone = await this.create(data);
    const accessToken = await sails.helpers.jwt.tokenGenerator.with({
      payload: {
        userId: respone.id,
        isAdmin: respone.isAdmin
      },
      type: constants.JWT_TYPE.SIGN_UP
    });
    accessToken.user = respone.toJSON();
    return ResponseSuccessful(res, accessToken);
  }

  async signIn(req, res) {
    const data = req.body;
    const { error } = authSchema.validateSignIn(data);
    if (error) {
      return BadRequest(res, error);
    }
    data.password = (data.password || '').trim();
    const existingUser = await this.findOne({
      email: (data.email || '').toLowerCase(),
      isDelete: false
    });
    if (!existingUser || _.isEmpty(existingUser)) {
      return BadRequest(res, { message: errors.auth.EMAIL_OR_PASSWORD_INVALID });
    }
    return ResponseSuccessful(res, existingUser);
  }
}

module.exports = AuthService;
