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
  GraphQLString,
  GraphQLList,
} from 'graphql';

import { Manager } from '../../models/Manager';
import { SubjectResolver } from './Subject';

export const ManagerResolver: GraphQLObjectType<Manager> = new GraphQLObjectType({
  name: 'ManagerResolver',
  description: 'This represents a Manger',
  fields: () => {
    return {
      '_id': {
        type: GraphQLString,
        resolve(user, args, context) {
          return user._id;
        }
      },
      'firstName': {
        type: GraphQLString,
        resolve(user, args, context) {
          return user.firstName;
        }
      },
      'lastName': {
        type: GraphQLString,
        resolve(user, args, context) {
          return user.lastName;
        }
      },
      'email': {
        type: GraphQLString,
        resolve(user, args, context) {
          return user.email
        }
      },
      'subjects': {
        type: new GraphQLList(SubjectResolver),
        async resolve(user: any, args, context) {
          if (context.USER._id === user._id || context.USER instanceof Manager) {
            return user.subjects;
          }
        }
      },
    }
  }
});

