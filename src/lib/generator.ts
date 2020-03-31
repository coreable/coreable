import _ from 'lodash';
import Faker from 'faker';
import { User } from '../models/User';
import { Team } from '../models/Team';
import { Review } from '../models/Review';
import { sequelize } from './sequelize';
import { Subject } from '../models/Subject';
import { Manager } from '../models/Manager';

export const userIDs: string[] = [];
export const teamIDs: string[] = [];
export const reviewIDs: string[] = [];
export const subjectIDs: string[] = [];

// Generates fake data for the database
export async function generator() {
  await sequelize.sync({ force: true });
  let promises: any = [];

  // User
  _.times(20, (i) => {
    promises.push(function () {
      return User.create({
        firstName: Faker.name.firstName(),
        lastName: Faker.name.lastName(),
        email: Faker.internet.email(),
        password: Faker.random.alphaNumeric(10)
      }).then((user) => userIDs.push(user.userID));
    });
  });
  await inSequence(promises).then(() => {
    promises = [];
  });

  // Create subject
  _.times(10, (i) => {
    promises.push(function () {
      return Subject.create({
        subjectName: Faker.name.jobTitle(),
        state: Faker.random.number({ min: 0, max: 3 })
      }).then((subject) => subjectIDs.push(subject.subjectID));
    });
  });
  await inSequence(promises).then(() => {
    promises = [];
  });

  // Team
  _.times(20, () => {
    promises.push(function () {
      return Team.create({
        teamName: Faker.commerce.productName(),
        inviteCode: Faker.random.alphaNumeric(5),
        subjectID: subjectIDs[Faker.random.number({ min: 0, max: 9 })]
      }).then((team) => teamIDs.push(team.teamID));
    })
  });
  await inSequence(promises).then(() => {
    promises = [];
  });

  // Add user to team
  _.times(10, (i) => {
    promises.push(function () {
      return new Promise((resolve, reject) => {
        return User.findOne({ where: { userID: userIDs[i] } }).then((user: any) => {
          let teamID: any;
          do {
            teamID = teamIDs[Faker.random.number({ min: 0, max: 15 })]
          } while (!teamID);
          return Team.findOne({ where: { teamID: teamID } }).then((team: any) => {
            return user.addTeam(team).then(() => resolve()).catch(() => reject());
          }).catch(() => reject());
        }).catch(() => reject());
      })
    });
  });
  await inSequence(promises).then(() => {
    promises = [];
  });

  // Review
  _.times(10, (i) => {
    promises.push(function () {
      return Review.create({
        userID: userIDs[Faker.random.number({ min: 0, max: 19 })],
        submittedByID: userIDs[Faker.random.number({ min: 0, max: 19 })],
        state: Faker.random.number({ min: 1, max: 3 }),
        emotionalResponse: Faker.random.number({ min: 1, max: 100 }),
        empathy: Faker.random.number({ min: 1, max: 100 }),
        managesOwn: Faker.random.number({ min: 1, max: 100 }),
        faith: Faker.random.number({ min: 1, max: 100 }),
        cooperatively: Faker.random.number({ min: 1, max: 100 }),
        positiveBelief: Faker.random.number({ min: 1, max: 100 }),
        resilienceFeedback: Faker.random.number({ min: 1, max: 100 }),
        calm: Faker.random.number({ min: 1, max: 100 }),
        change: Faker.random.number({ min: 1, max: 100 }),
        newIdeas: Faker.random.number({ min: 1, max: 100 }),
        workDemands: Faker.random.number({ min: 1, max: 100 }),
        proactive: Faker.random.number({ min: 1, max: 100 }),
        influences: Faker.random.number({ min: 1, max: 100 }),
        clearInstructions: Faker.random.number({ min: 1, max: 100 }),
        preventsMisunderstandings: Faker.random.number({ min: 1, max: 100 }),
        easilyExplainsComplexIdeas: Faker.random.number({ min: 1, max: 100 }),
        openToShare: Faker.random.number({ min: 1, max: 100 }),
        tone: Faker.random.number({ min: 1, max: 100 }),
        crossTeam: Faker.random.number({ min: 1, max: 100 }),
        distractions: Faker.random.number({ min: 1, max: 100 }),
        eyeContact: Faker.random.number({ min: 1, max: 100 }),
        signifiesInterest: Faker.random.number({ min: 1, max: 100 }),
        verbalAttentiveFeedback: Faker.random.number({ min: 1, max: 100 })
      }).then((review) => reviewIDs.push(review.reviewID));
    });
  });
  await inSequence(promises).then(() => {
    promises = [];
  });

  // User
  _.times(20, (i) => {
    promises.push(function () {
      return Manager.create({
        firstName: Faker.name.firstName(),
        lastName: Faker.name.lastName(),
        email: Faker.internet.email(),
        password: Faker.random.alphaNumeric(10)
      }).then((manager) => userIDs.push(manager.managerID));
    });
  });
  await inSequence(promises).then(() => {
    promises = [];
  });


  return true;
}

// Completes an array of functions that return promises in sequence
// Two Examples
// let arr = [
//   () => new Promise(),
//   () => { return new Promise() },
// ];
export async function inSequence(tasks: Promise<any>[]) {
  return await tasks.reduce(async (promise: Promise<any>, task: any) => await promise.then(task).catch(() => Promise.resolve()), Promise.resolve())
}
