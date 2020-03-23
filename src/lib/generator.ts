import _ from 'lodash';
import Faker from 'faker';
import { Industry } from '../models/Industry';
import { User } from '../models/User';
import { Group } from '../models/Group';
import { Team } from '../models/Team';
import { Review } from '../models/Review';
import { sequelize } from './sequelize';

// Generates fake data for the database
export async function generator() {
  await sequelize.sync({ force: true });
  let promises: any = [];
  
  // Industry
  _.times(5, () => {
    promises.push(function () {
      return Industry.create({ industryName: Faker.company.companyName() })
    });
  });
  await inSequence(promises).then(() => {
    promises = [];
  });

  // User
  _.times(20, () => {
    promises.push(function () {
      return User.create({
        firstName: Faker.name.firstName(),
        lastName: Faker.name.lastName(),
        email: Faker.internet.email(),
        industryID: Faker.random.number({min: 1, max: 5}),
        // cognitoID: Faker.random.alphaNumeric(5)
      });
    });
  });
  await inSequence(promises).then(() => {
    promises = [];
  });
  
  // Group
  _.times(5, () => {
    promises.push(function() {
      return Group.create({
        groupName: Faker.company.companyName(),
        groupLeaderID: Faker.random.number({min: 1, max: 15}),
        inviteCode: Faker.random.alphaNumeric(5),
        industryID: Faker.random.number({min: 1, max: 5})
      })
    });
  });
  await inSequence(promises).then(() => {
    promises = [];
  });

  // Team
  _.times(20, () => {
    promises.push(function() {
      return Team.create({
        userID: Faker.random.number({min: 1, max: 15}),
        groupID: Faker.random.number({min: 1, max: 5}),
      });
    })
  });
  await inSequence(promises).then(() => {
    promises = [];
  });

  // Review
  _.times(30, () => {
    promises.push(function() {
      return Review.create({
        subjectID: Faker.random.number({min: 1, max: 15}),
        completedByID: Faker.random.number({min: 1, max: 15}),
        emotionalResponse: Faker.random.number({min: 1, max: 100}),
        empathy: Faker.random.number({min: 1, max: 100}),
        managesOwn: Faker.random.number({min: 1, max: 100}),
        faith: Faker.random.number({min: 1, max: 100}),
        cooperatively: Faker.random.number({min: 1, max: 100}),
        positiveBelief: Faker.random.number({min: 1, max: 100}),
        resilienceFeedback: Faker.random.number({min: 1, max: 100}),
        calm: Faker.random.number({min: 1, max: 100}),
        change: Faker.random.number({min: 1, max: 100}),
        newIdeas: Faker.random.number({min: 1, max: 100}),
        workDemands: Faker.random.number({min: 1, max: 100}),
        proactive: Faker.random.number({min: 1, max: 100}),
        influences: Faker.random.number({min: 1, max: 100}),
        clearInstructions: Faker.random.number({min: 1, max: 100}),
        preventsMisunderstandings: Faker.random.number({min: 1, max: 100}),
        easilyExplainsComplexIdeas: Faker.random.number({min: 1, max: 100}),
        openToShare: Faker.random.number({min: 1, max: 100}),
        tone: Faker.random.number({min: 1, max: 100}),
        crossTeam: Faker.random.number({min: 1, max: 100}),
        distractions: Faker.random.number({min: 1, max: 100}),
        eyeContact: Faker.random.number({min: 1, max: 100}),
        signifiesInterest: Faker.random.number({min: 1, max: 100}),
        verbalAttentiveFeedback: Faker.random.number({min: 1, max: 100})
      });
    });
  });
  await inSequence(promises).then(() => {
    promises = [];
  });
}

// Completes an array of functions that return promises in sequence
export async function inSequence(tasks: Promise<any>[]) {
  return await tasks.reduce(async (promise: Promise<any>, task: any) => await promise.then(task).catch(() => Promise.resolve()), Promise.resolve())
}