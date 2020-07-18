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

import { UniversitySubject } from "../models/Subject";
import { sequelize } from "../../../lib/sequelize";
import { UniversityTutorial } from "../models/Tutorial";
import { UniversityTeam } from "../models/Team";
import { UniversityUser } from "../models/User";

export async function GetSubjectUsers(subject: any, args: any, context: any) {
  return await UniversitySubject.findAll({
    where: {
      _id: subject._id
    },
    raw: true,
    attributes: {
      include: [
        [sequelize.col('tutorials.teams.users._id'), '_id'],
        [sequelize.col('tutorials.teams.users.user_id'), 'user_id'],
        [sequelize.col('tutorials.teams.users.industry_id'), 'industry_id'],
      ]
    },
    include: [{
      model: UniversityTutorial,
      as: 'tutorials',
      include: [{
        model: UniversityTeam,
        as: 'teams',
        include: [{
          model: UniversityUser,
          as: 'users'
        }]
      }]
    }]
  });
}
