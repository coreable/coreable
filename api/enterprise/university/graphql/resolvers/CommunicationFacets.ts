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

export const UniversityCommunicationFacetsResolver: GraphQLObjectType<UniversityReview> = new GraphQLObjectType({
  name: 'UniversityCommunicationFacetsResolver',
  description: 'The representation of Communication Facets',
  fields: () => {
    return {
      'clarity': {
        type: GraphQLFloat,
        resolve(review, args, context) {
          return (review.clearInstructions + review.easilyExplainsComplexIdeas) / 2;
        }
      },
      'culture': {
        type: GraphQLFloat,
        resolve(review, args, context) {
          return (review.openToShare + review.crossTeam) / 2;
        }
      },
      'nonVerbal': {
        type: GraphQLFloat,
        resolve(review, args, context) {
          return (review.distractions + review.usesRegulators) / 2;
        }
      },
      'attentive': {
        type: GraphQLFloat,
        resolve(review, args, context) {
          return review.signifiesInterest / 1;
        }
      },
    }
  }
});