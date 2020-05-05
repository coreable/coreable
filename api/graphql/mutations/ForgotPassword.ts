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
import { User } from "../../models/User";
import { SessionObjectCommand } from "../command/object/Session";

import sendgrid from '@sendgrid/mail';
sendgrid.setApiKey(process.env.SENDGRID_API_KEY || '');

function generateResetToken() {
  return 'xxxxxxxxxxxxxxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export default {
  type: SessionObjectCommand,
  args: {
    email: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  async resolve(root: any, args: any, context: any) {
    let errors: CoreableError[] = [];
    let user: any;
    const resetToken = generateResetToken();

    if (context.USER) {
      errors.push({ code: 'ER_AUTH', path: 'JWT', message: 'User is already authenticated' });
    }
    if (!errors.length) {
      user = await sequelize.models.User.findOne({ where: { email: args.email.toLowerCase() }});
      if (!user) {
        user = await sequelize.models.Manager.findOne({ where: { email: args.email.toLowerCase() }});
      }
      if (!user) {
        errors.push({ code: 'ER_USER_UNKNONW', path: 'email', message: `Can not locate a user with email address ${args.email}` });
      }
    }
    if (!errors.length) {
      const today = new Date();
      const tomorrow = new Date(today.getTime() + (24 * 60 * 60 * 1000));
      
      const resetExpiry =
            tomorrow.getFullYear() + "-" +
            ("00" + (tomorrow.getMonth() + 1)).slice(-2) + "-" +
            ("00" + tomorrow.getDate()).slice(-2) + " " +
            ("00" + tomorrow.getHours()).slice(-2) + ":" +
            ("00" + tomorrow.getMinutes()).slice(-2) + ":" +
            ("00" + tomorrow.getSeconds()).slice(-2);

      try {
        await user.update({
          passwordResetToken: resetExpiry,
          passwordResetExpiry: resetToken
        });
      } catch (err) {
        errors.push({ 'code': err.original.code, 'message': err.original.sqlMessage, 'path': 'SQL' });
      }
      try {
        await sendgrid.send({
          to: args.email,
          from: 'noreply@coreable.appspot.com',
          subject: 'Password recovery',
          text: `Please visit this link to recover your password http://coreable.appspot.com/forgot/${resetToken}`
        });
      } catch (err) {
        console.error(err);
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