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

import { CoreableError } from "../../../models/CoreableError";
import { GetUniversityAccountWithTeamsFromUser_id } from './GetUniversityAccountWithTeams';
import { UniversityTeam } from "../models/Team";

export async function JoinTeam(root: any, args: any, context: any) {
  let errors: CoreableError[] = [];
  let targetTeam: any;
  let UNIVERSITY_USER: any;
  args.inviteCode = args.inviteCode.toLowerCase();
  if (!context.JWT) {
    errors.push({
      code: 'ER_AUTH_FAILURE',
      path: 'JWT',
      message: 'User unauthenticated'
    });
  }
  if (!errors.length) {
    UNIVERSITY_USER = await GetUniversityAccountWithTeamsFromUser_id(context);
    if (!UNIVERSITY_USER) {
      errors.push({
        code: 'ER_ACCOUNT_UNKNOWN',
        message: `University account with user_id ${context.JWT._id} not found!`,
        path: 'user'
      });
    }
  }
  if (!errors.length) {
    targetTeam = await UniversityTeam.findOne({
      where: { 'inviteCode': args.inviteCode }
    });
    if (!targetTeam) {
      errors.push({
        code: 'ER_TEAM_UNKNOWN',
        message: `Unable to locate team with inviteCode ${args.inviteCode}`,
        path: 'inviteCode'
      });
    }
  }
  if (!errors.length) {
    for (const userTeam of UNIVERSITY_USER.teams) {
      if (userTeam._id === targetTeam._id) {
        errors.push({
          code: 'ER_USER_IN_TEAM',
          message: `User with _id ${UNIVERSITY_USER._id} is already in team with _id ${targetTeam._id}`,
          path: '_id'
        });
        break;
      }
    }
  }
  if (!errors.length) {
    try {
      await UNIVERSITY_USER.addTeam(targetTeam);
    } catch (err) {
      errors.push({
        code: err.original.code,
        message: err.original.sqlMessage,
        path: 'SQL'
      });
    }
  }
  if (!errors.length) {
    UNIVERSITY_USER = await GetUniversityAccountWithTeamsFromUser_id(context);
  }
  return {
    'data': !errors.length ? {
      'user': UNIVERSITY_USER
    } : null,
    'errors': errors.length > 0 ? errors : null
  };
}