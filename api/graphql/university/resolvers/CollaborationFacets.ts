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
import { CollaborationFacets } from "../../models/CollaborationFacet";

export const UniversityCollaborationFacetsResolver: GraphQLObjectType<CollaborationFacets> = new GraphQLObjectType({
  name: 'UniversityCollaborationFacetsResolver',
  description: 'The representation of Collaboration Facets',
  fields: () => {
    return {
      'emotionalIntelligence': {
        type: GraphQLFloat,
        resolve(collaborationFacets, args, context) {
          return collaborationFacets.emotionalIntelligence;
        }
      },
      'initiative': {
        type: GraphQLFloat,
        resolve(collaborationFacets, args, context) {
          return collaborationFacets.initiative;
        }
      },
      'trust': {
        type: GraphQLFloat,
        resolve(collaborationFacets, args, context) {
          return collaborationFacets.trust;
        }
      },
      'flex': {
        type: GraphQLFloat,
        resolve(collaborationFacets, args, context) {
          return collaborationFacets.flex;
        }
      },
      'resilience': {
        type: GraphQLFloat,
        resolve(collaborationFacets, args, context) {
          return collaborationFacets.resilience;
        }
      }
    }
  }
});