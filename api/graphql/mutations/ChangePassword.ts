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

import { GraphQLString, GraphQLNonNull } from "graphql";
import { sequelize } from "../../lib/sequelize";

import { CoreableError } from "../../models/CoreableError";
import { Manager } from "../../models/Manager";
import { Team } from "../../models/Team";
import { Subject } from "../../models/Subject";
import { User } from "../../models/User";

import { MeCommand } from "../command/Me";
import { Industry } from "../../models/Industry";

export default {
  type: MeCommand,
  args: {
      currentPassword: {
      type: new GraphQLNonNull(GraphQLString)
    },
    newPassword: {
      type: new GraphQLNonNull(GraphQLString)
    },
    confirmPassword: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  async resolve(root: any, args: any, context: any) {
    let errors: CoreableError[] = [];
    let user: any;
    let isCorrectPassword: any;
    if (!context.USER) {
      errors.push({ code: 'ER_AUTH_FAILURE', path: 'JWT', message: 'User unauthenticated' });
    }
    if (!errors.length) {
      if (args.confirmPassword !== args.newPassword) {
        errors.push({ code: 'ER_PASSWORD_CONFIRM', message: 'Passwords must match', path: 'confirmPassword' });
      }
    }
    if (!errors.length) {
      if (context.USER instanceof User) {
        user = await sequelize.models.User.findOne(
          { 
            where: { _id: context.USER._id }, 
            include: [
              { model: Team, as: 'teams', attributes: { exclude:  ['inviteCode'] } },
              { model: Industry, as: 'industry' }
            ]
          }
        );
      } else if (context.USER instanceof Manager) {
        user = await sequelize.models.Manager.findOne({ where: { _id: context.USER._id }, include: [{ model: Subject, as: 'subjects' }] });
      }
      if (!user) {
        errors.push({ code: 'ER_USER_UNKNOWN', path: 'JWT', message: `No user found with email ${args.email}` });
      }
    }
    if (!errors.length) {
      isCorrectPassword = await user.login(args.currentPassword);
      if (!isCorrectPassword) {
        errors.push({ code: 'ER_PASSWORD_CURRENT', path: 'password', message: 'Password invalid' });
      }
    }
    if (!errors.length) {
      try {
        user = await user.update({
          password: args.newPassword
        });
      } catch (err) {
        errors.push({ 'code': err.original.code, 'message': err.original.sqlMessage, 'path': 'SQL' });
      }
    }
    return {
      'data': !errors.length ? {
        'user': user instanceof User ? user : null,
        'manager': user instanceof Manager ? user : null
      } : null,
      'errors': errors.length > 0 ? errors : null
    }
  }
}
