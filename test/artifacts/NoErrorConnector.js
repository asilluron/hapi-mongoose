'use strict';

var EventEmitter = require('events').EventEmitter;

class ConnectorStub extends EventEmitter {

  constructor (options, plugin) {
    super();

    this.connection = 'connection';

    setTimeout(() => {
      this.emit('ready');
    }, 1);
  }
}

module.exports = ConnectorStub;
