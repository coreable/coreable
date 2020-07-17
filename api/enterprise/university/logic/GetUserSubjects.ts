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

import { UniversityUser } from "../models/User";
import { UniversityTeam } from "../models/Team";
import { UniversitySubject } from "../models/Subject";
// import { sequelize } from "../../../lib/sequelize";

export async function GetUserSubjects(user: any, args: any, { USER }: any) {
  const res: any = await UniversityUser.findOne({
    where: { _id: USER._id },
    group: ['_id'],
    attributes: {
      exclude: [
        'email',
        'firstName',
        'lastName',
        'password',
        'passwordResetToken',
        'passwordResetExpiry',
        'industry_id',
        'lockoutAttempts',
        'lockoutTimer',
        'updatedAt',
        'createdAt'
      ]
    },
    include: [{
      model: UniversityTeam,
      as: 'teams',
      attributes: {
        exclude: [
          'updatedAt',
          'createdAt'
        ]
      },
      include: [{
        model: UniversitySubject,
        as: 'subject',
        where: args,
        attributes: {
          exclude: [
            'updatedAt',
            'createdAt'
          ],
          include: [
            '_id',
            'name',
            'state'
          ]
        }
      }]
    }]
  });

  // TODO: Remove this loop and make the Sequelize query do it
  // Not sure how at the moment, I know it's doable
  const subjects = [];
  for (const team of res.teams) {
    subjects.push(team.subject);
  }
  return subjects;
}
