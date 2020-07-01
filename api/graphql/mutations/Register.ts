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
  GraphQLNonNull,
  GraphQLString
 } from "graphql";
 
import { encodeJWT } from "../../lib/hash";
import { sequelize } from "../../lib/sequelize";
 
import { CoreableError } from "../../models/CoreableError";
import { SessionObjectCommand } from "../command/object/Session";

// import sendgrid from '@sendgrid/mail';
// sendgrid.setApiKey(process.env.SENDGRID_API_KEY || '');

export default {
  type: SessionObjectCommand,
  args: {
    firstName: {
      type: new GraphQLNonNull(GraphQLString)
    },
    lastName: {
      type: new GraphQLNonNull(GraphQLString)
    },
    email: {
      type: new GraphQLNonNull(GraphQLString)
    },
    password: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  async resolve(root: any, args: any, context: any) {
    let errors: CoreableError[] = [];
    let user;
    let token: string | undefined;
    if (context.USER) {
      errors.push({ code: 'ER_AUTH_FAILURE', path: 'JWT' , message: 'User is already logged in'});
    }
    if (!errors.length) {
      if (args.password.length < 6) {
        errors.push({ code: 'ER_PASSWORD_LENGTH', path: 'password', message: 'Password does not meet minimum length requirements' });
      }
    }
    if (!errors.length) {
      let isRegistered = await sequelize.models.User.findOne({ where: { email: args.email.toLowerCase() }});
      if (isRegistered) {
        errors.push({ code: 'ER_EMAIL_REGISTERED', path: 'email', message: `A user has already registered with email address ${args.email.toLowerCase()}` });
      }
    }
    if (!errors.length) {
      try {
        user = await sequelize.models.User.create({
          firstName: args.firstName,
          lastName: args.lastName,
          email: args.email.toLowerCase(),
          password: args.password
        });
      } catch (err) {
        errors.push({ code: err.original.code, message: err.original.sqlMessage, path: 'SQL' });
      }
    }
    if (!errors.length) {
      token = await encodeJWT({ _id: user._id, email: user.email, manager: false });
      // await sendgrid.send({
      //   to: args.email,
      //   from: 'noreply@coreable.appspot.com',
      //   subject: 'Thank you for registering!',
      //   text: 'Welcome to coreable'
      // });
    }
    return {
      'data': !errors.length ? {
        'user': user, 
        'token': token
      } : null,
      'errors': errors.length > 0 ? errors : null
    }
  }
}