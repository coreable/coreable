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

import { QueryInterface } from "sequelize/types";
import {
  GraphQLObjectType,
} from "graphql";

import RegisterMutation from './mutations/Register';
import LoginMutation from './mutations/Login';
import JoinTeamMutation from './mutations/JoinTeam';
import LeaveTeamMutation from './mutations/LeaveTeam';
import SubmitReviewMutation from './mutations/SubmitReview';

export const Mutation: GraphQLObjectType<QueryInterface> = new GraphQLObjectType({
  name: 'Mutation',
  description: 'This is the root mutation',
  fields: () => {
    return {
      'register': RegisterMutation,
      'login': LoginMutation,
      'joinTeam': JoinTeamMutation,
      'leaveTeam': LeaveTeamMutation,
      'submitReview': SubmitReviewMutation
    }
  }
});

