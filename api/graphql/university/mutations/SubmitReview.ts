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
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt
} from "graphql";

import { UniversityReviewObjectCommand } from "../command/object/Review";
import { SubmitReview } from "../logic/SubmitReview";

export default {
  type: UniversityReviewObjectCommand,
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
    organisation_id: {
      type: new GraphQLNonNull(GraphQLString)
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
    return await SubmitReview(root, args, context);
  }
}
