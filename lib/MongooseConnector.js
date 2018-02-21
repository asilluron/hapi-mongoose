const mongoose = require('mongoose');
const EventEmitter = require('events').EventEmitter;

class MongooseConnector extends EventEmitter {
  constructor (options, plugin) {
    super();

    if (options.promises === 'bluebird') {
      mongoose.Promise = require('bluebird');
    } else if (options.promises === 'native' || options.promises === 'es6') {
      mongoose.Promise = global.Promise;
    }
    this.mongoose = mongoose;
    this.connection = mongoose.createConnection(options.uri, options.mongooseOptions, (err) => {
      if (err) {
        plugin.log(['error', 'database', 'mongoose', 'mongodb'], `error during initial connect ${err}`);
        this.emit('error', err);
      }
    });

    this.connection
      .on('connected', () => {
        plugin.log(['info', 'database', 'mongoose', 'mongodb'], 'Connected');
        this.emit('ready');
      })
      .on('error', err => {
        plugin.log(['error', 'database', 'mongoose', 'mongodb'], `Unable to connect to database: ${err.message}`);
        this.emit('error', err);
      })
      .on('close', () => {
        plugin.log(['info', 'database', 'mongoose', 'mongodb'], 'Connection to database closed');
      })
      .on('disconnected', () => {
        plugin.log(['warn', 'database', 'mongoose', 'mongodb'], 'Connection to database disconnected');
        this.emit('disconnected');
      });
  }
}

module.exports = MongooseConnector;
