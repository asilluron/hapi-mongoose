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
  const ConnectorStub = require('./artifacts/NoErrorConnector');
  const ErrorConnectorStub = require('./artifacts/ErrorConnector');

  beforeEach(async () => {
    plugin = rewire('../');
    plugin.__set__('MongooseConnector', ConnectorStub);
    server = new Hapi.Server({ debug: false });
    await server.register({ plugin: plugin, options: {} });
  });

  it('sets up mongoose', () => {
    expect(server.plugins['hapi-mongoose'].connection).to.equal('connection');
  });

  it('allows for a reference to originally imported mongoose', () => {
    expect(server.plugins['hapi-mongoose'].lib).to.equal('original lib import');
  });

  it('handles failures', async () => {
    plugin = rewire('../');
    plugin.__set__('MongooseConnector', ErrorConnectorStub);
    server = new Hapi.Server({ debug: false });

    try {
      await server.register({ plugin: plugin, options: {} });
      Code.fail('function must throw and no go here');
    } catch (err) {
      expect(err).to.be.error(Error, 'fail for testing');
    }
  });
});
