import mocha, { describe, it } from 'mocha';
import chai, { expect, assert } from 'chai';
import { Group } from '../../src/models/Group';

describe('Group Model [Group.ts]', () => {
  let group: Group;
  before((done) => {
    group = new Group();
    return done();
  });

  it('can set groupID to 1', () => {
    group.groupID = 1;
    return expect(group.groupID).to.equal(1);
  });

  it('can set groupLeaderID to 9', () => {
    group.groupLeaderID = 9;
    return expect(group.groupLeaderID).to.equal(9);
  });

  it('can set the inviteCode to \"unit testing\"', () => {
    group.inviteCode = "unit testing";
    return expect(group.inviteCode).to.equal("unit testing");
  });

  it('can set the groupName to \"unit testing\"', () => {
    group.groupName = "unit testing";
    return expect(group.groupName).to.equal("unit testing");
  });
});