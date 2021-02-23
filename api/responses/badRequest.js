/**
 * badRequest.js
 *
 * A custom response.
 *
 * Example usage:
 * ```
 *     return res.badRequest();
 *     // -or-
 *     return res.badRequest(optionalData);
 * ```
 *
 * Or with actions2:
 * ```
 *     exits: {
 *       somethingHappened: {
 *         responseType: 'badRequest'
 *       }
 *     }
 * ```
 *
 * ```
 *     throw 'somethingHappened';
 *     // -or-
 *     throw { somethingHappened: optionalData }
 * ```
 */

module.exports = function badRequest(optionalData) {

  // Get access to `res`
  const res = this.res;

  // Define the status code to send in the response.
  const statusCodeToSet = 400;

  // If no data was provided, use res.sendStatus().
  if (optionalData === undefined) {
    return res.sendStatus(statusCodeToSet);
  }
  // Else if the provided data is an Error instance, if it has
  // a toJSON() function, then always run it and use it as the
  // response body to send.  Otherwise, send down its `.stack`,
  // except in production use res.sendStatus().
  else if (_.isError(optionalData)) {
    // If the error doesn't have a custom .toJSON(), use its `stack` instead--
    // otherwise res.json() would turn it into an empty dictionary.
    // (If this is production, don't send a response body at all.)
    if (!_.isFunction(optionalData.toJSON)) {
      if (process.env.NODE_ENV === 'production') {
        return res.status(statusCodeToSet).send({
          code: optionalData.code,
          message: optionalData.message
        });
      }
      else {
        return res.status(statusCodeToSet).send({
          code: optionalData.code,
          message: optionalData.message,
          stack: optionalData.stack
        });
      }
    }
  }
  // Set status code and send response data.
  else {
    return res.status(statusCodeToSet).send(optionalData);
  }

};
