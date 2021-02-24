const uuid = require('uuid');

class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async findOne(criteria) {
    return this.model.findOne(criteria);
  }

  async find(criteria) {
    let {page, limit, where, sort} = criteria;
    const skip = (Math.max(1, page) - 1) * Math.max(limit, 0);
    const totalItems = await this.count(where);
    sort = sort || [];
    sort.push({ createdAt: 'desc' });
    const respone = await this.model.find({ where, sort, limit, skip });
    const totalPages = Math.ceil(totalItems / limit);
    return { respone, optional: {page, limit, totalItems, totalPages} };
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
