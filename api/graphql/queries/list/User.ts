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

import { sequelize } from "../../../lib/sequelize";
import {
  GraphQLInt,
  GraphQLString,
} from "graphql";

import { CoreableError } from "../../../models/CoreableError";
import { UserListCommand } from "../../command/list/User";
import { Team } from "../../../models/Team";
import { Manager } from "../../../models/Manager";
import { Subject } from "../../../models/Subject";
import { User } from "../../../models/User";

export default {
  type: UserListCommand, 
  args: {
    _id: {
      type: GraphQLString
    },
    email: {
      type: GraphQLString
    },
    firstName: {
      type: GraphQLString
    },
    lastName: {
      type: GraphQLString
    },
    limit: {
      type: GraphQLInt
    },
    offset: {
      type: GraphQLInt
    }
  },
  async resolve(root: any, args: any, context: any) {
    let errors: CoreableError[] = [];
    let user: any;
    let limit = args.limit;
    let offset = args.offset;
    delete args.offset;
    delete args.limit;
    if (!context.USER) {
      errors.push({ code: 'ER_UNAUTH', path: 'JWT' , message: 'User unauthenticated'});
    }
    if (!errors.length) {
      if (!(context.USER instanceof Manager)) {
        errors.push({ code: 'ER_UNAUTH', message: 'Unauthorised access', path: 'JWT' });
      }
    }
    if (!errors.length) {
      user = await sequelize.models.User.findAll(
        {
          where: args,
          include: [
            { model: Team, as: 'teams',
            include: [
              { model: Subject, as: 'subject' },
              { model: User, as: 'users' }
            ], 
            exclude: ['inviteCode'] }
          ],
          limit: limit,
          offset: offset
        }
      );
      if (!user.length) {
        errors.push({ code: 'ER_USER_UNKNOWN', path: `${args}`, message: `No user found with args ${args}` });
      }
    }
    return {
      'data': !errors.length ? {
        'user': user
      } : null,
      'errors': errors.length > 0 ? errors : null
    }
  }
}