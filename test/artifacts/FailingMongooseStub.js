const MongooseEmitter = require('./MongooseEmitter');
const MongooseStub = require('./MongooseStub');

class FailingMongooseStub extends MongooseStub {
  createConnection (uri, opts, cb) {
    setImmediate(() => cb(new Error('I can only fail')));
    return new MongooseEmitter(this.eventToEmit, this.eventArgs);
  }
}

module.exports = FailingMongooseStub;
