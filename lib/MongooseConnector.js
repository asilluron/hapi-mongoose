'use strict';

var mongoose = require('mongoose');
var EventEmitter = require('events').EventEmitter;

class MongooseConnector extends EventEmitter {

  constructor (options, plugin) {
    super();

    if (options.bluebird === true) {
      mongoose.Promise = require('bluebird');
    }
    this.mongoose = mongoose;
    this.connection = mongoose.createConnection(options.uri);

    this.connection.on('connected', () => {
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
