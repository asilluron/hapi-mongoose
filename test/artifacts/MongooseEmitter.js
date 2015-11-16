'use strict';

const EventEmitter = require('events').EventEmitter;

class MongooseEmitter extends EventEmitter {
  constructor (eventToEmit, eventArgs) {
    super();

    setTimeout(() => this.emit(eventToEmit, eventArgs), 2);
  }
}

class MongooseStub {
  constructor (eventToEmit, eventArgs) {
    this.eventToEmit = eventToEmit;
    this.eventArgs = eventArgs;
  }

  createConnection () {
    return new MongooseEmitter(this.eventToEmit, this.eventArgs);
  }
}

module.exports = MongooseStub;
