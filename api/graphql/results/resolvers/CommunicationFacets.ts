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
import { CommunicationFacet } from "../models/CommunicationFacet";

export const CommunicationFacetsResolver: GraphQLObjectType<CommunicationFacet> = new GraphQLObjectType({
  name: 'CommunicationFacetsResolver',
  description: 'The representation of Communication Facets',
  fields: () => {
    return {
      'clarity': {
        type: GraphQLFloat,
        resolve(communicationFacet, args, context) {
          return communicationFacet.clarity;
        }
      },
      'culture': {
        type: GraphQLFloat,
        resolve(communicationFacet, args, context) {
          return communicationFacet.culture;
        }
      },
      'nonVerbal': {
        type: GraphQLFloat,
        resolve(communicationFacet, args, context) {
          return communicationFacet.nonVerbal;
        }
      },
      'attentive': {
        type: GraphQLFloat,
        resolve(communicationFacet, args, context) {
          return communicationFacet.attentive;
        }
      }
    }
  }
});