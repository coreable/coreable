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

import { 
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean
} from "graphql";
import { Manager } from "../../models/Manager";

export const SessionResolver = new GraphQLObjectType({
  name: 'SessionResolver',
  description: 'Accessible after authentication',
  fields: () => {
    return {
      '_id': {
        type: GraphQLString,
        resolve(user, args, context) {
          return user._id;
        }
      },
      'email': {
        type: GraphQLString,
        resolve(user, args, context) {
          return user.email
        }
      },
      'firstName': {
        type: GraphQLString,
        resolve(user, args, context) {
          return user.firstName;
        }
      },
      'manager': {
        type: GraphQLBoolean,
        resolve(user, args, context) {
          return user instanceof Manager;
        }
      }
    }
  }
});