const NotFound = (res, error) => {
  return res.status(404).send(error);
};

const BadRequest = (res, error) => {
  return res.status(400).send(error);
};

const Unauthorized = (res, error) => {
  return res.status(401).send(error);
};

const Forbidden = (res, error) => {
  return res.status(403).send(error);
};

const ResponseSuccessful = (res, result) => {
  return res.status(200).send(result);
};

const Created = (res, result) => {
  return res.status(201).send(result);
};

const NoContent = (res) => {
  return res.status(204).send();
};

module.exports = {
  NotFound,
  BadRequest,
  Unauthorized,
  Forbidden,
  ResponseSuccessful,
  Created,
  NoContent
};
