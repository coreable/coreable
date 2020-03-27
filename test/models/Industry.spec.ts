import mocha, { describe, it } from 'mocha';
import chai, { expect, assert } from 'chai';
import { Industry } from '../../src/models/Industry';

describe('Industry Model [models/Industry.ts]', () => {
  let industry: Industry;
  before((done) => {
    industry = new Industry();
    return done();
  });

  it('can set industryID to 1', () => {
    industry.industryID = 1;
    return expect(industry.industryID).to.equal(1);
  });

  it('can set industry name to field to \"unit testing\"', () => {
    industry.industryName = "unit testing";
    return expect(industry.industryName).to.equal("unit testing");
  });

});