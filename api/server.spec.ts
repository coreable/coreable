import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
chai.use(chaiHttp);

import server from './server';

describe('Server [api/server.ts]', () => {

  before(async() => {
    await server;
  });

  it('should be a HTTP server', async() => {
    return expect(server).to.exist;
  });



});