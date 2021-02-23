const config = {
  ENV_NAME: 'local',

  DB_URL: 'mongodb://root@localhost/sails-mongo',

  ALLOW_URLS: ['http://localhost:1337'],

  REDIS: {
    SESSION_URL: 'redis://localhost:6379/0',
    SOCKET_URL: 'redis://localhost:6379/1',
  },

  LOG_LEVEL: 'verbose',

  CUSTOM: {
    BASE_URL: 'http://localhost:1337',
  },
};

module.exports = {
  datastores: {
    default: {
      adapter: 'sails-mongo',
      url: config.DB_URL,
    },
  },

  models: {
    migrate: 'safe',
  },

  blueprints: {
    shortcuts: false,
  },

  security: {
    cors: {
      allRoutes: true,
      allowRequestHeaders:
        'Content-Type, Access-Control-Allow-Origin,Authorization',
      allowOrigins: config.ALLOW_URLS,
    },
  },

  session: {
    adapter: '@sailshq/connect-redis',
    url: config.REDIS.SESSION_URL,
    cookie: {
      secure: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  },

  sockets: {
    onlyAllowOrigins: config.ALLOW_URLS,
    adapter: '@sailshq/socket.io-redis',
    url: config.REDIS_SOCKET_URL,
  },

  log: {
    level: config.LOG_LEVEL,
  },

  custom: {
    ENV_NAME: config.ENV_NAME,

    BASE_URL: config.CUSTOM.BASE_URL,
  },
};
