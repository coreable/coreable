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
  GraphQLString,
  GraphQLInt
} from "graphql";

import { sequelize } from "../../../../lib/sequelize";
import { CoreableError } from "../../../models/CoreableError";
import { SubjectListCommand } from "../../command/list/Subject";

export default {
  type: SubjectListCommand,
  args: {
    _id: {
      type: GraphQLString,
    },
    name: {
      type: GraphQLString,
    },
    state: {
      type: GraphQLInt
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
    let subject: any;
    let limit = args.limit;
    let offset = args.offset;
    delete args.offset;
    delete args.limit;
    if (!context.USER) {
      errors.push({ code: 'ER_UNAUTH', path: 'JWT' , message: 'User unauthenticated'});
    }
    if (!errors.length) {
      if (!args._id && !args.name && !args.state) {
        errors.push({ code: 'ER_ARGS', message: 'A Subject _id, name or state must be passed as arguments', path: 'args' });
      }
    }
    if (!errors.length) {
      subject = await sequelize.models.Subject.findAll({ where: args, limit: limit, offset: offset });
      if (!subject) {
        errors.push({ code: 'ER_SUBJECT_UNKNOWN', message: `A subject with args ${args} could not be found`, path: 'args' });
      }
    }
    return {
      'data': !errors.length ? {
        'subject': subject
      }: null,
      'errors': errors.length > 0 ? errors : null
    }
  }
}