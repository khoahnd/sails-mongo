const uuid = require('uuid');

class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async findOne(criteria) {
    return this.model.findOne(criteria);
  }

  async find(criteria) {
    return this.model.find(criteria);
  }

  async create(object) {
    const clonedObj = Object.assign({}, object);
    clonedObj.id = clonedObj.id || uuid.v4();
    return this.model.create(clonedObj).fetch();
  }

  async updateOne(criteria, object) {
    return this.model.updateOne(criteria).set(object);
  }

  async update(criteria, object) {
    return this.model.update(criteria).set(object);
  }

  async count(criteria) {
    return this.model.count(criteria);
  }

  async destroyOne(criteria) {
    return this.model.destroyOne(criteria);
  }

  async destroy(criteria) {
    return this.model.destroy(criteria);
  }
}

module.exports = BaseRepository;
