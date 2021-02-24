const UserRepository = require('../repositories/user-repository');
const { ResponseSuccessful, BadRequest } = require('../response');
const {errors} = require('../common');

class UserService extends UserRepository {
  constructor() {
    super(User);
  }

  async findUserById(req, res) {
    const { id } = req.params;
    const user = await this.findOne({id, isDelete: false});
    if (!user || _.isEmpty(user)) {
      return BadRequest(res, { message: errors.user.ERR_USER_NOT_FOUND });
    }
    return ResponseSuccessful(res, user.toJSON());
  }

  async updateUserById(req, res) {
    const { id } = req.params;
    const existingUser = await this.findOne({
      id,
      isDelete: false
    });
    if (!existingUser || _.isEmpty(existingUser)) {
      return BadRequest(res, { message: errors.user.ERR_USER_NOT_FOUND });
    }
    let data = req.body;
    data = Object.assign(existingUser, data);
    const user = await this.updateOne({id}, data);
    return ResponseSuccessful(res, user.toJSON());
  }
}

module.exports = UserService;
