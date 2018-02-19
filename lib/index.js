const Hoek = require('hoek');
const MongooseConnector = require('./MongooseConnector');

const internals = {};

internals.defaults = {
  uri: 'mongodb://127.0.0.1:27017',
  promises: 'mpromises', // use built-in mpromises by default
  mongooseOptions: {}
};

const register = async (server, options) => {
  const settings = Hoek.applyToDefaults(internals.defaults, options);
  let connector = new MongooseConnector(settings, server);

  await new Promise((resolve, reject) => {
    connector.on('ready', () => {
      server.expose('lib', connector.mongoose);
      server.expose('connection', connector.connection);
      resolve();
    });

    connector.on('error', err => reject(err));
  });
};

exports.plugin = {
  register,
  pkg: require('../package.json')
};
