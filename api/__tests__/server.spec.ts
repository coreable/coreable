import { describe, it } from 'mocha';
import chai, {expect } from 'chai';
import chaiHttp from 'chai-http';
chai.use(chaiHttp);

import { server } from '../server';
import { Server } from 'http';

describe('Server [api/server.ts]', () => {

  before(async() => {
    await server._done;
  });

  it('should be an instance of http.Server', async() => {
    return expect(server).to.be.instanceOf(Server);
  });

  after(async() => {

  });

});