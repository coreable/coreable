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
import { UniversityReview } from "../models/Review"

//clone.clearInstructions + clone.easilyExplainsComplexIdeas

export const UniversityCommunicationTraitsResolver: GraphQLObjectType<UniversityReview> = new GraphQLObjectType({
  name: 'UniversityCommunicationTraitsResolver',
  description: 'The representation of Communication Traits',
  fields: () => {
    return {
      'clearInstructions': {
        type: GraphQLFloat,
        resolve(review, args, context) {
          return review.clearInstructions;
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
      'distractions': {
        type: GraphQLFloat,
        resolve(review, args, context) {
          return review.distractions;
        }
      },
      'usesRegulators': {
        type: GraphQLFloat,
        resolve(review, args, context) {
          return review.usesRegulators;
        }
      },
      'signifiesInterest': {
        type: GraphQLFloat,
        resolve(review, args, context) {
          return review.signifiesInterest;
        }
      }
    }
  }
});