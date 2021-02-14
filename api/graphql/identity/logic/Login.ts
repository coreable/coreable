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

import { CoreableError } from '../../global/models/CoreableError';
import { User } from '../models/User';
import { encodeJWT } from './JWT';

export async function Login(root: any, args: any, context: any) {
  let errors: CoreableError[] = [];
  let token: string | undefined;
  context.USER = null;
  if (!errors.length) {
    context.USER = await User.findOne({
      where: { email: args.email.toLowerCase() }
    });
    if (!context.USER) {
      errors.push({
        code: 'ER_USER_UNKNOWN',
        path: 'email',
        message: `No user found with email ${args.email}`
      });
    }
  }
  if (!errors.length) {
    const now = Date.now();
    if (context.USER.lockoutTimer > now) {
      errors.push({
        code: 'ER_ACC_LOCKED',
        path: 'account',
        message: 'Account temporarily locked'
      });
    }
    if (context.USER.lockoutTimer < now) {
      context.USER.lockoutTimer = null;
      context.USER.lockoutAttempts = 0;
      await context.USER.save();
    }
  }
  if (!errors.length) {
    const isCorrectPassword = await context.USER.login(args.password);
    if (!isCorrectPassword) {
      errors.push({
        code: 'ER_AUTH_FAILURE',
        path: 'password',
        message: 'Password invalid'
      });
      context.USER.lockoutAttempts = context.USER.lockoutAttempts + 1;
      if (context.USER.lockoutAttempts > 5) {
        const oldDateObj = new Date();
        const newDateObj = new Date();
        // now + 30 minutes
        newDateObj.setTime(oldDateObj.getTime() + (30 * 60 * 1000));
        context.USER.lockoutTimer = newDateObj;
      }
      await context.USER.save();
    }
  }
  if (!errors.length) {
    try {
      token = await encodeJWT({
        _id: context.USER._id,
        email: context.USER.email
      });
    } catch (err) {
      errors.push({ 
        code: err.code, 
        path: 'JWT',
        message: err.message
      });
    }
  }
  return {
    'data': !errors.length ? {
      'user': context.USER,
      'token': token
    } : null,
    'errors': errors.length > 0 ? errors : null
  };
}
