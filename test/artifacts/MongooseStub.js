const MongooseEmitter = require('./MongooseEmitter');

class MongooseStub {
  constructor (eventToEmit, eventArgs) {
    this.eventToEmit = eventToEmit;
    this.eventArgs = eventArgs;
    this.promise = null;
  }

  createConnection () {
    return new MongooseEmitter(this.eventToEmit, this.eventArgs);
  }
}

module.exports = MongooseStub;
