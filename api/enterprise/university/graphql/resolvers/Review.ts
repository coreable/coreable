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

import {
  GraphQLObjectType,
  GraphQLFloat,
  GraphQLString,
} from 'graphql';

import { UniversityReview } from '../../models/Review';
import { UniversityUserResolver } from './User';
import { UniversityTeamResolver } from './Team';

export const ReviewResolver: GraphQLObjectType<UniversityReview> = new GraphQLObjectType({
  name: 'ReviewResolver',
  description: 'The representation of a Review',
  fields: () => {
    return {
      '_id': {
        type: GraphQLString,
        resolve(review, args, context) {
          return review._id;
        }
      },
      'receiver_id': {
        type: GraphQLString,
        resolve(review, args, context) {
          return review.receiver_id;
        }
      },
      'receiver': {
        type: UniversityUserResolver,
        async resolve(review: any, args, context) {
          return null;
          return await review.getReceiver();
        }
      },
      'submitter_id': {
        type: GraphQLString,
        resolve(review, args, context) {
          return review.submitter_id;
        }
      },
      'submitter': {
        type: UniversityUserResolver,
        async resolve(review: any, args, context) {
          return null;
          return await review.getSubmitter();
        }
      },
      'team': {
        type: UniversityTeamResolver,
        async resolve(review: any, args, context) {
          return await review.getTeam();
        }
      },
      'team_id': {
        type: GraphQLString,
        resolve(review, args, context) {
          return review.team_id;
        }
      },
      'calm': {
        type: GraphQLFloat,
        resolve(review, args, context) {
          return review.calm;
        }
      },
      'clearInstructions': {
        type: GraphQLFloat,
        resolve(review, args, context) {
          return review.clearInstructions;
        }
      },
      'cooperatively': {
        type: GraphQLFloat,
        resolve(review, args, context) {
          return review.cooperatively;
        }
      },
      'crossTeam': {
        type: GraphQLFloat,
        resolve(review, args, context) {
          return review.crossTeam;
        }
      },
      'distractions': {
        type: GraphQLFloat,
        resolve(review, args, context) {
          return review.distractions;
        }
      },
      'easilyExplainsComplexIdeas': {
        type: GraphQLFloat,
        resolve(review, args, context) {
          return review.easilyExplainsComplexIdeas;
        }
      },
      'empathy': {
        type: GraphQLFloat,
        resolve(review, args, context) {
          return review.empathy;
        }
      },
      'usesRegulators': {
        type: GraphQLFloat,
        resolve(review, args, context) {
          return review.usesRegulators;
        }
      },
      'influences': {
        type: GraphQLFloat,
        resolve(review, args, context) {
          return review.influences;
        }
      },
      'managesOwn': {
        type: GraphQLFloat,
        resolve(review, args, context) {
          return review.managesOwn;
        }
      },
      'newIdeas': {
        type: GraphQLFloat,
        resolve(review, args, context) {
          return review.newIdeas;
        }
      },
      'openToShare': {
        type: GraphQLFloat,
        resolve(review, args, context) {
          return review.openToShare;
        }
      },
      'positiveBelief': {
        type: GraphQLFloat,
        resolve(review, args, context) {
          return review.positiveBelief;
        }
      },
      'proactive': {
        type: GraphQLFloat,
        resolve(review, args, context) {
          return review.proactive;
        }
      },
      'resilienceFeedback': {
        type: GraphQLFloat,
        resolve(review, args, context) {
          return review.resilienceFeedback;
        }
      },
      'signifiesInterest': {
        type: GraphQLFloat,
        resolve(review, args, context) {
          return review.signifiesInterest;
        }
      },
      'workDemands': {
        type: GraphQLFloat,
        resolve(review, args, context) {
          return review.workDemands;
        }
      },
      'createdAt': {
        type: GraphQLString,
        resolve(review, args, context) {
          return review.createdAt;
        }
      }
    }
  }
});