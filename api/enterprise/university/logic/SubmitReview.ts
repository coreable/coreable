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

import { CoreableError } from "../../../models/CoreableError";
import { GetUniversityAccountWithTeamsFromUser_id, GetUniversityAccountWithTeamsFromPrimaryKey } from "./GetUniversityAccountWithTeams";
import { GetTeamSubject } from "./GetTeamSubject";
import { UniversityReview } from "../models/Review";

export async function SubmitReview(root: any, args: any, context: any) {
  let errors: CoreableError[] = [];
  let userBeingReviewed: any;
  let userSubmittingReview: any;
  let userCommonTeam: any;
  let subject: any;
  if (!context.JWT) {
    errors.push({
      code: 'ER_AUTH_FAILURE',
      path: 'JWT',
      message: 'User unauthenticated'
    });
  }
  if (!errors.length) {
    userSubmittingReview = await GetUniversityAccountWithTeamsFromUser_id(context);
    if (!userSubmittingReview) {
      errors.push({
        code: 'ER_USER_UNKNOWN',
        path: '_id',
        message: `No user found with user_id ${context.JWT._id}`
      });
    }
  }
  if (!errors.length) {
    userBeingReviewed = await GetUniversityAccountWithTeamsFromPrimaryKey({ USER: { '_id': args.receiver_id } });
    if (!userBeingReviewed) {
      errors.push({
        code: 'ER_USER_UNKNOWN',
        path: '_id',
        message: `No user found with _id ${args.receiver_id}`
      });
    }
  }
  if (!errors.length) {
    let map: any = {};
    for (const userTeam of userSubmittingReview.teams) {
      if (!map[userTeam._id]) {
        map[userTeam._id] = userTeam._id;
      }
    }
    for (const userTeam of userBeingReviewed.teams) {
      if (map[userTeam._id] && map[userTeam._id] === args.team_id) {
        userCommonTeam = userTeam;
        break;
      }
    }
    if (!userCommonTeam) {
      errors.push({
        code: 'ER_TEAM_UNKNOWN',
        path: '_id',
        message:
          `Logged in user with _id ${userSubmittingReview._id} and user being reviewed with _id ${userBeingReviewed._id} have no common team with _id ${args.team_id}`
      });
    }
  }
  if (!errors.length) {
    subject = await GetTeamSubject(userCommonTeam, null, null);
    if (!subject) {
      errors.push({
        code: 'ER_SUBJECT_UNKNOWN',
        path: '_id',
        message: `Team with _id ${userCommonTeam._id} belongs to no subject!`
      });
    }
  }
  if (!errors.length) {
    const hasCompleted = await UniversityReview.findOne({
      where: {
        receiver_id: userBeingReviewed._id,
        submitter_id: userSubmittingReview._id,
        subject_id: subject._id,
        state: subject.state
      }
    });
    if (hasCompleted) {
      errors.push({
        code: 'ER_REVIEW_COMPLETE',
        path: '_id',
        message: `user with _id ${context.JWT._id} has already submitted a reivew on user with _id ${args.receiver_id} for state ${subject.state}`
      });
    }
  }
  if (!errors.length) {
    try {
      await UniversityReview.create({
        receiver_id: userBeingReviewed._id,
        submitter_id: userSubmittingReview._id,
        tutorial_id: args.tutorial_id,
        subject_id: subject._id,
        team_id: userCommonTeam._id,
        organisation_id: args.organisation_id,
        state: subject.state,
        
        calm: args.calm,
        clearInstructions: args.clearInstructions,
        cooperatively: args.cooperatively,
        crossTeam: args.crossTeam,
        distractions: args.distractions,
        easilyExplainsComplexIdeas: args.easilyExplainsComplexIdeas,
        empathy: args.empathy,
        usesRegulators: args.usesRegulators,
        influences: args.influences,
        managesOwn: args.managesOwn,
        newIdeas: args.newIdeas,
        openToShare: args.openToShare,
        positiveBelief: args.positiveBelief,
        proactive: args.proactive,
        resilienceFeedback: args.resilienceFeedback,
        signifiesInterest: args.signifiesInterest,
        workDemands: args.workDemands
      });
    } catch (err) {
      errors.push({
        code: err.original.code,
        message: err.original.sqlMessage,
        path: 'SQL'
      });
    }
  }
  return {
    'data': !errors.length ? {
      'review': await UniversityReview.findOne({
        where: {
          receiver_id: userBeingReviewed._id,
          submitter_id: userSubmittingReview._id,
          subject_id: subject._id,
          team_id: userCommonTeam._id,
          tutorial_id: args.tutorial_id,
          organisation_id: args.organisation_id,
          state: subject.state
        },
        attributes: {
          exclude: ['receiver_id']
        }
      })
    } : null,
    'errors': errors.length > 0 ? errors : null
  };
}