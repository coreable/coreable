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

// Identity
import { User } from '../graphql/identity/models/User';
import { Industry } from '../graphql/identity/models/Industry';
import { Manager } from '../graphql/identity/models/Manager';

// University
import { UniversityTeam } from '../graphql/university/models/Team';
import { UniversitySubject } from '../graphql/university/models/Subject';
import { UniversityUser } from '../graphql/university/models/User';
import { UniversityTutorial } from '../graphql/university/models/Tutorial';
import { UniversityOrganisation } from '../graphql/university/models/Organisation';

// Reference
import { ReferenceUser } from '../graphql/reference/models/User';
import { ReferenceInvite } from '../graphql/reference/models/Invite';
import { Review } from '../graphql/results/models/Review';
// import { ReferenceReview } from '../graphql/reference/models/Review';

// Identity
const users: User[] = [];
const industries: Industry[] = [];
const managers: Manager[] = [];

// University
const uniusers: UniversityUser[] = [];
const uniteams: UniversityTeam[] = [];
const unisubjects: UniversitySubject[] = [];
const unitutorials: UniversityTutorial[] = [];
const uniorganisations: UniversityOrganisation[] = [];

// Reference
const refusers: ReferenceUser[] = [];
const refinvites: ReferenceInvite[] = [];
// const refreviews: ReferenceReview[] = [];

// Reviews
const unireviews: Review[] = [];

