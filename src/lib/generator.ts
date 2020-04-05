import { times } from 'lodash';
import Faker from 'faker';
import { User } from '../models/User';
import { Team } from '../models/Team';
// import { Review } from '../models/Review';
import { sequelize } from './sequelize';
import { Subject } from '../models/Subject';
import { Review } from '../models/Review';
// import { Manager } from '../models/Manager';

export const userIDs: string[] = [];
export const teamIDs: string[] = [];
export const reviewIDs: string[] = [];
export const subjectIDs: string[] = [];
export const managerIDs: string[] = [];

// Generates fake data for the database
export async function generator() {
  await sequelize.sync({ force: true });
  let promises: any = [];

  // Create User
  times(3, (i) => {
    promises.push(async function () {
      const user = await User.create({
        firstName: `user ${i}`,
        lastName: `user ${i}`,
        email: `u${i}@${i}.com`,
        password: 'unittest'
      });
      return userIDs.push(user._id);
    });
  });
  await inSequence(promises).then(() => {
    promises = [];
  });

  // Create Subject
  times(2, (i) => {
    promises.push(async function () {
      const subject = await Subject.create({
        name: `subject ${i}`,
        state: Faker.random.number({ min: 0, max: 3 })
      });
      return subjectIDs.push(subject._id);
    });
  });
  await inSequence(promises).then(() => {
    promises = [];
  });

  // Create Team
  times(2, (i) => {
    promises.push(async function () {
      const team = await Team.create({
        name: `team ${i}`,
        inviteCode: `team${i}`,
        subject_id: `${subjectIDs[i]}`
      });
      return teamIDs.push(team._id);
    })
  });
  await inSequence(promises).then(() => {
    promises = [];
  });

  // Add users to first team
  times(3, (i) => {
    promises.push(async function () {
      const user: any = await User.findOne({ where: { _id: userIDs[i] } });
      const team: any = await Team.findOne({ where: { _id: teamIDs[0] } });
      return await user.addTeam(team);
    });
  });
  await inSequence(promises).then(() => {
    promises = [];
  });

  // User 0 reviews themself
  promises.push(async function () {
    const review = await Review.create({
      receiver_id: userIDs[0],
      submitter_id: userIDs[0],
      state: Faker.random.number({ min: 1, max: 3 }),
      emotionalResponse: Faker.random.number({ min: 1, max: 99 }),
      empathy: Faker.random.number({ min: 1, max: 99 }),
      managesOwn: Faker.random.number({ min: 1, max: 99 }),
      faith: Faker.random.number({ min: 1, max: 99 }),
      cooperatively: Faker.random.number({ min: 1, max: 99 }),
      positiveBelief: Faker.random.number({ min: 1, max: 99 }),
      resilienceFeedback: Faker.random.number({ min: 1, max: 99 }),
      calm: Faker.random.number({ min: 1, max: 99 }),
      change: Faker.random.number({ min: 1, max: 99 }),
      newIdeas: Faker.random.number({ min: 1, max: 99 }),
      workDemands: Faker.random.number({ min: 1, max: 99 }),
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

  // User 0 reviews User 1
  promises.push(async function () {
    const review = await Review.create({
      receiver_id: userIDs[1],
      submitter_id: userIDs[0],
      state: Faker.random.number({ min: 1, max: 3 }),
      emotionalResponse: Faker.random.number({ min: 1, max: 99 }),
      empathy: Faker.random.number({ min: 1, max: 99 }),
      managesOwn: Faker.random.number({ min: 1, max: 99 }),
      faith: Faker.random.number({ min: 1, max: 99 }),
      cooperatively: Faker.random.number({ min: 1, max: 99 }),
      positiveBelief: Faker.random.number({ min: 1, max: 99 }),
      resilienceFeedback: Faker.random.number({ min: 1, max: 99 }),
      calm: Faker.random.number({ min: 1, max: 99 }),
      change: Faker.random.number({ min: 1, max: 99 }),
      newIdeas: Faker.random.number({ min: 1, max: 99 }),
      workDemands: Faker.random.number({ min: 1, max: 99 }),
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

  // User 1 reviews User 0
  promises.push(async function () {
    const review = await Review.create({
      receiver_id: userIDs[0],
      submitter_id: userIDs[1],
      state: Faker.random.number({ min: 1, max: 3 }),
      emotionalResponse: Faker.random.number({ min: 1, max: 99 }),
      empathy: Faker.random.number({ min: 1, max: 99 }),
      managesOwn: Faker.random.number({ min: 1, max: 99 }),
      faith: Faker.random.number({ min: 1, max: 99 }),
      cooperatively: Faker.random.number({ min: 1, max: 99 }),
      positiveBelief: Faker.random.number({ min: 1, max: 99 }),
      resilienceFeedback: Faker.random.number({ min: 1, max: 99 }),
      calm: Faker.random.number({ min: 1, max: 99 }),
      change: Faker.random.number({ min: 1, max: 99 }),
      newIdeas: Faker.random.number({ min: 1, max: 99 }),
      workDemands: Faker.random.number({ min: 1, max: 99 }),
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

  // User 1 reviews User 2
  promises.push(async function () {
    const review = await Review.create({
      receiver_id: userIDs[2],
      submitter_id: userIDs[1],
      state: Faker.random.number({ min: 1, max: 3 }),
      emotionalResponse: Faker.random.number({ min: 1, max: 99 }),
      empathy: Faker.random.number({ min: 1, max: 99 }),
      managesOwn: Faker.random.number({ min: 1, max: 99 }),
      faith: Faker.random.number({ min: 1, max: 99 }),
      cooperatively: Faker.random.number({ min: 1, max: 99 }),
      positiveBelief: Faker.random.number({ min: 1, max: 99 }),
      resilienceFeedback: Faker.random.number({ min: 1, max: 99 }),
      calm: Faker.random.number({ min: 1, max: 99 }),
      change: Faker.random.number({ min: 1, max: 99 }),
      newIdeas: Faker.random.number({ min: 1, max: 99 }),
      workDemands: Faker.random.number({ min: 1, max: 99 }),
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

  // User 2 reviews User 1
  promises.push(async function () {
    const review = await Review.create({
      receiver_id: userIDs[1],
      submitter_id: userIDs[2],
      state: Faker.random.number({ min: 1, max: 3 }),
      emotionalResponse: Faker.random.number({ min: 1, max: 99 }),
      empathy: Faker.random.number({ min: 1, max: 99 }),
      managesOwn: Faker.random.number({ min: 1, max: 99 }),
      faith: Faker.random.number({ min: 1, max: 99 }),
      cooperatively: Faker.random.number({ min: 1, max: 99 }),
      positiveBelief: Faker.random.number({ min: 1, max: 99 }),
      resilienceFeedback: Faker.random.number({ min: 1, max: 99 }),
      calm: Faker.random.number({ min: 1, max: 99 }),
      change: Faker.random.number({ min: 1, max: 99 }),
      newIdeas: Faker.random.number({ min: 1, max: 99 }),
      workDemands: Faker.random.number({ min: 1, max: 99 }),
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

  // User 2 reviews User 2
  promises.push(async function () {
    const review = await Review.create({
      receiver_id: userIDs[2],
      submitter_id: userIDs[2],
      state: Faker.random.number({ min: 1, max: 3 }),
      emotionalResponse: Faker.random.number({ min: 1, max: 99 }),
      empathy: Faker.random.number({ min: 1, max: 99 }),
      managesOwn: Faker.random.number({ min: 1, max: 99 }),
      faith: Faker.random.number({ min: 1, max: 99 }),
      cooperatively: Faker.random.number({ min: 1, max: 99 }),
      positiveBelief: Faker.random.number({ min: 1, max: 99 }),
      resilienceFeedback: Faker.random.number({ min: 1, max: 99 }),
      calm: Faker.random.number({ min: 1, max: 99 }),
      change: Faker.random.number({ min: 1, max: 99 }),
      newIdeas: Faker.random.number({ min: 1, max: 99 }),
      workDemands: Faker.random.number({ min: 1, max: 99 }),
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

  await inSequence(promises).then(() => {
    promises = [];
  });

  // // Managers
  // times(5, (i) => {
  //   promises.push(async function () {
  //     const manager = await Manager.create({
  //       firstName: Faker.name.firstName(),
  //       lastName: Faker.name.lastName(),
  //       email: Faker.internet.email(),
  //       password: Faker.random.alphaNumeric(10)
  //     });
  //     return managerIDs.push(manager._id);
  //   });
  // });
  // await inSequence(promises).then(() => {
  //   promises = [];
  // });

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
