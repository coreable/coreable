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
  GraphQLObjectType
} from "graphql";

import { UserResolver } from "../resolvers/User";
import { ManagerResolver } from '../resolvers/Manager';

export const MeMediator: GraphQLObjectType = new GraphQLObjectType({
  name: 'MeMediator',
  description: 'MeMediator',
  fields: () => {
    return {
      'manager': {
        type: ManagerResolver,
        resolve(data) {
          return data.manager;
        }
      },
      'user': {
        type: UserResolver,
        resolve(data) {
          return data.user;
        }
      }
    }
  }
});