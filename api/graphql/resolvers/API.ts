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
  GraphQLString,
  GraphQLFloat,
} from 'graphql';

import { API } from '../../models/API';

export const APIResolver: GraphQLObjectType<API> = new GraphQLObjectType({
  name: 'APIResolver',
  description: 'This an API test/query point',
  fields: () => {
    return {
      'time': {
        type: GraphQLFloat,
        resolve(API, args, context) {
          return API.time;
        }
      },
      'env': {
        type: GraphQLString,
        resolve(API, args, context) {
          return API.env;
        }
      }
    }
  }
});
