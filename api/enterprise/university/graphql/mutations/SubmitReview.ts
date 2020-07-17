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

import { sequelize } from "../../../../lib/sequelize";
import { 
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt
} from "graphql";

import { ReviewObjectCommand } from "../command/object/Review";
import { CoreableError } from "../../../../models/CoreableError";
import { UniversityTeam } from "../../models/Team";
import { UniversityReview } from "../../models/Review";

export default {
  type: ReviewObjectCommand,
  args: {
    receiver_id: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The user being reviewed'
    },
    team_id: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The team they have in common'
    },
    tutorial_id: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The tutorial they have in common'
    },
    subject_id: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The subject the review belongs to'
    },
    // Reviews 
    calm: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    clearInstructions: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    cooperatively: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    crossTeam: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    distractions: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    easilyExplainsComplexIdeas: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    empathy: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    usesRegulators: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    influences: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    managesOwn: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    newIdeas: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    openToShare: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    positiveBelief: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    proactive: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    resilienceFeedback: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    signifiesInterest: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    workDemands: {
      type: new GraphQLNonNull(GraphQLInt),
    },
  },
  async resolve(root: any, args: any, context: any) {
    // @todo #1 Should reviews have a team ID and be team specific?
    // @todo #2 Should self reviews be allowed after x amount of time and not per subject state? 
    let errors: CoreableError[] = [];
    let userBeingReviewed: any;
    let userCommonTeam: any;
    let subject: any;
    if (!context.USER) {
      errors.push({ code: 'ER_AUTH_FAILURE', path: 'JWT', message: 'User unauthenticated' });
    }
    if (!errors.length) {
      userBeingReviewed = await sequelize.models.User.findOne({
          where: { _id: args.receiver_id },
          include: [
            { 
              model: UniversityTeam, as: 'teams', attributes: {
                exclude:  ['inviteCode']
              }
            }
          ] 
        });
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
      for (const userTeam of context.USER.teams) {
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
            `Logged in user with _id ${context.USER._id} and user being reviewed with _id ${args.receiver_id} have no common team with _id ${args.team_id}` 
          });
      }
    }
    if (!errors.length) {
      subject = await userCommonTeam.getSubject();
      if (!subject) {
        errors.push({ code: 'ER_SUBJECT_UNKNOWN', path: '_id', message: `Team with _id ${userCommonTeam._id} belongs to no subject!` });
      }
    }
    if (!errors.length) {
      const hasCompleted = await sequelize.models.Review.findOne({
          where: {
            receiver_id: args.receiver_id,
            submitter_id: context.USER._id,
            subject_id: args.subject_id,
            state: subject.state
          }
        });
      if (hasCompleted) {
        errors.push({
            code: 'ER_REVIEW_COMPLETE',
            path: '_id',
            message: `user with _id ${context.USER._id} has already submitted a reivew on user with _id ${args.receiver_id} for state ${subject.state}`
          });
      }
    }
    if (!errors.length) {
      try {
        await UniversityReview.create({
          receiver_id: args.receiver_id,
          submitter_id: context.USER._id,
          tutorial_id: args.tutorial_id,
          subject_id: args.subject_id,
          team_id: args.team_id,
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
        errors.push({ 'code': err.original.code, 'message': err.original.sqlMessage, 'path': 'SQL' });
      }
    }
    return {
      'data': !errors.length ? {
        'review': await sequelize.models.Review.findOne(
          {
            where: { 
              receiver_id: args.receiver_id,
              submitter_id: context.USER._id,
              subject_id: subject._id,
              team_id: args.team_id,
              state: subject.state 
            }, 
            exclude: ['receiver_id']
          }
        )
      }: null,
      'errors': errors.length > 0 ? errors : null
    };
  }
}
