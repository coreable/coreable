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
import { sequelize } from "../../../lib/sequelize";
import { UniversityTutorial } from "../models/Tutorial";

export function GetUserSubjects(user: any, args: any, { USER }: any) {
  return UniversityUser.findAll({
    where: { 
      _id: user._id
    },
    raw: true,
    group: ['teams.tutorial.subject._id'],
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
          sequelize.col('teams.tutorial.subject.name'), 'name'
        ],
        [
          sequelize.col('teams.tutorial.subject.state'), 'state'
        ],
        [
          sequelize.col('teams.tutorial.subject._id'), '_id'
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
        attributes: {
          exclude: [
            '_id',
            'name',
            'subject_id'
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
            ]
          }
        }]
      }]
    }]
  });
}
