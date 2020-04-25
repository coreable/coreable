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
import {
  GraphQLNonNull,
  GraphQLString,
} from "graphql";

import { CoreableError } from "../../models/CoreableError";
import { UserObjectCommand } from "../command/object/User";
import { Manager } from "../../models/Manager";
import { Team } from "../../models/Team";
import { Subject } from "../../models/Subject";
import { Industry } from "../../models/Industry";

export default {
  type: UserObjectCommand,
  args: {
    industry_id: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  async resolve(root: any, args: any, context: any) {
    let errors: CoreableError[] = [];
    let targetIndustry: any;
    if (!context.USER) {
      errors.push({ code: 'ER_AUTH_FAILURE', path: 'JWT', message: 'User unauthenticated' });
    }
    if (!errors.length) {
      if (context.USER.industry_id === args.industry_id) {
        errors.push({ code: 'ER_USER_IN_INDUSTRY', path: 'JWT', message: `User is already in industry with _id ${args.industry_id}` })
      }
    }
    if (!errors.length) {
      if (context.USER instanceof Manager) {
        errors.push({ code: 'ER_MANAGER', message: 'Managers can not join teams', path: 'JWT' });
      }
    }
    if (!errors.length) {
      targetIndustry = await sequelize.models.Industry.findOne({ where: { '_id': args.industry_id } });
      if (!targetIndustry) {
        errors.push({ code: 'ER_INDUSTRY_UNKNOWN', message: `Unable to locate industry with _id ${args.industry_id}`, path: 'industry_id' });
      }
    }
    if (!errors.length) {
      try {
        await context.USER.setIndustry(targetIndustry);
      } catch (err) {
        errors.push({ 'code': err.original.code, 'message': err.original.sqlMessage, 'path': 'SQL' });
      }
    }
    return {
      'data': !errors.length ? {
        'user': await sequelize.models.User.findOne({
          where: { _id: context.USER._id }, include: [{
            model: Team, as: 'teams', include: [
              { model: Subject, as: 'subject' }]
          }, { model: Industry, as: 'industry' }]
        })
      } : null,
      'errors': errors.length > 0 ? errors : null
    };
  }
}
