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
import { sequelize } from "../../../lib/sequelize";
import { UniversityTutorial } from "../models/Tutorial";

export function GetUserTeams(user: any, args: any, { USER }: any) {
  return UniversityUser.findAll({
    where: { 
      user_id: USER._id
    },
    raw: true,
    group: ['teams._id'],
    attributes: {
      exclude: [
        '_id',
        'user_id',
        'industry_id',
        'updatedAt',
        'createdAt'
      ],
      include: [
        [
          sequelize.col('teams._id'), '_id'
        ],
        [
          sequelize.col('teams.name'), 'name'
        ]
      ]
    },
    include: [{
      model: UniversityTeam,
      as: 'teams',
      attributes: {
        exclude: [
          '_id',
          'inviteCode',
          'tutorial_id',
          'updatedAt',
          'createdAt'
        ]
      },
      include: [{
        model: UniversityTutorial,
        as: 'tutorial',
      }]
    }]
  });
}
