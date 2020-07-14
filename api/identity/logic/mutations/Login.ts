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

import { CoreableError } from '../../../models/CoreableError';
import { User } from '../../models/User';
import { encodeJWT } from './JWT';

export async function Login(root: any, args: any, context: any) {
  let errors: CoreableError[] = [];
  let user: any;
  let token: string | undefined;
  if (context.USER) {
    errors.push({
      code: 'ER_AUTH_FAILURE',
      path: 'JWT',
      message: 'User already authenticated'
    });
  }
  if (!errors.length) {
    user = await User.findOne({
      where: { email: args.email.toLowerCase() }
    });
    if (!user) {
      errors.push({
        code: 'ER_USER_UNKNOWN',
        path: 'email',
        message: `No user found with email ${args.email}`
      });
    }
  }
  if (!errors.length) {
    const now = Date.now();
    if (user.lockoutTimer > now) {
      errors.push({
        code: 'ER_ACC_LOCKED',
        path: 'account',
        message: 'Account temporarily locked'
      });
    }
    if (user.lockoutTimer < now) {
      user.lockoutTimer = null;
      user.lockoutAttempts = 0;
      await user.save();
    }
  }
  if (!errors.length) {
    const isCorrectPassword = await user.login(args.password);
    if (!isCorrectPassword) {
      errors.push({
        code: 'ER_AUTH_FAILURE',
        path: 'password',
        message: 'Password invalid'
      });
      user.lockoutAttempts = user.lockoutAttempts + 1;
      if (user.lockoutAttempts > 5) {
        const oldDateObj = new Date();
        const newDateObj = new Date();
        // now + 30 minutes
        newDateObj.setTime(oldDateObj.getTime() + (30 * 60 * 1000));
        user.lockoutTimer = newDateObj;
        await user.save();
      }
    }
  }
  if (!errors.length) {
    try {
      token = await encodeJWT({
        _id: user._id,
        email: user.email,
        enterprise: 'university'
      });
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
