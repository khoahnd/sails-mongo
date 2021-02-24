const BaseRepository = require('./base-repository');

class UserRepository extends BaseRepository {
  constructor(model) {
    super(model);
  }

  async deleteUserById(criteria) {
    return this.updateOne(criteria, { isDelete: true });
  }
}

module.exports = UserRepository;
