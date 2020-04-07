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
  GraphQLString, GraphQLInt
} from "graphql";

import { CoreableError } from "../../../models/CoreableError";
import { TeamListCommand } from "../../command/list/Team";
import { Subject } from "../../../models/Subject";
import { Manager } from "../../../models/Manager";

export default {
  type: TeamListCommand,
  args: {
    _id: {
      type: GraphQLString,
    },
    name: {
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
    let team: any;
    let limit = args.limit;
    let offset = args.offset;
    delete args.offset;
    delete args.limit;
    if (!context.USER) {
      errors.push({ code: 'ER_UNAUTH', message: 'User unauthenticated', path: 'JWT' });
    }
    if (!errors.length) {
      if (!(context.USER instanceof Manager)) {
        errors.push({ code: 'ER_UNAUTH', message: 'Unauthorised access', path: 'JWT' });
      }
    }
    if (!errors.length) {
      if (!args._id && !args.name) {
        errors.push({ code: 'ER_ARGS', message: 'a _id or a name must be passed as arguments', path: 'args' });
      }
    }
    if (!errors.length) {
      team = await sequelize.models.Team.findAll({ where: args, include: [{ model: Subject, as: 'subjects' }], limit: limit, offset: offset });
      if (!team) {
        errors.push({ code: 'ER_TEAM_UNKNOWN', message: `Unable to find a team with args ${args}`, path: 'args' });
      }
    }
    return {
      'data': !errors.length ? {
        'team': team
      } : null,
      'errors': errors.length > 0 ? errors : null
    }
  }
};