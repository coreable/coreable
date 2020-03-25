import mocha, { describe, it } from 'mocha';
import chai, { expect, assert } from 'chai';
import { server } from '../src/server';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);

describe('server.ts', () => {
  before(async() => {
    return await server.load;
  });

  it('should start a HTTP server', async() => {
    const res = await chai.request(server).get('/');
    return expect(res.status).to.equal(404);
  }); 

  it('should start a graphQL server', async() => {
    const res = await chai.request(server).get('/graphQL').send({
      query: '{ API { time, mode } }'
    });
    return expect(res.status).to.equal(200);
  });


});