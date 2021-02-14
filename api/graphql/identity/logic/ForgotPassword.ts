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
import { User } from "../models/User";

export function generateResetToken() {
  return 'xxxxxxxxxxxxxxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export async function ForgotPassword(root: any, { email }: any, { USER }: any) {
  let errors: CoreableError[] = [];
  let user: any;
  const resetToken = generateResetToken();

  if (USER) {
    errors.push({
      code: 'ER_AUTH',
      path: 'JWT',
      message: 'User is already authenticated'
    });
  }
  if (!errors.length) {
    user = await User.findOne({ where: { email: email.toLowerCase() }});
    if (!user) {
      errors.push({ 
        code: 'ER_USER_UNKNONW',
        path: 'email',
        message: `Can not locate a user with email address ${email}`
      });
    }
  }
  if (!errors.length) {
    const today = new Date();
    const tomorrow = new Date(today.getTime() + (24 * 60 * 60 * 1000));
    
    // converting 24 hours to database readable..
    // TODO: find an easier way
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
      errors.push({ 
        code: err.original.code, 
        message: err.original.sqlMessage, 
        path: 'SQL'
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
