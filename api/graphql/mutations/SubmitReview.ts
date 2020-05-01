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

import { sequelize } from "../../lib/sequelize";
import { 
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt
} from "graphql";

import { ReviewObjectCommand } from "../command/object/Review";
import { CoreableError } from "../../models/CoreableError";
import { Team } from "../../models/Team";
import { Review } from "../../models/Review";
import { Manager } from "../../models/Manager";

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
    subject_id: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The subject the review belongs to'
    },
    // Reviews 
    emotionalResponse: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    empathy: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    managesOwn: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    cooperatively: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    positiveBelief: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    resilienceFeedback: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    calm: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    change: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    newIdeas: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    workDemands: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    proactive: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    influences: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    clearInstructions: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    easilyExplainsComplexIdeas: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    openToShare: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    tone: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    crossTeam: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    distractions: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    eyeContact: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    signifiesInterest: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    verbalAttentiveFeedback: {
      type: new GraphQLNonNull(GraphQLInt),
    }
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
      if (context.USER instanceof Manager) {
        errors.push({ code: 'ER_MANAGER', message: 'Managers can not submit reviews', path: 'JWT' });
      }
    }
    if (!errors.length) {
      userBeingReviewed = await sequelize.models.User.findOne({ where: { _id: args.receiver_id }, include: [{ model: Team, as: 'teams', attributes: { exclude:  ['inviteCode'] } }] });
      if (!userBeingReviewed) {
        errors.push({ code: 'ER_USER_UNKNOWN', path: '_id', message: `No user found with _id ${args.receiver_id}` });
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
        errors.push({ code: 'ER_TEAM_UNKNOWN', path: '_id', message: `Logged in user with _id ${context.USER._id} and user being reviewed with _id ${args.receiver_id} have no common team with _id ${args.team_id}` });
      }
    }
    if (!errors.length) {
      subject = await userCommonTeam.getSubject();
      if (!subject) {
        errors.push({ code: 'ER_SUBJECT_UNKNOWN', path: '_id', message: `Team with _id ${userCommonTeam._id} belongs to no subject!` });
      }
      if ((args.receiver_id === context.USER._id) && subject.state !== 1) {
        errors.push({ code: 'ER_REFLECTION_STATE', path: 'subject', message: `A user can only submit a reflection review during subject state 1` });
      }
    }
    if (!errors.length) {
      let hasCompleted = await sequelize.models.Review.findOne(
        {
          where: {
            receiver_id: args.receiver_id,
            submitter_id: context.USER._id,
            state: subject.state
          }
        }
      );
      if (hasCompleted) {
        errors.push({ code: 'ER_REVIEW_COMPLETE', path: '_id', message: `user with _id ${context.USER._id} has already submitted a reivew on user with _id ${args.receiver_id} for state ${subject.state}` });
      }
    }
    if (!errors.length) {
      try {
        await Review.create({
          receiver_id: args.receiver_id,
          submitter_id: context.USER._id,
          state: subject.state,
          emotionalResponse: args.emotionalResponse,
          empathy: args.empathy,
          managesOwn: args.managesOwn,
          cooperatively: args.cooperatively,
          positiveBelief: args.positiveBelief,
          resilienceFeedback: args.resilienceFeedback,
          calm: args.calm,
          change: args.change,
          newIdeas: args.newIdeas,
          workDemands: args.workDemands,
          proactive: args.proactive,
          influences: args.influences,
          clearInstructions: args.clearInstructions,
          easilyExplainsComplexIdeas: args.easilyExplainsComplexIdeas,
          openToShare: args.openToShare,
          tone: args.tone,
          crossTeam: args.crossTeam,
          distractions: args.distractions,
          eyeContact: args.eyeContact,
          signifiesInterest: args.signifiesInterest,
          verbalAttentiveFeedback: args.verbalAttentiveFeedback
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
