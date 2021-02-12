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

import { QueryInterface } from 'sequelize/types';
import { 
  GraphQLObjectType,
} from "graphql";

import UniversityMeQuery from './university/graphql/queries/Me';
import IdentityMeQuery from './identity/graphql/queries/Me';
import ReferenceMeQuery from './reference/graphql/queries/Me';

export const RootQuery: GraphQLObjectType<QueryInterface> = new GraphQLObjectType({
  name: 'RootQuery',
  description: 'This is the root query',
  fields: () => {
    return {
      'me': {
        'type': new GraphQLObjectType({
          'name': 'me',
          fields: () => {
            return {
              'university': UniversityMeQuery,
              'reference': ReferenceMeQuery,
              'identity': IdentityMeQuery,
              // 'results': null
            }
          }
        })
      }
    }
  }
});
