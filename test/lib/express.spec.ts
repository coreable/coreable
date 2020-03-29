import mocha, { describe, it } from 'mocha';
import chai, { expect, assert } from 'chai';
import chaiHttp from 'chai-http';
import { app } from '../../src/lib/express';

chai.use(chaiHttp);

describe('Server [src/server.ts]', () => {

  before(async() => {
    
  });

  it('should be an express application', async() => {
    return expect(app).to.exist;
  });

  it('should return a status code of 404 (Not Found)', async() => {
    const res = await chai.request(app).get('/');
    return expect(res.status).to.equal(404);
  });
  

});