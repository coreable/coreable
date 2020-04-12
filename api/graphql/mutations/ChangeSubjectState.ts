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

import { SubjectObjectCommand } from "../command/object/Subject"; 
import { GraphQLInt, GraphQLString, GraphQLNonNull } from "graphql";
import { CoreableError } from "../../models/CoreableError";
import { Manager } from "../../models/Manager";

export default {
  type: SubjectObjectCommand,
  args: {
    state: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    subject_id: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  async resolve(root: any, args: any, context: any) {
    let errors: CoreableError[] = [];
    let targetSubject: any;
    if (!context.USER) {
      errors.push({ code: 'ER_AUTH_FAILURE', path: 'JWT', message: 'User unauthenticated' });
    }
    if (!errors.length) {
      if (!(context.USER instanceof Manager)) {
        errors.push({ code: 'ER_MANAGER', message: 'Must be a manager', path: 'JWT' });
      }
    }
    if (!errors.length) {
      if (args.state > 3 || args.state < 1) {
        errors.push({ code: 'ER_STATE', message: 'A subjects state must be either 1, 2 or 3', path: 'JWT' });
      }
    }
    if (!errors.length) {
      for (const subject of context.USER.subjects) {
        if (subject._id === args.subject_id) {
          targetSubject = subject;
        }
      }
      if (!targetSubject) {
        errors.push({ code: 'ER_SUBJECT_UNKNOWN', message: `Manager with _id ${context.USER._id} is not a manager of subject with _id ${args.subject_id}`, path: 'JWT' });
      }
    }
    if (!errors.length) {
      try {
        targetSubject = await targetSubject.update({
          state: args.state
        });
      } catch (err) {
        errors.push({ 'code': err.original.code, 'message': err.original.sqlMessage, 'path': 'SQL' });
      }
    }
    return {
      'data': !errors.length ? {
        'subject': targetSubject
      } : null,
      'errors': errors.length > 0 ? errors : null
    }
  }
}