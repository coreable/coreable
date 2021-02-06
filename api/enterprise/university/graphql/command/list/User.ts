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
  GraphQLList
} from "graphql";

import { UniversityCoreableErrorResolver } from "../../resolvers/CoreableError";
import { UniversityUserListMediator } from "../../mediators/list/User";

export const UserListCommand: GraphQLObjectType = new GraphQLObjectType({
  name: 'UniversityUserListCommand',
  description: 'UniversityUserListCommand',
  fields: () => {
    return {
      'data': {
        type: UniversityUserListMediator,
        resolve(value) {
          return value.data;
        }
      },
      'errors': {
        type: new GraphQLList(UniversityCoreableErrorResolver),
        resolve(value) {
          return value.errors;
        }
      }
    }
  }
});