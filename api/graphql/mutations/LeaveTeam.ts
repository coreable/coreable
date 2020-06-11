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

import { sequelize } from "../../lib/sequelize";
import {
  GraphQLNonNull,
  GraphQLString,
} from "graphql";

import { CoreableError } from "../../models/CoreableError";
import { UserObjectCommand } from "../command/object/User";
import { Manager } from "../../models/Manager";

export default {
  type: UserObjectCommand,
  args: {
    team_id: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  async resolve(root: any, args: any, context: any) {
    let errors: CoreableError[] = [];
    let targetTeam: any;
    if (!context.USER) {
      errors.push({ code: 'ER_AUTH_FAILURE', path: 'JWT', message: 'User unauthenticated' });
    }
    if (!errors.length) {
      if (context.USER instanceof Manager) {
        errors.push({ code: 'ER_MANAGER', message: 'Managers can not leave teams', path: 'JWT' });
      }
    }
    if (!errors.length) {
      targetTeam = await sequelize.models.Team.findOne({ where: { _id: args.team_id }});
      if (!targetTeam) {
        errors.push({ code: 'ER_TEAM_UNKNOWN', message: `Unable to locate team with _id ${args.team_id}`, path: 'team_id' });
      }
    }
    if (!errors.length) {
      let isInGroup = false;
      for (const userTeam of context.USER.teams) {
        if (userTeam._id === targetTeam._id) {
          isInGroup = true;
          break;
        }
      }
      if (!isInGroup) {
        errors.push({ code: 'ER_USER_NOT_IN_TEAM', message: `User with _id ${context.USER._id} is not in team with _id ${targetTeam._id}`, path: '_id' });
      }
    }
    if (!errors.length) {
      try {
        context.USER = await context.USER.removeTeam(targetTeam);
      } catch (err) {
        errors.push({ code: err.original.code, message: err.original.sqlMessage, path: 'SQL' });
      }
    }
    return {
      'data': !errors.length ? {
        'user': context.USER
      } : null,
      'errors': errors.length > 0 ? errors : null
    };
  }
}