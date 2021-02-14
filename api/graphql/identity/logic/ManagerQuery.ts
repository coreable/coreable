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

import { CoreableError } from "../../global/models/CoreableError";
import { Manager } from '../../identity/models/Manager';

export async function ManagerQuery(root: any, args: any, context: any) {
  context.MANAGER = null;
  let errors: CoreableError[] = [];
  if (!context.JWT) {
    errors.push({ 
      code: 'ER_UNAUTH',
      path: 'JWT',
      message: 'User unauthenticated'
    });
  }
  if (!errors.length) {
    context.MANAGER = await Manager.findOne({
      where: { user_id: context.JWT._id }
    });
    if (!context.MANAGER) {
      errors.push({
        code: 'ER_MANAGER_UNKNOWN',
        path: `_id`,
        message: `No manager found with _id ${context.JWT._id}`
      });
    }
  }
  return {
    'data': !errors.length ? {
      'manager': context.MANAGER
    } : null,
    'errors': errors.length > 0 ? errors : null
  }
}