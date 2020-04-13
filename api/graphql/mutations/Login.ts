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
  GraphQLNonNull,
  GraphQLString
} from "graphql";

import { CoreableError } from "../../models/CoreableError";

import { encodeJWT } from "../../lib/hash";
import { sequelize } from "../../lib/sequelize";
import { SessionObjectCommand } from "../command/object/Session";
import { Manager } from "../../models/Manager";
import { Team } from "../../models/Team";
import { Subject } from "../../models/Subject";

export default {
  type: SessionObjectCommand,
  args: {
    email: {
      type: new GraphQLNonNull(GraphQLString)
    },
    password: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  async resolve(root: any, args: any, context: any) {
    let errors: CoreableError[] = [];
    let user: any;
    let isCorrectPassword: boolean = false;
    let token: string | undefined;
    if (context.USER) {
      errors.push({ code: 'ER_AUTH_FAILURE', path: 'JWT' , message: 'User already authenticated'});
    }
    if (!errors.length) {
      user = await sequelize.models.User.findOne({ where: { email: args.email.toLowerCase() }, include: [{ model: Team, as: 'teams', attributes: { exclude:  ['inviteCode'] } }] });
      if (!user) {
        user = await sequelize.models.Manager.findOne({ where: { email: args.email.toLowerCase() }, include: [{ model: Subject, as: 'subjects' }] });
      }
      if (!user) {
        errors.push({ code: 'ER_USER_UNKNOWN', path: 'email', message: `No user found with email ${args.email}` });
      }
    }
    if (!errors.length) {
      isCorrectPassword = await user.login(args.password);
      if (!isCorrectPassword) {
        errors.push({ code: 'ER_AUTH_FAILURE', path: 'password', message: 'Password invalid' });
      }
    }
    if (!errors.length) {
      try {
        token = await encodeJWT({ _id: user._id, email: user.email, manager: user instanceof Manager });
      } catch (err) {
        errors.push({ code: err.code, path: 'JWT', message: err.message });
      }
    }
    return {
      'data': !errors.length ? { 
        'user': user,
        'token': token
      } : null,
      'errors': errors.length > 0 ? errors : null
    };
  }
}
