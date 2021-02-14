/*
  ===========================================================================
    Copyright (C) 2021 Coreable
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
  GraphQLList,
  GraphQLObjectType,
  GraphQLString
} from 'graphql';

import { Manager } from '../../identity/models/Manager';
import { UserResolver } from '../../identity/resolvers/User';
import { GetManagerOrganisation } from '../../university/logic/GetManagerOrganisation';
import { UniversityOrganisationResolver } from '../../university/resolvers/Organisation';
import { GetManagerUser } from '../logic/GetManagerUser';

export const ManagerResolver: GraphQLObjectType<Manager> = new GraphQLObjectType({
  name: 'ManagerResolver',
  description: 'This represents a Manager',
  fields: () => {
    return {
      '_id': {
        type: GraphQLString,
        resolve(manager, args, context) {
          if (!context.MANAGER) {
            return null;
          }
          return manager._id;
        }
      },
      'user_id': {
        type: GraphQLString,
        resolve(manager, args, context) {
          if (!context.MANAGER) {
            return null;
          }
          return manager.user_id;
        }
      },
      'identity': {
        type: UserResolver,
        async resolve(manager, args, context) {
          if (!context.MANAGER) {
            return null;
          }
          return await GetManagerUser(manager, args, context);
        }
      },
      'universities': {
        type: new GraphQLList(UniversityOrganisationResolver),
        async resolve(manager, args, context) {
          if (!context.MANAGER) {
            return null;
          }
          return await GetManagerOrganisation(manager, args, context);
        }
      },
      'createdAt': {
        type: GraphQLString,
        resolve(user: any, args: any, context: any) {
          return user.createdAt;
        }
      },
      'updatedAt': {
        type: GraphQLString,
        resolve(user: any, args: any, context: any) {
          return user.updatedAt;
        }
      }
    }
  }
});
