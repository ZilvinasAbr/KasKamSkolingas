const passport = require('passport');
const passportJWT = require('passport-jwt');
const users = require('./users.js');
const cfg = require('./config.js');

const ExtractJwt = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;
const params = {
  secretOrKey: cfg.jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeader()
};

module.exports = () => {
  const strategy = new Strategy(params, (payload, done) => {
    const user = users[payload.id] || null;
    if (user) {
      return done(null, {
        id: user.id
      });
    }

    return done(new Error('User not found'), null);
  });
  passport.use(strategy);
  return {
    initialize() {
      return passport.initialize();
    },
    authenticate() {
      return passport.authenticate('jwt', cfg.jwtSession);
    }
  };
};
