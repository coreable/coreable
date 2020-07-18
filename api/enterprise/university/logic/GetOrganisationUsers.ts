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

import { UniversityOrganisation } from "../models/Organisation";
import { UniversitySubject } from "../models/Subject";
import { UniversityTutorial } from "../models/Tutorial";
import { UniversityTeam } from "../models/Team";
import { UniversityUser } from "../models/User";
import { sequelize } from "../../../lib/sequelize";

export async function GetOrganisationUsers(organisation: any, args: any, context: any) {
  return await UniversityOrganisation.findAll({
    where: {
      _id: organisation._id
    },
    raw: true,
    attributes: {
      include: [
        [sequelize.col('subjects.tutorials.teams.users._id'), '_id'],
        [sequelize.col('subjects.tutorials.teams.users.user_id'), 'user_id'],
        [sequelize.col('subjects.tutorials.teams.users.industry_id'), 'industry_id'],
      ]
    },
    include: [{
      model: UniversitySubject,
      as: 'subjects',
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
    }]
  })
}