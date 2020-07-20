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

import { QueryInterface } from "sequelize/types";
import {
  GraphQLObjectType,
} from "graphql";

import RegisterMutation from './mutations/Register';
import LoginMutation from './mutations/Login';
import ManagerLoginMutation from './mutations/ManagerLogin';
import ChangePasswordMutation from './mutations/ChangePassword';

export const IdentityMutation: GraphQLObjectType<QueryInterface> = new GraphQLObjectType({
  name: 'IdentityMutation',
  description: 'This is the root identity mutation',
  fields: () => {
    return {
      'register': RegisterMutation,
      'userLogin': LoginMutation,
      'changePasssword': ChangePasswordMutation,
      'managerLogin': ManagerLoginMutation
    }
  }
});