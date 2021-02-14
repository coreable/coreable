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
import { encodeJWT } from "./JWT";
import { UniversityUser } from "../../university/models/User";

export async function Register(root: any, args: any, context: any) {
  let errors: CoreableError[] = [];
  let token: string | undefined;
  context.USER = null;
  if (!errors.length) {
    if (args.password.length < 6) {
      errors.push({
        code: 'ER_PASSWORD_LENGTH',
        path: 'password',
        message: 'Password does not meet minimum length requirements'
      });
    }
  }
  if (!errors.length) {
    let isRegistered = await User.findOne({
      where: { email: args.email.toLowerCase() }
    });
    if (isRegistered) {
      errors.push({
        code: 'ER_EMAIL_REGISTERED',
        path: 'email',
        message: `A user has already registered with email address ${args.email.toLowerCase()}`
      });
    }
  }
  if (!errors.length) {
    try {
      context.USER = await User.create({
        firstName: args.firstName,
        lastName: args.lastName,
        email: args.email.toLowerCase(),
        password: args.password
      });
    } catch (err) {
      errors.push({ 
        code: err.original.code,
        message: err.original.sqlMessage,
        path: 'SQL'
      });
    }
  }
  if (!errors.length) {
    token = await encodeJWT({
      _id: context.USER._id,
      email: context.USER.email
    });
  }
  if (!errors.length) {
    try {
      await UniversityUser.create({
        user_id: context.USER._id
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
      'user': context.USER, 
      'token': token
    } : null,
    'errors': errors.length > 0 ? errors : null
  }
}