// Generates fake data for the database
export async function generator() {
  let promises: any = [];

  /** ------------------------ IDENTITY ------------------------  */
  // Create Industry
  times(2, (i) => {
    promises.push(async function () {
      const industry = await Industry.create({
        name: Faker.address.city()
      });
      return industries.push(industry);
    });
  });
  await inSequence(promises).then(() => {
    promises = [];
  });

  // Create Users
  times(5, (i) => {
    promises.push(async function () {
      const user = await User.create({
        firstName: `user ${i}`,
        lastName: `user ${i}`,
        email: `u${i}@${i}.com`,
        password: 'unittest',
        industry_id: industries[i]._id
      });
      return users.push(user);
    });
  });
  await inSequence(promises).then(() => {
    promises = [];
  });

  // Create Managers
  times(2, (i) => {
    promises.push(async function () {
      const manager = await Manager.create({
        user_id: users[i]._id,
      });
      return managers.push(manager);
    });
  });
  await inSequence(promises).then(() => {
    promises = [];
  });

  /** ------------------------ UNIVERSITY ------------------------  */
  // Create Organisation
  times(2, (i) => {
    promises.push(async function () {
      const organisation = await UniversityOrganisation.create({
        name: Faker.company.bsNoun()
      });
      return uniorganisations.push(organisation);
    });
  });
  await inSequence(promises).then(() => {
    promises = [];
  });

  // Add managers to university organisations
  promises.push(async function () {
    const manager1: any = await Manager.findOne({ where: { user_id: users[0]._id } });
    await manager1.addOrganisation(uniorganisations[0]);
    const manager2: any = await Manager.findOne({ where: { user_id: users[1]._id } });
    manager2.addOrganisation(uniorganisations[1]);
  });
  await inSequence(promises).then(() => {
    promises = [];
  });

  // Create University Users
  times(5, (i) => {
    promises.push(async function () {
      const uniuser = await UniversityUser.create({
        user_id: users[i]._id,
      });
      return uniusers.push(uniuser);
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
        state: 2,
        organisation_id: uniorganisations[i]._id
      });
      return unisubjects.push(subject);
    });
  });
  await inSequence(promises).then(() => {
    promises = [];
  });

  // Create Tutorials
  times(3, (i) => {
    promises.push(async function () {
      const tutorial = await UniversityTutorial.create({
        name: `tutorial ${i}`,
        subject_id: unisubjects[i]._id
      });
      return unitutorials.push(tutorial)
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
        tutorial_id: `${unitutorials[i]._id}`
      });
      return uniteams.push(team);
    });
  });
  await inSequence(promises).then(() => {
    promises = [];
  });

  // Add users to team0
  // u3@3.com & u4@4.com are not in any team
  times(3, (i) => {
    promises.push(async function () {
      const user: any = await UniversityUser.findOne({ where: { _id: uniusers[i]._id } });
      const team: any = await UniversityTeam.findOne({ where: { _id: uniteams[0]._id } });
      return await user.addTeam(team);
    });
  });
  await inSequence(promises).then(() => {
    promises = [];
  });

  // User 0 reviews themself
  promises.push(async function () {
    const stats = generateReview();
    const review = await Review.create({
      uni_receiver_id: uniusers[0]._id,
      uni_submitter_id: uniusers[0]._id,
      uni_subject_id: unisubjects[0]._id,
      uni_team_id: uniteams[0]._id,
      uni_tutorial_id: unitutorials[0]._id,
      uni_organisation_id: uniorganisations[0]._id,
      uni_state: 1,
      ...stats
    });
    return unireviews.push(review);
  });

  // User 0 reviews User 1
  promises.push(async function () {
    const stats = generateReview();
    const review = await Review.create({
      uni_receiver_id: uniusers[1]._id,
      uni_submitter_id: uniusers[0]._id,
      uni_subject_id: unisubjects[0]._id,
      uni_tutorial_id: unitutorials[0]._id,
      uni_team_id: uniteams[0]._id,
      uni_organisation_id: uniorganisations[0]._id,
      uni_state: 2,
      ...stats
    });
    return unireviews.push(review);
  });

  // User 1 reviews User 0
  promises.push(async function () {
    const stats = generateReview();
    const review = await Review.create({
      uni_receiver_id: uniusers[0]._id,
      uni_submitter_id: uniusers[1]._id,
      uni_subject_id: unisubjects[0]._id,
      uni_tutorial_id: unitutorials[0]._id,
      team_id: uniteams[0]._id,
      organisation_id: uniorganisations[0]._id,
      state: 2,
      ...stats
    });
    return unireviews.push(review);
  });

  // User 1 reviews User 2
  promises.push(async function () {
    const stats = generateReview();
    const review = await Review.create({
      uni_receiver_id: uniusers[2]._id,
      uni_submitter_id: uniusers[1]._id,
      uni_subject_id: unisubjects[0]._id,
      uni_tutorial_id: unitutorials[0]._id,
      uni_team_id: uniteams[0]._id,
      uni_organisation_id: uniorganisations[0]._id,
      uni_state: 2,
      ...stats
    });
    return unireviews.push(review);
  });

  // User 2 reviews User 1
  promises.push(async function () {
    const stats = generateReview();
    const review = await Review.create({
      uni_receiver_id: uniusers[1]._id,
      uni_submitter_id: uniusers[2]._id,
      uni_subject_id: unisubjects[0]._id,
      uni_tutorial_id: unitutorials[0]._id,
      uni_team_id: uniteams[0]._id,
      uni_organisation_id: uniorganisations[0]._id,
      state: 2,
      ...stats
    });
    return unireviews.push(review);
  });

  // User 2 reviews User 2
  promises.push(async function () {
    const stats = generateReview();
    const review = await Review.create({
      receiver_id: uniusers[2]._id,
      submitter_id: uniusers[2]._id,
      subject_id: unisubjects[0]._id,
      tutorial_id: unitutorials[0]._id,
      team_id: uniteams[0]._id,
      organisation_id: uniorganisations[0]._id,
      state: 1,
      ...stats
    });
    return unireviews.push(review);
  });
  await inSequence(promises).then(() => {
    promises = [];
  });

  /** ------------------------ REFERENCE ------------------------  */
  // Create Reference Users
  times(5, (i) => {
    promises.push(async function () {
      const refuser = await ReferenceUser.create({
        user_id: users[i]._id,
      });
      return refusers.push(refuser);
    });
  });
  await inSequence(promises).then(() => {
    promises = [];
  });

  // Create Reference Invite
  times(5, (i) => {
    promises.push(async function () {
      const refinvite = await ReferenceInvite.create({
        requester_id: refusers[i]._id,
        name: Faker.name.firstName(),
        relation: Faker.commerce.department(),
        email: `u${(i+2)}@${(i+2)}.com`,
      });
      return refinvites.push(refinvite);
    });
  });
  await inSequence(promises).then(() => {
    promises = [];
  });

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
