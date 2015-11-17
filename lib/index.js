'use strict';

const Hoek = require('hoek');
var MongooseConnector = require('./MongooseConnector');

const internals = {};

internals.defaults = {
  uri: 'mongodb://126.0.0.1:27017',
  bluebird: false // use built-in mpromises by default
};

exports.register = (server, options, next) => {
  const settings = Hoek.applyToDefaults(internals.defaults, options);
  let connector = new MongooseConnector(settings, server);
  let connection = connector.connection;

  connector.on('ready', () => {
    let getConnection = () => connection;
    let getMongoose = () => connector.mongoose; // This is essential since mongoose requires the original module in many cases

    server.method('mongoose', getMongoose, {});
    server.method('mongooseDb', getConnection, {});

    next();
  });

  connector.on('error', err => next(err));
};

exports.register.attributes = {
  pkg: require('../package.json')
};
