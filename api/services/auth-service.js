const UserRepository = require('../repositories/user-repository');
const { BadRequest, ResponseSuccessful, InternalServer, Created } = require('../response');
const { authSchema } = require('../schema');
const { constants, errors } = require('../common');

class AuthService extends UserRepository {
  constructor() {
    super(User);
  }

  async signUp(req, res) {
    const data = req.body;
    try {
      // Verify the data before creating a new user
      const { error } = authSchema.validateSignUp(data);
      if (error) {
        return BadRequest(res, error);
      }
      // We will lower case email before creating new users
      data.email = data.email.toLowerCase();
      // We will check duplicate email
      const existingUser = await this.findOne({
        email: data.email,
        isDelete: false
      });
      if (existingUser) {
        return BadRequest(res, { message: errors.user.ERR_USER_ALREADY_EXISTED });
      }
      // We will remove the spaces at both ends of the password
      data.password = (data.password || '').trim();
      data.password = await sails.helpers.password.hashGenerator.with({
        password: data.password,
      });
      // Create new user
      const respone = await this.create(data);
      // Generate Access token and Refresh token
      const accessToken = await sails.helpers.jwt.tokenGenerator.with({
        payload: {
          userId: respone.id,
          isAdmin: respone.isAdmin
        },
        type: constants.JWT_TYPE.SIGN_UP
      });
      accessToken.user = respone.toJSON();
      return Created(res, accessToken);
    } catch (error) {
      return InternalServer(res, error);
    }
  }

  async signIn(req, res) {
    const data = req.body;
    try {
      // Verify the data
      const { error } = authSchema.validateSignIn(data);
      if (error) {
        return BadRequest(res, error);
      }
      // We will remove the spaces at both ends of the password
      data.password = (data.password || '').trim();
      // Check for user existence by email
      const existingUser = await this.findOne({
        email: (data.email || '').toLowerCase(),
        isDelete: false
      });
      if (!existingUser || _.isEmpty(existingUser)) {
        return BadRequest(res, { message: errors.auth.EMAIL_OR_PASSWORD_INVALID });
      }
      // Generate Access token and Refresh token
      const accessToken = await sails.helpers.jwt.tokenGenerator.with({
        payload: {
          userId: existingUser.id,
          isAdmin: existingUser.isAdmin
        },
        type: constants.JWT_TYPE.SIGN_IN
      });
      accessToken.user = existingUser.toJSON();
      return ResponseSuccessful(res, accessToken);
    } catch (error) {
      return InternalServer(res, error);
    }
  }

  async authorization(token) {
    if (!token) {return { isVerify: false };}
    const verifiedToken = await sails.helpers.jwt.verifyToken.with({token});
    if (!verifiedToken.isVerify) {return verifiedToken;}
    const existingUser = await this.findOne({id: verifiedToken.payload.userId});
    if (!existingUser || _.isEmpty(existingUser)) {return { isVerify: false };}
    return {
      isVerify: true,
      userContext: {
        ...existingUser,
      },
    };
  }
}

module.exports = AuthService;
