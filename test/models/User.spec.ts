import mocha, { describe, it } from 'mocha';
import chai, { expect, assert } from 'chai';
import { sequelize } from '../../src/lib/sequelize';
import * as User from '../../src/models/User';

describe('Team Model [models/Team.ts]', () => {
  let user: User.User;
  before(async () => {
    user = new User.User();
    await sequelize.authenticate();
    return;
  });

  it('can set email to \"unit@test.com\"', () => {
    user.email = "unit@test.com";
    return expect(user.email).to.equal("unit@test.com");
  });

  it('can set firstName to \"unit\"', () => {
    user.firstName = "unit";
    return expect(user.firstName).to.equal("unit");
  });

  it('can set lastName to \"test\"', () => {
    user.lastName = "test";
    return expect(user.lastName).to.equal("test");
  });

  it('can set password to \"password\"', () => {
    user.password = "password";
    return expect(user.password).to.equal("password");
  });

  it('can set root to false', () => {
    user.root = false;
    return expect(user.root).to.equal(false);
  });

  it('can set userID to 1', () => {
    user.userID = 1;
    return expect(user.userID).to.equal(1);
  });

  

});