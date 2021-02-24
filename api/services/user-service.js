const UserRepository = require('../repositories/user-repository');
const { ResponseSuccessful, BadRequest, InternalServer, NoContent } = require('../response');
const { errors } = require('../common');
const { userSchema } = require('../schema');

class UserService extends UserRepository {
  constructor() {
    super(User);
  }

  async findById(req, res) {
    const { id } = req.params;
    try {
      const user = await this.findOne({ id, isDelete: false });
      if (!user || _.isEmpty(user)) {
        return BadRequest(res, { message: errors.user.ERR_USER_NOT_FOUND });
      }
      return ResponseSuccessful(res, user.toJSON());
    } catch (error) {
      return InternalServer(res, error);
    }
  }

  async getList(req, res) {
    const query = req.query;
    const page = parseInt(query.page || '');
    const limit = parseInt(query.limit || '');
    let where = {};
    if (query.firstName) {
      where.or = where.or || [];
      where.or.push({ firstName: { contains: query.firstName } });
    }
    if (query.middleName) {
      where.or = where.or || [];
      where.or.push({ middleName: { contains: query.middleName } });
    }
    if (query.lastName) {
      where.or = where.or || [];
      where.or.push({ lastName: { contains: query.lastName } });
    }
    try {
      const { respone, optional } = await this.find({
        where,
        page: !isNaN(page) ? page : 1,
        limit: !isNaN(limit) ? limit : 10,
      });
      return ResponseSuccessful(res, {
        ...optional,
        users: respone.map(item => item.toJSON())
      });
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      return ResponseSuccessful(res, {
        page: !isNaN(page) ? page : 1,
        limit: !isNaN(limit) ? limit : 10,
        totalItems: 0,
        totalPages: 0,
        users: []
      });
    }
  }

  async updateById(req, res) {
    const { id } = req.params;
    try {
      const existingUser = await this.findOne({
        id,
        isDelete: false
      });
      if (!existingUser || _.isEmpty(existingUser)) {
        return BadRequest(res, { message: errors.user.ERR_USER_NOT_FOUND });
      }
      let data = req.body;
      const { error } = userSchema.validateUpdateUser(data);
      if (error) {
        return BadRequest(res, error);
      }
      data = Object.assign(existingUser, data);
      const user = await this.updateOne({ id }, data);
      return ResponseSuccessful(res, user.toJSON());
    } catch (error) {
      return InternalServer(res, error);
    }
  }

  async deleteById(req, res) {
    const { id } = req.params;
    const existingUser = await this.findOne({
      id,
      isDelete: false
    });
    if (!existingUser || _.isEmpty(existingUser)) {
      return BadRequest(res, { message: errors.user.ERR_USER_NOT_FOUND });
    }
    try {
      await this.deleteUserById({ id });
      return NoContent(res);
    } catch (error) {
      return InternalServer(res, error);
    }
  }
}

module.exports = UserService;
