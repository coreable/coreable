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
import { UniversityTutorialResolver } from './Tutorial';
import { UniversitySubjectResolver } from './Subject';
import { UniversityUser } from '../../models/User';
import { UniversityTutorial } from '../../models/Tutorial';
import { UniversityTeam } from '../../models/Team';
import { UniversityOrganisationResolver } from './Organisation';
import { UniversityOrganisation } from '../../models/Organisation';

export const UniversityReviewResolver: GraphQLObjectType<UniversityReview> = new GraphQLObjectType({
  name: 'UniversityReviewResolver',
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
          if (!context.MANAGER) {
            return null;
          }
          return review.receiver_id;
        }
      },
      'receiver': {
        type: UniversityUserResolver,
        async resolve(review: any, args, context) {
          if (!context.MANAGER) {
            return null;
          }
          return await UniversityUser.findOne({
            where: {
              _id: review.receiver_id
            }
          });
        }
      },
      'submitter_id': {
        type: GraphQLString,
        resolve(review, args, context) {
          if (!context.MANAGER) {
            return null;
          }
          return review.submitter_id;
        }
      },
      'submitter': {
        type: UniversityUserResolver,
        async resolve(review: any, args, context) {
          if (!context.MANAGER) {
            return null;
          }
          return await UniversityUser.findOne({
            where: {
              _id: review.submitter_id
            }
          });
        }
      },
      'subject': {
        type: UniversitySubjectResolver,
        async resolve(review: any, args, context) {
          return await UniversityReview.findOne({
            where: {
              _id: review.subject_id
            }
          });
        }
      },
      'subject_id': {
        type: GraphQLString,
        resolve(review: any, args, context) {
          return review.subject_id;
        }
      },
      'tutorial': {
        type: UniversityTutorialResolver,
        async resolve(review: any, args, context) {
          return await UniversityTutorial.findOne({
            where: {
              _id: review.tutorial_id
            }
          });
        }
      },
      'tutorial_id': {
        type: GraphQLString,
        resolve(review: any, args, context) {
          return review.tutorial_id;
        }
      },
      'team': {
        type: UniversityTeamResolver,
        async resolve(review: any, args, context) {
          return await UniversityTeam.findOne({
            where: {
              _id: review.team_id
            }
          });
        }
      },
      'team_id': {
        type: GraphQLString,
        resolve(review, args, context) {
          return review.team_id;
        }
      },
      'organisation': {
        type: UniversityOrganisationResolver,
        async resolve(review: any, args, context) {
          return await UniversityOrganisation.findOne({
            where: {
              _id: review.organisation_id
            }
          });
        }
      },
      'organisation_id': {
        type: GraphQLString,
        resolve(review, args, context) {
          return review.organisation_id;
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