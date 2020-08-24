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

import { UniversityTutorial } from "../models/Tutorial"
import { UniversityTeam } from "../models/Team"
import { UniversityUser } from "../models/User"
import { UniversityReview } from "../models/Review"
import { sequelize } from "../../../lib/sequelize"

export async function GetTutorialAverages(tutorial: any, args: any, context: any) {
  return await UniversityTutorial.findOne({
    where: {
      _id: tutorial._id
    },
    raw: true,
    group: ['teams.users.reviews._id'],
    attributes: {
      include: [
        [
          sequelize.fn('avg',
            sequelize.col('teams.users.reviews.calm')),
          'calm'
        ],
        [
          sequelize.fn('avg',
            sequelize.col('teams.users.reviews.clearInstructions')),
          'clearInstructions'
        ],
        [
          sequelize.fn('avg',
            sequelize.col('teams.users.reviews.cooperatively')),
          'cooperatively'
        ],
        [
          sequelize.fn('avg',
            sequelize.col('teams.users.reviews.crossTeam')),
          'crossTeam'
        ],
        [
          sequelize.fn('avg',
            sequelize.col('teams.users.reviews.distractions')),
          'distractions'
        ],
        [
          sequelize.fn('avg',
            sequelize.col('teams.users.reviews.easilyExplainsComplexIdeas')),
          'easilyExplainsComplexIdeas'
        ],
        [
          sequelize.fn('avg',
            sequelize.col('teams.users.reviews.empathy')),
          'empathy'
        ],
        [
          sequelize.fn('avg',
            sequelize.col('teams.users.reviews.usesRegulators')),
          'usesRegulators'
        ],
        [
          sequelize.fn('avg',
            sequelize.col('teams.users.reviews.influences')),
          'influences'
        ],
        [
          sequelize.fn('avg',
            sequelize.col('teams.users.reviews.managesOwn')),
          'managesOwn'
        ],
        [
          sequelize.fn('avg',
            sequelize.col('teams.users.reviews.newIdeas')),
          'newIdeas'
        ],
        [
          sequelize.fn('avg',
            sequelize.col('teams.users.reviews.openToShare')),
          'openToShare'
        ],
        [
          sequelize.fn('avg',
            sequelize.col('teams.users.reviews.positiveBelief')),
          'positiveBelief'
        ],
        [
          sequelize.fn('avg',
            sequelize.col('teams.users.reviews.proactive')),
          'proactive'
        ],
        [
          sequelize.fn('avg',
            sequelize.col('teams.users.reviews.resilienceFeedback')),
          'resilienceFeedback'
        ],
        [
          sequelize.fn('avg',
            sequelize.col('teams.users.reviews.signifiesInterest')),
          'signifiesInterest'
        ],
        [
          sequelize.fn('avg',
            sequelize.col('teams.users.reviews.workDemands')),
          'workDemands'
        ]
      ]
    },
    include: [{
      model: UniversityTeam,
      as: 'teams',
      attributes: {
        exclude: [
          '_id',
          'name',
          'inviteCode',
          'createdAt',
          'updatedAt'
        ]
      },
      include: [{
        model: UniversityUser,
        as: 'users',
        attributes: {
          exclude: [
            '_id',
            'user_id',
            'industry_id',
            'createdAt',
            'updatedAt'
          ]
        },
        include: [{
          model: UniversityReview,
          as: 'reviews',
          attributes: {
            exclude: [
              'createdAt',
              'updatedAt'
            ]
          }
        }]
      }]
    }]
  });
}