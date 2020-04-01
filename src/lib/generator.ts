import { times } from 'lodash';
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
export const managerIDs: string[] = [];

// Generates fake data for the database
export async function generator() {
  await sequelize.sync({ force: true });
  let promises: any = [];

  // User (don't make this 10.)
  times(15, (i) => {
    promises.push(async function () {
      const user = await User.create({
        firstName: Faker.name.firstName(),
        lastName: Faker.name.lastName(),
        email: Faker.internet.email(),
        password: Faker.random.alphaNumeric(10)
      });
      return userIDs.push(user._id);
    });
  });
  await inSequence(promises).then(() => {
    promises = [];
  });

  // Create subject
  times(10, (i) => {
    promises.push(async function () {
      const subject = await Subject.create({
        name: Faker.name.jobTitle(),
        state: Faker.random.number({ min: 0, max: 3 })
      });
      return subjectIDs.push(subject._id);
    });
  });
  await inSequence(promises).then(() => {
    promises = [];
  });

  // Team
  times(10, () => {
    promises.push(async function () {
      const team = await Team.create({
        name: Faker.commerce.productName(),
        inviteCode: Faker.random.alphaNumeric(5),
        subject_id: subjectIDs[Faker.random.number({ min: 0, max: 9 })]
      });
      return teamIDs.push(team._id);
    })
  });
  await inSequence(promises).then(() => {
    promises = [];
  });

  // Add user to team
  times(10, (i) => {
    promises.push(async function () {
      const user: any = await User.findOne({ where: { _id: userIDs[i] } });
      const team: any = await Team.findOne({ where: { _id: teamIDs[Faker.random.number({ min: 0, max: 9 })] } });
      return await user.addTeam(team);
    });
  });
  await inSequence(promises).then(() => {
    promises = [];
  });

  // Review
  times(10, (i) => {
    promises.push(async function () {
      const review = await Review.create({
        receiver_id: userIDs[Faker.random.number({ min: 0, max: 14 })],
        submitter_id: userIDs[Faker.random.number({ min: 0, max: 14 })],
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
      });
      return reviewIDs.push(review._id);
    });
  });
  await inSequence(promises).then(() => {
    promises = [];
  });

  // Managers
  times(5, (i) => {
    promises.push(async function () {
      const manager = await Manager.create({
        firstName: Faker.name.firstName(),
        lastName: Faker.name.lastName(),
        email: Faker.internet.email(),
        password: Faker.random.alphaNumeric(10)
      });
      return managerIDs.push(manager._id);
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
