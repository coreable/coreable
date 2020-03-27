import mocha, { describe, it } from 'mocha';
import chai, { expect, assert } from 'chai';
import { Team } from '../../src/models/Team';

describe('Team Model [models/Team.ts]', () => {
  let team: Team;
  before((done) => {
    team = new Team();
    return done();
  });

  it('can set groupID to 1', () => {
    team.groupID = 1;
    return expect(team.groupID).to.equal(1);
  });

  it('can set userID to 9', () => {
    team.userID = 9;
    return expect(team.userID).to.equal(9);
  });

});