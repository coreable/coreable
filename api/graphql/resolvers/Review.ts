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

import {
  GraphQLObjectType,
  GraphQLFloat,
  GraphQLString,
} from 'graphql';

import { Review } from '../../models/Review';
import { UserResolver } from './User';

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
      'receiver_id': {
        type: GraphQLString,
        resolve(review, args, context) {
          return review.receiver_id;
        }
      },
      'receiver': {
        type: UserResolver,
        resolve(review, args, context) {
          return review.receiver;
        }
      },
      'submitter_id': {
        type: GraphQLString,
        resolve(review, args, context) {
          return review.submitter_id;
        }
      },
      'submitter': {
        type: UserResolver,
        resolve(review, args, context) {
          return review.submitter;
        }
      },
      'empathy': {
        type: GraphQLFloat,
        resolve(review, args, context) {
          return review.empathy;
        }
      },
      'managesOwn': {
        type: GraphQLFloat,
        resolve(review, args, context) {
          return review.managesOwn;
        }
      },
      'cooperatively': {
        type: GraphQLFloat,
        resolve(review, args, context) {
          return review.cooperatively;
        }
      },
      'positiveBelief': {
        type: GraphQLFloat,
        resolve(review, args, context) {
          return review.positiveBelief;
        }
      },
      'calm': {
        type: GraphQLFloat,
        resolve(review, args, context) {
          return review.calm;
        }
      },
      'newIdeas': {
        type: GraphQLFloat,
        resolve(review, args, context) {
          return review.newIdeas;
        }
      },
      'workDemands': {
        type: GraphQLFloat,
        resolve(review, args, context) {
          return review.workDemands;
        }
      },
      'proactive': {
        type: GraphQLFloat,
        resolve(review, args, context) {
          return review.proactive;
        }
      },
      'influences': {
        type: GraphQLFloat,
        resolve(review, args, context) {
          return review.proactive;
        }
      },
      'clearInstructions': {
        type: GraphQLFloat,
        resolve(review, args, context) {
          return review.proactive;
        }
      },
      'easilyExplainsComplexIdeas': {
        type: GraphQLFloat,
        resolve(review, args, context) {
          return review.easilyExplainsComplexIdeas;
        }
      },
      'openToShare': {
        type: GraphQLFloat,
        resolve(review, args, context) {
          return review.openToShare;
        }
      },
      'crossTeam': {
        type: GraphQLFloat,
        resolve(review, args, context) {
          return review.crossTeam;
        }
      },
      'resilienceFeedback': {
        type: GraphQLFloat,
        resolve(review, args, context) {
          return review.resilienceFeedback;
        }
      },
      'distractions': {
        type: GraphQLFloat,
        resolve(review, args, context) {
          return review.distractions;
        }
      },
      'eyeContact': {
        type: GraphQLFloat,
        resolve(review, args, context) {
          return review.eyeContact;
        }
      },
      'signifiesInterest': {
        type: GraphQLFloat,
        resolve(review, args, context) {
          return review.signifiesInterest;
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