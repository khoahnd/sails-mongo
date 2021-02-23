/**
 * success.js
 *
 * A custom response.
 *
 * Example usage:
 *     exits: {
 *       somethingHappened: {
 *         responseType: 'success'
 *       }
 *     }
 * ```
 */

module.exports = function success(responeData, statusCode) {

  // Get access to `res`
  const res = this.res;

  // Define the status code to send in the response.
  const statusCodeToSet = statusCode || 200;

  // If no data was provided, use res.sendStatus().
  if (!responeData) {
    return res.sendStatus(statusCodeToSet);
  }
  return res.status(statusCodeToSet).send(responeData);
};
