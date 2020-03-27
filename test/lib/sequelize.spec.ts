import mocha, { describe, it } from 'mocha';
import chai, { expect, assert } from 'chai';
import { sqlcache, sequelize } from '../../src/lib/sequelize';
import { Sequelize } from 'sequelize';
import SequelizeSimpleCache from 'sequelize-simple-cache';

describe('Sequelize (DAO) (ORM) [lib/sequelize.ts]', () => {

  before(async() => {
    return await sequelize.authenticate();
  });

  it('should be an instance of Sequqelize', async() => {
    return expect(sequelize).to.be.instanceOf(Sequelize);
  })

  it('should have a cache of instance SequelizeSimpleCache', async() => {
    return expect(sequelize._cache).to.be.instanceOf(SequelizeSimpleCache);
  });
  
  it('should have Group model loaded', async() => {
    return expect(sequelize.models.Group).to.exist;
  });

  it('should have Industry model loaded', async() => {
    return expect(sequelize.models.Industry).to.exist;
  });

  it('should have User model loaded', async() => {
    return expect(sequelize.models.User).to.exist;
  });

  it('should have Review model loaded', async() => {
    return expect(sequelize.models.Review).to.exist;
  });

  it('should have Team model loaded', async() => {
    return expect(sequelize.models.Team).to.exist;
  });

});

describe('SequelizeSimpleCache (sequelize._cache)', () => {
  before(async() => {
    return await sequelize.authenticate();
  });

  it('should have Group model loaded', async() => {
    return expect(sequelize._cache.cache.Group).to.exist;
  });

  it('should have Industry model loaded', async() => {
    return expect(sequelize._cache.cache.Industry).to.exist;
  });

  it('should have User model loaded', async() => {
    return expect(sequelize._cache.cache.User).to.exist;
  });

  it('should have Review model loaded', async() => {
    return expect(sequelize.models.Review).to.exist;
  });

  it('should have Team model loaded', async() => {
    return expect(sequelize._cache.cache.Team).to.exist;
  });
});

describe('Sequelize Assosciations [sequelize.ts]', () => {
  before(async() => {
    return await sequelize.authenticate();
  });

  // it('sdfsf', () => {
  //   console.log(sequelize);
  // })
});