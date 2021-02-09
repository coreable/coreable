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

import { User } from "../models/User";
import { CoreableError } from "../../models/CoreableError";

export async function IdentityMe(root: any, args: any, context: any) {
  let errors: CoreableError[] = [];
  let user: any;
  if (!context.USER) {
    errors.push({ code: 'ER_UNAUTH', path: 'JWT', message: 'User unauthenticated' });
  }
  if (!errors.length) {
    user = await User.findOne({
      where: { _id: context.USER._id }
    });
    if (!user) {
      errors.push({
        code: 'ER_USER_UNKNOWN',
        path: `_id`,
        message: `No user found with _id ${context.USER._id}`
      });
    }
  }
  return {
    'data': !errors.length ? {
      'user': user
    } : null,
    'errors': errors.length > 0 ? errors : null
  }
}
