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
  GraphQLList,
  GraphQLFloat
} from 'graphql';

import { UniversityUser } from '../models/User';
import { UniversityTeamResolver } from './Team';
import { ReviewResolver } from '../../results/resolvers/Review';
import { UniversitySubjectResolver } from './Subject';
import { UserResolver } from '../../identity/resolvers/User';
import { Review } from '../../results/models/Review';
import { Op } from 'sequelize';
import { GetPendingUsersNeedingReview } from '../logic/GetPendingUsersNeedingReview';
import { UniversityTutorialResolver } from './Tutorial';
import { UniversityUserAverage } from '../models/UserAverage';
import { GetUserAverages } from '../logic/GetUserAverages';
import { GetUserSubjects } from '../logic/GetUserSubjects';
import { GetUserTutorials } from '../logic/GetUserTutorials';
import { GetUserTeams } from '../logic/GetUserTeams';
import { UniversityOrganisationResolver } from './Organisation';
import { GetUserOrganisations } from '../logic/GetUserOrganisation';
import { UniversityCollaborationTraitsResolver } from '../../results/resolvers/CollaborationTraits';
import { UniversityCollaborationFacetsResolver } from '../../results/resolvers/CollaborationFacets';
import { UniversityCommunicationFacetsResolver } from '../../results/resolvers/CommunicationFacets';
import { UniversityCommunicationTraitsResolver } from '../../results/resolvers/CommunicationTraits';
import { GetUserIdentityAccount } from '../logic/GetUserIdentityAccount';
import { CalculateCollaborationFacets } from '../../results/logic/CalculateCollaborationFacets';
import { TrimReviewToCollaborationTraits } from '../../results/logic/TrimReviewToCollaborationTraits';
import { CalculateCommunicationFacets } from '../../results/logic/CalculateCommunicationFacets';
import { TrimReviewToCommunicationTraits } from '../../results/logic/TrimReviewToCommunicationTraits';
import { GetUserReflectionAverages } from '../logic/GetUserReflectionAverages';
import { UniversityUserReflectionAverage } from '../models/UserReflectionAverage';
import { UserReportResolver } from '../../results/resolvers/Report';

export const UniversityUserResolver: GraphQLObjectType<UniversityUser> = new GraphQLObjectType({
  name: 'UniversityUserResolver',
  description: 'This represents a UniversityUser',
  fields: () => {
    return {
      '_id': {
        type: GraphQLString,
        resolve(user, args, context) {
          return user._id;
        }
      },
      'identity': {
        type: UserResolver,
        async resolve(user: any, args, context) {
          return await GetUserIdentityAccount(user, args, context);
        }
      },
      'team': {
        type: new GraphQLList(UniversityTeamResolver),
        args: {
          _id: {
            type: GraphQLString
          }
        },
        async resolve(user: any, args, context) {
          if (context.USER?._id !== user._id && !context.MANAGER) {
            return null;
          }
          return await GetUserTeams(user, args, context);
        }
      },
      'subject': {
        type: new GraphQLList(UniversitySubjectResolver),
        args: {
          _id: {
            type: GraphQLString
          }
        },
        async resolve(user: any, args, context) {
          if (context.USER?._id !== user._id && !context.MANAGER) {
            return null;
          }

          return await GetUserSubjects(user, args, context);
        }
      },
      'tutorial': {
        type: new GraphQLList(UniversityTutorialResolver),
        args: {
          _id: {
            type: GraphQLString
          }
        },
        async resolve(user: any, args, context) {
          if (context.USER?._id !== user._id && !context.MANAGER) {
            return null;
          }

          return await GetUserTutorials(user, args, context);
        }
      },
      'organisation': {
        type: new GraphQLList(UniversityOrganisationResolver),
        args: {
          _id: {
            type: GraphQLString
          }
        },
        async resolve(user: any, args, context) {
          if (context.USER?._id !== user._id && !context.MANAGER) {
            return null;
          }

          return await GetUserOrganisations(user, args, context);
        }
      },
      'report': {
        type: UserReportResolver,
        resolve(user, args, context) {
          return user;
        }
      },
      'pending': {
        type: new GraphQLList(UniversityTeamResolver),
        async resolve(user: any, args, context) {
          if (context.USER?._id !== user._id && !context.MANAGER) {
            return null;
          }

          return await GetPendingUsersNeedingReview(user, args, context);
        }
      }
    }
  }
});
