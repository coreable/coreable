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
  GraphQLList
} from 'graphql';

import { UniversityTeamResolver } from './Team';
import { UniversitySubjectResolver } from './Subject';

import { UniversityTutorialResolver } from './Tutorial';
import { UniversityManager } from '../../models/Manager';
import { UniversityUserResolver } from './User';
import { UniversityOrganisationResolver } from './Organisation';
import { GetManagerUsers } from '../../logic/GetManagerUsers';
import { GetManagerTutorials } from '../../logic/GetManagerTutorials';
import { GetManagerSubjects } from '../../logic/GetManagerSubjects';
import { GetManagerTeams } from '../../logic/GetManagerTeams';
import { GetManagerOrganisation } from '../../logic/GetManagerOrganisation';

export const UniversityManagerResolver: GraphQLObjectType<UniversityManager> = new GraphQLObjectType({
  name: 'UniversityManagerResolver',
  description: 'This represents a UniversityManager',
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
      'email': {
        type: GraphQLString,
        resolve(manager, args, context) {
          if (!context.MANAGER) {
            return null;
          }
          return manager.email;
        }
      },
      'firstName': {
        type: GraphQLString,
        resolve(manager, args, context) {
          if (!context.MANAGER) {
            return null;
          }
          return manager.firstName;
        }
      },
      'lastName': {
        type: GraphQLString,
        resolve(manager, args, context) {
          if (!context.MANAGER) {
            return null;
          }
          return manager.lastName;
        }
      },
      'organisation': {
        type: new GraphQLList(UniversityOrganisationResolver),
        async resolve(manager: any, args, context) {
          if (!context.MANAGER) {
            return null;
          }
          return await GetManagerOrganisation(manager, args, context);
        }
      },
      'team': {
        type: new GraphQLList(UniversityTeamResolver),
        args: {
          _id: {
            type: GraphQLString
          }
        },
        async resolve(manager: any, args, context) {
          if (!context.MANAGER) {
            return null;
          }
          return await GetManagerTeams(manager, args, context);
        }
      },
      'subject': {
        type: new GraphQLList(UniversitySubjectResolver),
        args: {
          _id: {
            type: GraphQLString
          }
        },
        async resolve(manager: any, args, context) {
          if (!context.MANAGER) {
            return null;
          }
          return await GetManagerSubjects(manager, args, context);
        }
      },
      'tutorial': {
        type: new GraphQLList(UniversityTutorialResolver),
        args: {
          _id: {
            type: GraphQLString
          }
        },
        async resolve(manager: any, args, context) {
          if (!context.MANAGER) {
            return null;
          }
          return await GetManagerTutorials(manager, args, context);
        }
      },
      'user': {
        type: new GraphQLList(UniversityUserResolver), 
        args: {
          _id: {
            type: GraphQLString
          }
        },
        async resolve(user, args, context) {
          if (!context.MANAGER) {
            return null;
          }
          return await GetManagerUsers(user, args, context);
        }
      }
    }
  }
});
