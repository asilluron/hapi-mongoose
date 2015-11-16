'use strict';

const Code = require('code');
const Lab = require('lab');
const rewire = require('rewire');
const sinon = require('sinon');
const EventEmitter = require('events').EventEmitter;
var MongooseConnector = rewire('../lib/MongooseConnector');
// This is required to trick lab coverage
var MongooseConnector2 = require('../lib/MongooseConnector'); //eslint-disable-line
MongooseConnector2 = MongooseConnector;

const lab = exports.lab = Lab.script();
const describe = lab.describe;
const it = lab.it;
const beforeEach = lab.beforeEach;
const expect = Code.expect;

describe('Default Options', () => {
  let mongooseConnector, mongooseEmitter, logSpy, pluginStub;
  let MongooseEmitter = require('./artifacts/MongooseEmitter');

  beforeEach(done => {
    mongooseEmitter = new MongooseEmitter('connected');
    pluginStub = {
      log: log => log
    };
    logSpy = sinon.spy(pluginStub, 'log');
    MongooseConnector.__set__('mongoose', mongooseEmitter);
    mongooseConnector = new MongooseConnector({async: false}, pluginStub);
    done();
  });

  it('is an instance of EventEmitter', done => {
    expect(mongooseConnector instanceof EventEmitter).to.equal(true);

    done();
  });

  it('s connection property is an instance of EventEmitter', done => {
    expect(mongooseConnector.connection instanceof EventEmitter).to.equal(true);

    done();
  });

  it('logs a connection event', done => {
    setTimeout(() => {
      const args = logSpy.getCall(0).args;

      expect(args[0][0]).to.equal('info');
      expect(args[1]).to.equal('Connected');

      done();
    }, 2);
  });
});

describe('With Async (bluebird)', () => {
  let mongooseConnector, mongooseEmitter, pluginStub; //eslint-disable-line
  let MongooseEmitter = require('./artifacts/MongooseEmitter');

  beforeEach(done => {
    mongooseEmitter = new MongooseEmitter('connected');
    pluginStub = {
      log: log => log
    };
    MongooseConnector.__set__('mongoose', mongooseEmitter);
    mongooseConnector = new MongooseConnector({async: true}, pluginStub);
    done();
  });

  it('is an instance of EventEmitter', done => {
    expect(typeof mongooseEmitter.createConnectionAsync).to.equal('function');

    done();
  });
});

describe('Default Options with failed connection', () => {
  let mongooseConnector, mongooseEmitter, logSpy, pluginStub;
  let MongooseEmitter = require('./artifacts/MongooseEmitter');

  beforeEach(done => {
    mongooseEmitter = new MongooseEmitter('error', {message: 'test'});
    pluginStub = {
      log: log => log
    };
    logSpy = sinon.spy(pluginStub, 'log');
    MongooseConnector.__set__('mongoose', mongooseEmitter);
    mongooseConnector = new MongooseConnector({async: false}, pluginStub);
    mongooseConnector.on('error', err => err);
    done();
  });

  it('emits an error event from Connector', done => {
    mongooseConnector.on('error', err => {
      expect(err.message).to.equal('test');

      done();
    });
  });

  it('logs a connection event', done => {
    setTimeout(() => {
      const args = logSpy.getCall(0).args;

      expect(args[0][0]).to.equal('error');
      expect(args[1]).to.equal('Unable to connect to database: test');

      done();
    }, 3); // TODO : Avoid using a timeout for events
  });
});

describe('Default Options with closed connection', () => {
  let mongooseConnector, mongooseEmitter, logSpy, pluginStub;
  let MongooseEmitter = require('./artifacts/MongooseEmitter');

  beforeEach(done => {
    mongooseEmitter = new MongooseEmitter('close');
    pluginStub = {
      log: log => log
    };
    logSpy = sinon.spy(pluginStub, 'log');
    MongooseConnector.__set__('mongoose', mongooseEmitter);
    mongooseConnector = new MongooseConnector({async: false}, pluginStub);
    mongooseConnector.on('error', err => err);
    done();
  });

  it('logs a connection event', done => {
    setTimeout(() => {
      const args = logSpy.getCall(0).args;

      expect(args[0][0]).to.equal('info');
      expect(args[1]).to.equal('Connection to database closed');

      done();
    }, 2);
  });
});

describe('Default Options with disconnected connection', () => {
  let mongooseConnector, mongooseEmitter, logSpy, pluginStub;
  let MongooseEmitter = require('./artifacts/MongooseEmitter');

  beforeEach(done => {
    mongooseEmitter = new MongooseEmitter('disconnected');
    pluginStub = {
      log: log => log
    };
    logSpy = sinon.spy(pluginStub, 'log');
    MongooseConnector.__set__('mongoose', mongooseEmitter);
    mongooseConnector = new MongooseConnector({async: false}, pluginStub);
    mongooseConnector.on('error', err => err);
    done();
  });

  it('logs a connection event', done => {
    setTimeout(() => {
      const args = logSpy.getCall(0).args;

      expect(args[0][0]).to.equal('warn');
      expect(args[1]).to.equal('Connection to database disconnected');

      done();
    }, 2);
  });
});
