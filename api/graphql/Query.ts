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

import MeQuery from './queries/Me';
// import UserObjectQuery from './queries/object/User';
// import UserListQuery from './queries/list/User';
// import ReviewObjectQuery from './queries/object/Review';
// import ReviewListQuery from './queries/list/Review';
// import TeamObjectQuery from './queries/object/Team';
// import TeamListQuery from './queries/list/Team';
// import SubjectObjectQuery from './queries/object/Subject';
// import SubjectListQuery from './queries/list/Subject';
import APIObjectQuery from './queries/API';
import IndustryListQuery from './queries/list/Industry';

export const Query: GraphQLObjectType<QueryInterface> = new GraphQLObjectType({
  name: 'Query',
  description: 'This is the root query',
  fields: () => {
    return {
      'me': MeQuery,
      // 'user': UserObjectQuery,
      // 'users': UserListQuery,
      // 'reviews': ReviewListQuery,
      // 'review': ReviewObjectQuery,
      // 'team': TeamObjectQuery,
      // 'teams': TeamListQuery,
      // 'subject': SubjectObjectQuery,
      // 'subjects': SubjectListQuery,
      'API': APIObjectQuery,
      'industrys': IndustryListQuery
    }
  }
});
