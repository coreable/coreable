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

import { CoreableError } from "../../models/CoreableError";
import { User } from "../models/User";

export async function ChangePassword(_: any, { email, currentPassword, confirmPassword, newPassword }: any, context: any) {
  let errors: CoreableError[] = [];
  let user: any;

  if (!context.USER) {
    errors.push({
      code: 'ER_AUTH_FAILURE',
      path: 'JWT',
      message: 'User unauthenticated'
    });
  }
  if (!errors.length) {
    if (confirmPassword !== newPassword) {
      errors.push({
        code: 'ER_PASSWORD_CONFIRM',
        message: 'Passwords must match',
        path: 'confirmPassword'
      });
    }
  }
  if (!errors.length) {
    user = await User.findOne({
      where: { _id: context.USER._id }
    });
    if (!user) {
      errors.push({ 
        code: 'ER_USER_UNKNOWN',
        path: 'JWT',
        message: `No user found with email ${email}`
      });
    }
  }
  if (!errors.length) {
    const isCorrectPassword = await user.login(currentPassword);
    if (!isCorrectPassword) {
      errors.push({ 
        code: 'ER_PASSWORD_CURRENT',
        path: 'password',
        message: 'Password invalid'
      });
    }
  }
  if (!errors.length) {
    try {
      user = await user.update({
        password: newPassword
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