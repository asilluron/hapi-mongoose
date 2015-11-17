'use strict';

const Code = require('code');
const Hapi = require('hapi');
const Lab = require('lab');
const rewire = require('rewire');

const lab = exports.lab = Lab.script();
const describe = lab.describe;
const it = lab.it;
const beforeEach = lab.beforeEach;
const expect = Code.expect;

describe('Default Options', () => {
  let server, plugin;
  let ConnectorStub = require('./artifacts/NoErrorConnector');

  beforeEach(done => {
    plugin = rewire('../');
    plugin.__set__('MongooseConnector', ConnectorStub);
    server = new Hapi.Server({ debug: false });
    server.connection();
    server.register({ register: plugin, options: {} }, () => {
      done();
    });
  });

  it('sets up mongoose', done => {
    expect(server.methods.mongooseDb()).to.equal('connection');

    done();
  });

  it('allows for a reference to originally imported mongoose', done => {
    expect(server.methods.mongoose()).to.equal('original lib import');

    done();
  });
});
