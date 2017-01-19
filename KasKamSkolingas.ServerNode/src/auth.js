const passport = require('passport');
const passportJWT = require('passport-jwt');

const cfg = require('./config');
const { MongoClient } = require('mongodb');

const ExtractJwt = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;
const params = {
  secretOrKey: cfg.jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeader()
};

module.exports = () => {
  const strategy = new Strategy(params, async (payload, done) => {
    let user;

    try {
      const db = await MongoClient.connect(cfg.dbConnectionUrl);

      user = await db.collection('users')
        .findOne({ userName: payload.userName });

      db.close();
    } catch (err) {
      console.log('auth.js error');
      console.error(err);
    }

    if (user) {
      return done(null, {
        userName: user.userName
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
