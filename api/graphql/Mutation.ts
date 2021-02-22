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

import { QueryInterface } from "sequelize/types";
import {
  GraphQLObjectType,
} from "graphql";

// University
import JoinTeamMutation from './university/mutations/JoinTeam';
import LeaveTeamMutation from './university/mutations/LeaveTeam';

// Identity
import UserLoginMutation from './identity/mutations/Login';
import ForgotPasswordMutation from './identity/mutations/ForgotPassword';
import RegisterMutation from './identity/mutations/Register';
import ChangePasswordMutation from './identity/mutations/ChangePassword';

// Reference


// Reviews / Results
import SubmitReviewMutation from './results/mutations/SubmitReview';

export const RootMutation: GraphQLObjectType<QueryInterface> = new GraphQLObjectType({
  name: 'RootMutation',
  description: 'This is the root university mutation',
  fields: () => {
    return {
      'results': {
        'type': new GraphQLObjectType({
          'name': 'ResultsMutation',
          fields: () => {
            return {
              'submitReview': SubmitReviewMutation
            }
          }
        })
      },
      'university': {
        'type': new GraphQLObjectType({
          'name': 'UniversityMutation',
          fields: () => {
            return {
              'joinTeam': JoinTeamMutation,
              'leaveTeam': LeaveTeamMutation
            }
          }
        })
      },
      'reference': {
        'type': new GraphQLObjectType({
          'name': 'ReferenceMutation',
          fields: () => {
            return {
              // 'invite': InivteMutation
            }
          }
        })
      },
      'identity': {
        'type': new GraphQLObjectType({
          'name': 'IdentityMutation',
          fields: () => {
            return {
              'userLogin': UserLoginMutation,
              'forgotPassword': ForgotPasswordMutation,
              'register': RegisterMutation,
              'changedPassword': ChangePasswordMutation
            }
          }
        })
      }
    }
  }
});

