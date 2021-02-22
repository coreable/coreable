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

import { GraphQLObjectType, GraphQLFloat } from "graphql"
import { Review } from "../models/Review"

export const CollaborationTraitsResolver: GraphQLObjectType<Review> = new GraphQLObjectType({
  name: 'CollaborationTraitsResolver',
  description: 'The representation of Collaboration Traits',
  fields: () => {
    return {
      'calm': {
        type: GraphQLFloat,
        resolve(review, args, context) {
          return review.calm;
        }
      },
      'cooperatively': {
        type: GraphQLFloat,
        resolve(review, args, context) {
          return review.cooperatively;
        }
      },
      'empathy': {
        type: GraphQLFloat,
        resolve(review, args, context) {
          return review.empathy;
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
      'workDemands': {
        type: GraphQLFloat,
        resolve(review, args, context) {
          return review.workDemands;
        }
      }
    }
  }
});