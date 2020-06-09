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

import { sequelize } from "../../lib/sequelize";

import { CoreableError } from "../../models/CoreableError";
import { Subject } from "../../models/Subject";
import { Team } from "../../models/Team";
import { User } from "../../models/User";
import { MeCommand } from "../command/Me";
import { Manager } from "../../models/Manager";
import { Industry } from "../../models/Industry";

export default {
  type: MeCommand,
  async resolve(root: any, args: any, context: any) {
    let errors: CoreableError[] = [];
    let user;
    let manager;
    if (!context.USER) {
      errors.push({ code: 'ER_UNAUTH', path: 'JWT', message: 'User unauthenticated' });
    }
    if (!errors.length) {
      if (context.USER instanceof User) {
        user = await sequelize.models.User.findOne(
          {
            where: { _id: context.USER._id },
            include: [
              {
                model: Team,
                as: 'teams',
                include: [
                  { model: Subject, as: 'subject' },
                  { model: User, as: 'users' }
                ],
                attributes: { exclude: ['inviteCode'] }
              },
              { model: Industry, as: 'industry' }
            ]
          }
        );
      } else if (context.USER instanceof Manager) {
        manager = await sequelize.models.Manager.findOne(
          {
            where: { _id: context.USER._id },
            include: [{
              model: Subject, as: 'subjects',
              include: [{
                model: Team, as: 'teams',
                include: [{
                  model: User, as: 'users',
                  include: [{ model: Industry, as: 'industry' }]
                }]
              }]
            }]
          }
        );
      }
      if (!user && !manager) {
        errors.push({ code: 'ER_USER_UNKNOWN', path: `_id`, message: `No user found with _id ${context.USER._id}` });
      }
    }
    return {
      'data': !errors.length ? {
        'user': user,
        'manager': manager
      } : null,
      'errors': errors.length > 0 ? errors : null
    }
  }
}
