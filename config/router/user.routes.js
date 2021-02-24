module.exports = {
  'get /api/user/:id': 'User/findById',
  'get /api/users': 'User/find',
  'patch /api/user/:id': 'User/updateById',
  'delete /api/user/:id': 'User/deleteById',
};
