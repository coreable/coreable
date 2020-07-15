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

import { GraphQLObjectType, GraphQLString } from "graphql";
import { User } from "../../models/User";
// import { UniversityUserResolver } from "../../../enterprise/university/graphql/resolvers/User";

export const UserResolver: GraphQLObjectType<User> = new GraphQLObjectType({
  name: 'UserResolver',
  description: 'This represents a User',
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
          return user.email;
        }
      },
      'firstName': {
        type: GraphQLString,
        resolve(user, args, context) {
          return user.firstName;
        } 
      },
      'lastName': {
        type: GraphQLString,
        resolve(user, args, context) {
          return user.lastName;
        } 
      },
      // 'universityAccount': {
      //   type: UniversityUserResolver,
      //   async resolve(user: any, args: any, context: any) {
      //     return await user.getUniversityAccount();
      //   }
      // },
      'createdAt': {
        type: GraphQLString,
        resolve(user: any, args: any, context: any) {
          return user.createdAt;
        }
      },
      'updatedAt': {
        type: GraphQLString,
        resolve(user: any, args: any, context: any) {
          return user.updatedAt;
        }
      }
    }
  }
});