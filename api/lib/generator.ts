/*
  ===========================================================================
    Copyright (C) 2020 Coreable
    This file is part of Coreable's source code.
    Coreables source code is free software; you can redistribute it
    and/or modify it under the terms of the End-user license agreement.
    Coreable's source code is distributed in the hope that it will be
    useful, but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
    You should have received a copy of the license along with the 
    Coreable source code.
  ===========================================================================
*/

import { times } from 'lodash';
import Faker from 'faker';

import { User } from '../identity/models/User';
import { UniversityTeam } from '../enterprise/university/models/Team';
import { UniversitySubject } from '../enterprise/university/models/Subject';
import { UniversityReview } from '../enterprise/university/models/Review';
import { UniversityIndustry } from '../enterprise/university/models/Industry';

const industrys: UniversityIndustry[] = [];
const users: User[] = [];
const teams: UniversityTeam[] = [];
const reviews: UniversityReview[] = [];
const subjects: UniversitySubject[] = [];

// Generates fake data for the database
export async function generator() {
  let promises: any = [];

  // Create Industry
  times(2, (i) => {
    promises.push(async function () {
      const industry = await UniversityIndustry.create({
        name: Faker.address.city()
      });
      return industrys.push(industry);
    });
  });
  await inSequence(promises).then(() => {
    promises = [];
  });

  // Create User
  times(5, (i) => {
    promises.push(async function () {
      const user = await User.create({
        firstName: `user ${i}`,
        lastName: `user ${i}`,
        email: `u${i}@${i}.com`,
        password: 'unittest',
        industry_id: industrys[i % 2]._id
      });
      return users.push(user);
    });
  });
  await inSequence(promises).then(() => {
    promises = [];
  });

  // Create Subject
  times(3, (i) => {
    promises.push(async function () {
      const subject = await UniversitySubject.create({
        name: `subject ${i}`,
        state: 2
      });
      return subjects.push(subject);
    });
  });
  await inSequence(promises).then(() => {
    promises = [];
  });

  // Create Team
  times(3, (i) => {
    promises.push(async function () {
      const team = await UniversityTeam.create({
        name: `team ${i}`,
        inviteCode: `team${i}`,
        subject_id: `${subjects[i]._id}`
      });
      return teams.push(team);
    })
  });
  await inSequence(promises).then(() => {
    promises = [];
  });

  // Add users to team0
  // u3@3.com & u4@4.com are not in any team
  times(3, (i) => {
    promises.push(async function () {
      const user: any = await User.findOne({ where: { _id: users[i]._id } });
      const team: any = await UniversityTeam.findOne({ where: { _id: teams[0]._id } });
      return await user.addTeam(team);
    });
  });
  await inSequence(promises).then(() => {
    promises = [];
  });

  // User 0 reviews themself
  promises.push(async function () {
    const stats = generateReview();
    const review = await UniversityReview.create({
      receiver_id: users[0]._id,
      submitter_id: users[0]._id,
      subject_id: subjects[0]._id,
      team_id: teams[0]._id,
      state: 1,
      ...stats
    });
    return reviews.push(review);
  });

  // User 0 reviews User 1
  promises.push(async function () {
    const stats = generateReview();
    const review = await UniversityReview.create({
      receiver_id: users[1]._id,
      submitter_id: users[0]._id,
      subject_id: subjects[0]._id,
      team_id: teams[0]._id,
      state: 2,
      ...stats
    });
    return reviews.push(review);
  });

  // User 1 reviews User 0
  promises.push(async function () {
    const stats = generateReview();
    const review = await UniversityReview.create({
      receiver_id: users[0]._id,
      submitter_id: users[1]._id,
      subject_id: subjects[0]._id,
      team_id: teams[0]._id,
      state: 2,
      ...stats
    });
    return reviews.push(review);
  });

  // User 1 reviews User 2
  promises.push(async function () {
    const stats = generateReview();
    const review = await UniversityReview.create({
      receiver_id: users[2]._id,
      submitter_id: users[1]._id,
      subject_id: subjects[0]._id,
      team_id: teams[0]._id,
      state: 2,
      ...stats
    });
    return reviews.push(review);
  });

  // User 2 reviews User 1
  promises.push(async function () {
    const stats = generateReview();
    const review = await UniversityReview.create({
      receiver_id: users[1]._id,
      submitter_id: users[2]._id,
      subject_id: subjects[0]._id,
      team_id: teams[0]._id,
      state: 2,
      ...stats
    });
    return reviews.push(review);
  });

  // User 2 reviews User 2
  promises.push(async function () {
    const stats = generateReview();
    const review = await UniversityReview.create({
      receiver_id: users[2]._id,
      submitter_id: users[2]._id,
      subject_id: subjects[0]._id,
      team_id: teams[0]._id,
      state: 1,
      ...stats
    });
    return reviews.push(review);
  });
  await inSequence(promises).then(() => {
    promises = [];
  });

  // Managers
  // times(3, (i) => {
  //   promises.push(async function () {
  //     const manager = await Manager.create({
  //       firstName: `manager ${i}`,
  //       lastName: `$manager ${i}`,
  //       email: `m${i}@${i}.com`,
  //       password: 'unittest'
  //     });
  //     return managers.push(manager);
  //   });
  // });
  // await inSequence(promises).then(() => {
  //   promises = [];
  // });

  // Add manager0 to subject0
  // Add manager1 to subject1
  // times(2, (i) => {
  //   promises.push(async function () {
  //     (managers[i] as any).addSubject(subjects[i]);
  //   });
  // });
  // await inSequence(promises).then(() => {
  //   promises = [];
  // });

  return true;
}

const generateReview = () => {
  return {
    calm: Faker.random.number({ min: 1, max: 100 }),
    clearInstructions: Faker.random.number({ min: 1, max: 100 }),
    cooperatively: Faker.random.number({ min: 1, max: 100 }),
    crossTeam: Faker.random.number({ min: 1, max: 100 }),
    distractions: Faker.random.number({ min: 1, max: 100 }),
    easilyExplainsComplexIdeas: Faker.random.number({ min: 1, max: 100 }),
    empathy: Faker.random.number({ min: 1, max: 100 }),
    usesRegulators: Faker.random.number({ min: 1, max: 100 }),
    influences: Faker.random.number({ min: 1, max: 100 }),
    managesOwn: Faker.random.number({ min: 1, max: 100 }),
    newIdeas: Faker.random.number({ min: 1, max: 100 }),
    openToShare: Faker.random.number({ min: 1, max: 100 }),
    positiveBelief: Faker.random.number({ min: 1, max: 100 }),
    proactive: Faker.random.number({ min: 1, max: 100 }),
    resilienceFeedback: Faker.random.number({ min: 1, max: 100 }),
    signifiesInterest: Faker.random.number({ min: 1, max: 100 }),
    workDemands: Faker.random.number({ min: 1, max: 100 })
  };
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
