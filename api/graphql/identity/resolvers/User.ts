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
import { ReferenceMe } from "../../reference/logic/MeQuery";
import { ReferenceUserResolver } from "../../reference/resolvers/User";
import { UniversityUserResolver } from "../../university/resolvers/User";
import { GetUserIndustry } from "../logic/GetUserIndustry";
import { GetUserManager } from "../logic/GetUserManager";
import { GetUserUniversity } from "../logic/GetUserUniversity";
import { User } from "../models/User";
import { IndustryResolver } from "./Industry";
import { ManagerResolver } from "./Manager";

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
      'industry': {
        type: IndustryResolver,
        async resolve(user, args, context) {
          return await GetUserIndustry(user, args, context);
        }
      },
      'manager': {
        type: ManagerResolver,
        async resolve(user, args, context) {
          if (context.USER._id !== user._id) {
            return null;
          }
          return await GetUserManager(user, args, context);
        }
      },
      'university': {
        type: UniversityUserResolver,
        async resolve(user, args, context) {
          if (context.USER._id !== user._id) {
            return null;
          }
          return await GetUserUniversity(user, args, context);
        }
      },
      'reference': {
        type: ReferenceUserResolver,
        async resolve(user, args, context) {
          if (context.USER._id !== user._id) {
            return null;
          }
          return await ReferenceMe(user, args, context)
        }
      },
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