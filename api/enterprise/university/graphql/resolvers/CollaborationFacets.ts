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
import { UniversityReview } from "../../models/Review"

export const UniversityCollaborationFacetsResolver: GraphQLObjectType<UniversityReview> = new GraphQLObjectType({
  name: 'UniversityCollaborationFacetsResolver',
  description: 'The representation of Collaboration Facets',
  fields: () => {
    return {
      'emotionalIntelligence': {
        type: GraphQLFloat,
        resolve(review, args, context) {
          return (review.empathy + review.managesOwn) / 2;
        }
      },
      'initiative': {
        type: GraphQLFloat,
        resolve(review, args, context) {
          return (review.proactive + review.influences) / 2;
        }
      },
      'trust': {
        type: GraphQLFloat,
        resolve(review, args, context) {
          return (review.cooperatively + review.positiveBelief) / 2;
        }
      },
      'flex': {
        type: GraphQLFloat,
        resolve(review, args, context) {
          return (review.newIdeas + review.workDemands) / 2;
        }
      },
      'resilience': {
        type: GraphQLFloat,
        resolve(review, args, context) {
          return (review.resilienceFeedback + review.calm) / 2;
        }
      }
    }
  }
});