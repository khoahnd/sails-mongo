/**
 * Custom configuration
 * (sails.config.custom)
 *
 * One-off settings specific to your application.
 *
 * For more information on custom configuration, visit:
 * https://sailsjs.com/config/custom
 */

module.exports.custom = {
  SALT_WORK_FACTOR: 10,
  SECRET: 'RCHqbloNoklcixNrVMCk',
  TOKEN_EXPIRES: 60 * 60,
  REFRESH_TOKEN_EXPIRES: 60 * 60 * 24 * 365
};
