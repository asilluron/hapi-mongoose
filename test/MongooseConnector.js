const Code = require('code');
const Lab = require('lab');
const rewire = require('rewire');
const sinon = require('sinon');
const EventEmitter = require('events').EventEmitter;
const MongooseConnector = rewire('../lib/MongooseConnector');
// This is required to trick lab coverage
const MongooseConnector2 = require('../lib/MongooseConnector'); //eslint-disable-line
MongooseConnector2 = MongooseConnector;

const lab = exports.lab = Lab.script();
const describe = lab.describe;
const it = lab.it;
const beforeEach = lab.beforeEach;
const expect = Code.expect;

describe('Default Options', () => {
  let mongooseConnector, mongooseEmitter, logSpy, pluginStub;
  let MongooseEmitter = require('./artifacts/MongooseEmitter');

  beforeEach(() => {
    mongooseEmitter = new MongooseEmitter('connected');
    pluginStub = {
      log: log => log
    };
    logSpy = sinon.spy(pluginStub, 'log');
    MongooseConnector.__set__('mongoose', mongooseEmitter);
    mongooseConnector = new MongooseConnector({ promises: 'mpromise' }, pluginStub);
  });

  it('is an instance of EventEmitter', () => {
    expect(mongooseConnector instanceof EventEmitter).to.equal(true);
  });

  it('s connection property is an instance of EventEmitter', () => {
    expect(mongooseConnector.connection instanceof EventEmitter).to.equal(true);
  });

  it('logs a connection event', async () => {
    await new Promise((resolve, reject) => setTimeout(() => resolve(), 2));

    const args = logSpy.getCall(0).args;

    expect(args[0][0]).to.equal('info');
    expect(args[1]).to.equal('Connected');
  });
});

describe('With bluebird (bluebird)', () => {
  let mongooseConnector, mongooseEmitter, pluginStub; //eslint-disable-line
  let MongooseEmitter = require('./artifacts/MongooseEmitter');

  beforeEach(() => {
    mongooseEmitter = new MongooseEmitter('connected');
    pluginStub = {
      log: log => log
    };
    MongooseConnector.__set__('mongoose', mongooseEmitter);
    mongooseConnector = new MongooseConnector({ promises: 'bluebird' }, pluginStub);
  });

  it('is an instance of EventEmitter', () => {
    expect(mongooseEmitter.Promise).to.equal(require('bluebird'));
  });
});

describe('With es6 (es6)', () => {
  let mongooseConnector, mongooseEmitter, pluginStub; //eslint-disable-line
  let MongooseEmitter = require('./artifacts/MongooseEmitter');

  beforeEach(() => {
    mongooseEmitter = new MongooseEmitter('connected');
    pluginStub = {
      log: log => log
    };
    MongooseConnector.__set__('mongoose', mongooseEmitter);
    mongooseConnector = new MongooseConnector({ promises: 'es6' }, pluginStub);
  });

  it('is an instance of EventEmitter', () => {
    expect(mongooseEmitter.Promise).to.equal(global.Promise);
  });
});

describe('With es6 (native)', () => {
  let mongooseConnector, mongooseEmitter, pluginStub; //eslint-disable-line
  let MongooseEmitter = require('./artifacts/MongooseEmitter');

  beforeEach(() => {
    mongooseEmitter = new MongooseEmitter('connected');
    pluginStub = {
      log: log => log
    };
    MongooseConnector.__set__('mongoose', mongooseEmitter);
    mongooseConnector = new MongooseConnector({ promises: 'native' }, pluginStub);
  });

  it('is an instance of EventEmitter', () => {
    expect(mongooseEmitter.Promise).to.equal(global.Promise);
  });
});

describe('Default Options with failed connection', () => {
  let mongooseConnector, mongooseEmitter, logSpy, pluginStub;
  let MongooseEmitter = require('./artifacts/MongooseEmitter');

  beforeEach(() => {
    mongooseEmitter = new MongooseEmitter('error', { message: 'test' });
    pluginStub = {
      log: log => log
    };
    logSpy = sinon.spy(pluginStub, 'log');
    MongooseConnector.__set__('mongoose', mongooseEmitter);
    mongooseConnector = new MongooseConnector({ promises: 'mpromise' }, pluginStub);
    mongooseConnector.on('error', err => err);
  });

  it('emits an error event from Connector', () => {
    mongooseConnector.on('error', err => {
      expect(err.message).to.equal('test');
    });
  });

  it('logs a connection event', async () => {
    await new Promise((resolve, reject) => setTimeout(() => resolve(), 10));

    const args = logSpy.getCall(0).args;

    expect(args[0][0]).to.equal('error');
    expect(args[1]).to.equal('Unable to connect to database: test');
  });
});

describe('Default Options with closed connection', () => {
  let mongooseConnector, mongooseEmitter, logSpy, pluginStub;
  let MongooseEmitter = require('./artifacts/MongooseEmitter');

  beforeEach(() => {
    mongooseEmitter = new MongooseEmitter('close');
    pluginStub = {
      log: log => log
    };
    logSpy = sinon.spy(pluginStub, 'log');
    MongooseConnector.__set__('mongoose', mongooseEmitter);
    mongooseConnector = new MongooseConnector({ promises: 'mpromise' }, pluginStub);
    mongooseConnector.on('error', err => err);
  });

  it('logs a connection event', async () => {
    await new Promise((resolve, reject) => setTimeout(() => resolve(), 10));

    const args = logSpy.getCall(0).args;

    expect(args[0][0]).to.equal('info');
    expect(args[1]).to.equal('Connection to database closed');
  });
});

describe('Default Options with disconnected connection', () => {
  let mongooseConnector, mongooseEmitter, logSpy, pluginStub;
  let MongooseEmitter = require('./artifacts/MongooseEmitter');

  beforeEach(() => {
    mongooseEmitter = new MongooseEmitter('disconnected');
    pluginStub = {
      log: log => log
    };
    logSpy = sinon.spy(pluginStub, 'log');
    MongooseConnector.__set__('mongoose', mongooseEmitter);
    mongooseConnector = new MongooseConnector({ promises: 'mpromise' }, pluginStub);
    mongooseConnector.on('error', err => err);
  });

  it('logs a connection event', async () => {
    await new Promise((resolve, reject) => setTimeout(() => resolve(), 10));

    const args = logSpy.getCall(0).args;

    expect(args[0][0]).to.equal('warn');
    expect(args[1]).to.equal('Connection to database disconnected');
  });
});
