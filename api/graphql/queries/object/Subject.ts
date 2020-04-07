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
  GraphQLString
} from "graphql";

import { sequelize } from "../../../lib/sequelize";
import { CoreableError } from "../../../models/CoreableError";
import { SubjectObjectCommand } from "../../command/object/Subject";
import { Manager } from "../../../models/Manager";

export default {
  type: SubjectObjectCommand,
  args: {
    _id: {
      type: GraphQLString,
    },
    name: {
      type: GraphQLString,
    }
  },
  async resolve(root: any, args: any, context: any) {
    let errors: CoreableError[] = [];
    let subject: any;
    if (!context.USER) {
      errors.push({ code: 'ER_UNAUTH', path: 'JWT' , message: 'User unauthenticated'});
    }
    if (!errors.length) {
      if (!(context.USER instanceof Manager)) {
        errors.push({ code: 'ER_UNAUTH', message: 'Unauthorised access', path: 'JWT' });
      }
    }
    if (!errors.length) {
      if (!args._id && !args.name) {
        errors.push({ code: 'ER_ARGS', message: 'A Subject _id or name must be passed as arguments', path: 'args' });
      }
    }
    if (!errors.length) {
      subject = await sequelize.models.Subject.findOne({ where: args });
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