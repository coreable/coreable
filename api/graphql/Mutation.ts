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
import SubmitReviewMutation from './university/mutations/SubmitReview';

// Identity
import UserLoginMutation from './identity/mutations/UserLogin';
import ManagerLoginMutation from './identity/mutations/ManagerLogin';
import ForgotPasswordMutation from './identity/mutations/ForgotPassword';
import RegisterMutation from './identity/mutations/Register';
import ChangePasswordMutation from './identity/mutations/ChangePassword';

export const RootMutation: GraphQLObjectType<QueryInterface> = new GraphQLObjectType({
  name: 'RootMutation',
  description: 'This is the root university mutation',
  fields: () => {
    return {
      'university': {
        'type': new GraphQLObjectType({
          'name': 'UniversityMutation',
          fields: () => {
            return {
              'joinTeam': JoinTeamMutation,
              'leaveTeam': LeaveTeamMutation,
              'submitReview': SubmitReviewMutation
            }
          }
        })
      },
      'reference': {
        'type': new GraphQLObjectType({
          'name': 'ReferenceMutation',
          fields: () => {
            return {

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
              'managerLogin': ManagerLoginMutation,
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

