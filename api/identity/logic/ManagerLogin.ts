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

import { CoreableError } from '../../models/CoreableError';
import { encodeJWT } from './JWT';
import { UniversityManager } from '../../enterprise/university/models/Manager';

export async function ManagerLogin(root: any, args: any, context: any) {
  let errors: CoreableError[] = [];
  let manager: any;
  let token: string | undefined;
  if (!errors.length) {
    manager = await UniversityManager.findOne({
      where: { email: args.email.toLowerCase() }
    });
    if (!manager) {
      errors.push({
        code: 'ER_MANAGER_UNKNOWN',
        path: 'email',
        message: `No manager found with email ${args.email}`
      });
    }
  }
  if (!errors.length) {
    const now = Date.now();
    if (manager.lockoutTimer > now) {
      errors.push({
        code: 'ER_ACC_LOCKED',
        path: 'account',
        message: 'Account temporarily locked'
      });
    }
    if (manager.lockoutTimer < now) {
      manager.lockoutTimer = null;
      manager.lockoutAttempts = 0;
      await manager.save();
    }
  }
  if (!errors.length) {
    const isCorrectPassword = await manager.login(args.password);
    if (!isCorrectPassword) {
      errors.push({
        code: 'ER_AUTH_FAILURE',
        path: 'password',
        message: 'Password invalid'
      });
      manager.lockoutAttempts = manager.lockoutAttempts + 1;
      if (manager.lockoutAttempts > 5) {
        const oldDateObj = new Date();
        const newDateObj = new Date();
        // now + 30 minutes
        newDateObj.setTime(oldDateObj.getTime() + (30 * 60 * 1000));
        manager.lockoutTimer = newDateObj;
        errors.push({
          code: 'ER_ACC_LOCKED',
          path: 'account',
          message: 'Account temporarily locked'
        });
      }
      await manager.save();
    }
  }
  if (!errors.length) {
    try {
      token = await encodeJWT({
        _id: manager._id,
        email: manager.email,
        enterprise: 'university'
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
      'manager': manager,
      'token': token
    } : null,
    'errors': errors.length > 0 ? errors : null
  };
}