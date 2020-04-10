/*
===========================================================================
Copyright (C) 2020 Coreable
This file is part of Coreable's source code.
Corables source code is free software; you can redistribute it
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

import { User } from '../models/User';
import { Team } from '../models/Team';
import { Subject } from '../models/Subject';
import { Review } from '../models/Review';
import { Manager } from '../models/Manager';

const users: User[] = [];
const teams: Team[] = [];
const reviews: Review[] = [];
const subjects: Subject[] = [];
const managers: Manager[] = [];

// Generates fake data for the database
export async function generator() {
  let promises: any = [];

  // Create User
  times(5, (i) => {
    promises.push(async function () {
      const user = await User.create({
        firstName: `user ${i}`,
        lastName: `user ${i}`,
        email: `u${i}@${i}.com`,
        password: 'unittest'
      });
      return users.push(user);
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
      const team = await Team.create({
        name: `team ${i}`,
        inviteCode: `team${i}`,
        subject_id: `${subjects[Faker.random.number({ min: 0, max: 1 })]._id}`
      });
      return teams.push(team);
    })
  });
  await inSequence(promises).then(() => {
    promises = [];
  });

  // Add users to first team
  // u3@3.com is not in any team
  times(3, (i) => {
    promises.push(async function () {
      const user: any = await User.findOne({ where: { _id: users[i]._id } });
      const team: any = await Team.findOne({ where: { _id: teams[0]._id } });
      return await user.addTeam(team);
    });
  });
  await inSequence(promises).then(() => {
    promises = [];
  });

  // User 0 reviews themself
  promises.push(async function () {
    const review = await Review.create({
      receiver_id: users[0]._id,
      submitter_id: users[0]._id,
      state: 1,
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
    return reviews.push(review);
  });

  // User 0 reviews User 1
  promises.push(async function () {
    const review = await Review.create({
      receiver_id: users[1]._id,
      submitter_id: users[0]._id,
      state: 2,
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
    return reviews.push(review);
  });

  // User 1 reviews User 0
  promises.push(async function () {
    const review = await Review.create({
      receiver_id: users[0]._id,
      submitter_id: users[1]._id,
      state: 2,
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
    return reviews.push(review);
  });

  // User 1 reviews User 2
  promises.push(async function () {
    const review = await Review.create({
      receiver_id: users[2]._id,
      submitter_id: users[1]._id,
      state: 2,
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
    return reviews.push(review);
  });

  // User 2 reviews User 1
  promises.push(async function () {
    const review = await Review.create({
      receiver_id: users[1]._id,
      submitter_id: users[2]._id,
      state: 2,
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
    return reviews.push(review);
  });

  // User 2 reviews User 2
  promises.push(async function () {
    const review = await Review.create({
      receiver_id: users[2]._id,
      submitter_id: users[2]._id,
      state: 1,
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
    return reviews.push(review);
  });
  await inSequence(promises).then(() => {
    promises = [];
  });

  // Managers
  times(3, (i) => {
    promises.push(async function () {
      const manager = await Manager.create({
        firstName: `manager ${i}`,
        lastName: `$manager ${i}`,
        email: `m${i}@${i}.com`,
        password: 'unittest'
      });
      return managers.push(manager);
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
