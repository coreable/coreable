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

import { UniversityUserResolver } from '../../university/resolvers/User';
import { UniversityTeamResolver } from '../../university/resolvers/Team';
import { UniversityTutorialResolver } from '../../university/resolvers/Tutorial';
import { UniversityOrganisationResolver } from '../../university/resolvers/Organisation'; 
import { UniversitySubjectResolver } from '../../university/resolvers/Subject';

import { Review } from '../models/Review';
import { UniversityUser } from '../../university/models/User';
import { UniversityTutorial } from '../../university/models/Tutorial';
import { UniversityTeam } from '../../university/models/Team';
import { UniversityOrganisation } from '../../university/models/Organisation';
import { UniversitySubject } from '../../university/models/Subject';

export const ReviewResolver: GraphQLObjectType<Review> = new GraphQLObjectType({
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
      /** -------------------- UNIVERSITY -------------------- */
      'uni_receiver_id': {
        type: GraphQLString,
        resolve(review, args, context) {
          if (!context.MANAGER) {
            return null;
          }
          return review.uni_receiver_id;
        }
      },
      'uni_receiver': {
        type: UniversityUserResolver,
        async resolve(review: any, args, context) {
          if (!context.MANAGER) {
            return null;
          }
          return await UniversityUser.findOne({
            where: {
              _id: review.uni_receiver_id
            }
          });
        }
      },
      'uni_submitter_id': {
        type: GraphQLString,
        resolve(review, args, context) {
          if (!context.MANAGER) {
            return null;
          }
          return review.uni_submitter_id;
        }
      },
      'uni_submitter': {
        type: UniversityUserResolver,
        async resolve(review: any, args, context) {
          if (!context.MANAGER) {
            return null;
          }
          return await UniversityUser.findOne({
            where: {
              _id: review.uni_submitter_id
            }
          });
        }
      },
      'uni_subject': {
        type: UniversitySubjectResolver,
        async resolve(review: any, args, context) {
          return await UniversitySubject.findOne({
            where: {
              _id: review.uni_subject_id
            }
          });
        }
      },
      'uni_subject_id': {
        type: GraphQLString,
        resolve(review: any, args, context) {
          return review.uni_subject_id;
        }
      },
      'uni_tutorial': {
        type: UniversityTutorialResolver,
        async resolve(review: any, args, context) {
          return await UniversityTutorial.findOne({
            where: {
              _id: review.uni_tutorial_id
            }
          });
        }
      },
      'uni_tutorial_id': {
        type: GraphQLString,
        resolve(review: any, args, context) {
          return review.uni_tutorial_id;
        }
      },
      'uni_team': {
        type: UniversityTeamResolver,
        async resolve(review: any, args, context) {
          return await UniversityTeam.findOne({
            where: {
              _id: review.uni_team_id
            }
          });
        }
      },
      'uni_team_id': {
        type: GraphQLString,
        resolve(review, args, context) {
          return review.uni_team_id;
        }
      },
      'uni_organisation': {
        type: UniversityOrganisationResolver,
        async resolve(review: any, args, context) {
          return await UniversityOrganisation.findOne({
            where: {
              _id: review.uni_organisation_id
            }
          });
        }
      },
      'uni_organisation_id': {
        type: GraphQLString,
        resolve(review, args, context) {
          return review.uni_organisation_id;
        }
      },
      /** -------------------- REFERENCE -------------------- */
      
      /** -------------------- PROPERTIES -------------------- */
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
