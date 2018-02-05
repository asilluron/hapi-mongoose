'use strict';

const Hoek = require('hoek');
var MongooseConnector = require('./MongooseConnector');

const internals = {};

internals.defaults = {
  uri: 'mongodb://127.0.0.1:27017',
  promises: 'mpromises', // use built-in mpromises by default
  mongooseOptions: {}
};

exports.register = (server, options, next) => {
  const settings = Hoek.applyToDefaults(internals.defaults, options);
  let connector = new MongooseConnector(settings, server);

  connector.on('ready', () => {
    server.expose('lib', connector.mongoose);
    server.expose('connection', connector.connection);

    next();
  });

  connector.on('error', err => next(err));
};

exports.register.attributes = {
  pkg: require('../package.json')
};
