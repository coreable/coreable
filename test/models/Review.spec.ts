import mocha, { describe, it } from 'mocha';
import chai, { expect, assert } from 'chai';
import { Review } from '../../src/models/Review';

describe('Review Model [Review.ts]', () => {
  let review: Review;
  before((done) => {
    review = new Review();
    return done();
  });

  it('can set subjectID to 1', () => {
    review.subjectID = 1;
    return expect(review.subjectID).to.equal(1);
  });

  it('can set compeltedBy to 2', () => {
    review.completedByID = 2;
    return expect(review.completedByID).to.equal(2);
  });

  it('can set calm to 3', () => {
    review.calm = 3;
    return expect(review.calm).to.equal(3);
  });

  it('can set change to 4', () => {
    review.change = 4;
    return expect(review.change).to.equal(4);
  });

  it('can set clearInstructions to 5', () => {
    review.clearInstructions = 5;
    return expect(review.clearInstructions).to.equal(5);
  });

  it('can set cooperatively to 6', () => {
    review.cooperatively = 6;
    return expect(review.cooperatively).to.equal(6);
  });

  it('can set crossTeam to 7', () => {
    review.crossTeam = 7;
    return expect(review.crossTeam).to.equal(7);
  });

  it('can set distractions to 8', () => {
    review.distractions = 8;
    return expect(review.distractions).to.equal(8);
  });

  it('can set easilyExplainsComplexIdeas to 9', () => {
    review.easilyExplainsComplexIdeas = 9;
    return expect(review.easilyExplainsComplexIdeas).to.equal(9);
  });
   
  it('can set emotionalResponse to 10', () => {
    review.emotionalResponse = 10;
    return expect(review.emotionalResponse).to.equal(10);
  });
   
  it('can set empathy to 11', () => {
    review.empathy = 11;
    return expect(review.empathy).to.equal(11);
  });

  it('can set eyeContact to 12', () => {
    review.eyeContact = 12;
    return expect(review.eyeContact).to.equal(12);
  });

  it('can set faith to 13', () => {
    review.faith = 13;
    return expect(review.faith).to.equal(13);
  });

  it('can set influences to 14', () => {
    review.influences = 14;
    return expect(review.influences).to.equal(14);
  });

  it('can set managesOwn to 15', () => {
    review.managesOwn = 15;
    return expect(review.managesOwn).to.equal(15);
  });

  it('can set newIdeas to 16', () => {
    review.newIdeas = 16;
    return expect(review.newIdeas).to.equal(16);
  });

  it('can set openToShare to 17', () => {
    review.openToShare = 17;
    return expect(review.openToShare).to.equal(17);
  });

  it('can set positiveBelief to 18', () => {
    review.positiveBelief = 18;
    return expect(review.positiveBelief).to.equal(18);
  });

  it('can set preventsMisunderstandings to 19', () => {
    review.preventsMisunderstandings = 19;
    return expect(review.preventsMisunderstandings).to.equal(19);
  });

  it('can set proactive to 20', () => {
    review.proactive = 20;
    return expect(review.proactive).to.equal(20);
  });

  it('can set resilienceFeedback to 21', () => {
    review.resilienceFeedback = 21;
    return expect(review.resilienceFeedback).to.equal(21);
  });

  it('can set signifiesInterest to 22', () => {
    review.signifiesInterest = 22;
    return expect(review.signifiesInterest).to.equal(22);
  });

  it('can set tone to 23', () => {
    review.tone = 23;
    return expect(review.tone).to.equal(23);
  });

  it('can set toverbalAttentiveFeedbackne to 24', () => {
    review.verbalAttentiveFeedback = 24;
    return expect(review.verbalAttentiveFeedback).to.equal(24);
  });

  it('can set workDemands to 25', () => {
    review.workDemands = 25;
    return expect(review.workDemands).to.equal(25);
  });

});