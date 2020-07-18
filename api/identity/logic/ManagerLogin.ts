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
import { generatePasswordHash } from './Hash';
import { UniversityManager } from '../../enterprise/university/models/Manager';

export async function ManagerLogin(root: any, args: any, context: any) {
  let errors: CoreableError[] = [];
  let manager: any;
  let token: string | undefined;
  let hash: any;
  if (context.JWT) {
    errors.push({
      code: 'ER_AUTH_FAILURE',
      path: 'JWT',
      message: 'User already authenticated'
    });
  }
  if (!errors.length) {
    try {
      hash = await generatePasswordHash(args.password);
    } catch (err) {
      errors.push({ 
        code: err.code, 
        path: 'hash', 
        message: err.message 
      });
    }
  }
  if (!errors.length) {
    manager = await UniversityManager.findOne({
      where: { password: hash }
    });
    if (!manager) {
      errors.push({
        code: 'ER_USER_UNKNOWN',
        path: 'email',
        message: `No user found with email ${args.email}`
      });
    }
  }
  if (!errors.length) {
    try {
      token = await encodeJWT({
        _id: manager._id,
        email: 'null',
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
      'user': { _id: manager._id, email: 'null', firstName: 'null', lastName: 'null' },
      'token': token
    } : null,
    'errors': errors.length > 0 ? errors : null
  };
}
