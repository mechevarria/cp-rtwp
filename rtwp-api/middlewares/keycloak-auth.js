const session = require('express-session');
const Keycloak = require('keycloak-connect');

module.exports = (app) => {
  let middleware = {};

  if (process.env.KEYCLOAK === 'true') {
    console.info('Securing with keycloak');

    const kcConfig = {
      resource: 'express',
      'bearer-only': true,
      'auth-server-url': process.env.KEYCLOAK_URL || 'http://localhost:8180/auth',
      realm: 'rtwp'
    };
    const memoryStore = new session.MemoryStore();
    const keycloak = new Keycloak({ store: memoryStore }, kcConfig);

    app.use(
      session({
        secret: 'keycloak-session-secret',
        resave: false,
        saveUninitialized: true,
        store: memoryStore
      })
    );

    app.use(keycloak.middleware());

    middleware = keycloak.protect();
  } else {
    console.info('Keycloak is disabled');
    middleware = (req, res, next) => {
      next();
    };
  }

  return middleware;
};
