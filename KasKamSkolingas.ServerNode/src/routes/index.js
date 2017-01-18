const account = require('./account');
const debt = require('./debt');
const group = require('./group');

module.exports = (app) => {
  app.use('/api/account', account);
  app.use('/api/debt', debt);
  app.use('/api/group', group);
};
