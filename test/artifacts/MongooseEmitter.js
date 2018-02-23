const EventEmitter = require('events').EventEmitter;

class MongooseEmitter extends EventEmitter {
  constructor (eventToEmit, eventArgs) {
    super();
    setTimeout(() => this.emit(eventToEmit, eventArgs), 2);
  }
}

module.exports = MongooseEmitter;
