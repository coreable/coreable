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
  GraphQLString
} from "graphql";

import { sequelize } from "../../../../lib/sequelize";
import { CoreableError } from "../../../models/CoreableError";
import { ReviewObjectCommand } from "../../command/object/Review";
import { User } from "../../../models/User";

export default {
  type: ReviewObjectCommand,
  args: {
    _id: {
      type: GraphQLString,
    },
    receiver_id: {
      type: GraphQLString,
    },
    submitter_id: {
      type: GraphQLString,
    }
  },
  async resolve(root: any, args: any, context: any) {
    let errors: CoreableError[] = [];
    let review: any;
    if (!context.USER) {
      errors.push({ code: 'ER_UNAUTH', path: 'JWT' , message: 'User unauthenticated'});
    }
    if (!errors.length) {
      if (!args._id && !args.receiver_id && !args.submitter_id) {
        errors.push({ code: 'ER_ARGS', message: 'A Review _id, a receiver_id or a submitter_id must be passed as arguments', path: 'args' });
      }
    }
    if (!errors.length) {
      review = await sequelize.models.Review.findOne({ where: args, include: [{ model: User, as: 'submitter' }, { model: User, as: 'receiver' }] });
      if (!review) {
        errors.push({ code: 'ER_REVIEW_UNKNOWN', message: `A review with args ${args} could not be found`, path: 'args' });
      }
    }
    return {
      'data': !errors.length ? {
        'review': review
      }: null,
      'errors': errors.length > 0 ? errors : null
    }
  }
}