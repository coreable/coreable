/*
  ===========================================================================
    Copyright (C) 2021 Coreable
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
import { ReferenceUser } from "../models/User";

export async function MeQuery(root: any, args: any, context: any) {
  context.REFERENCE = null;
  let errors: CoreableError[] = [];
  if (!context.JWT) {
    errors.push({ 
      code: 'ER_UNAUTH',
      path: 'JWT',
      message: 'User unauthenticated'
    });
  }
  if (!errors.length) {
    context.REFERENCE = await ReferenceUser.findOne({
      where: { user_id: context.JWT._id }
    });
    if (!context.REFERENCE) {
      errors.push({
        code: 'ER_USER_UNKNOWN',
        path: `_id`,
        message: `No user found with user_id ${context.JWT._id}`
      });
    }
  }
  return {
    'data': !errors.length ? {
      'user': context.REFERENCE
    } : null,
    'errors': errors.length > 0 ? errors : null
  }
}