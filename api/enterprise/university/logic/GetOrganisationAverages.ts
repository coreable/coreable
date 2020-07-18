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
import { sequelize } from "../../../lib/sequelize";
import { UniversitySubject } from "../models/Subject";
import { UniversityUser } from "../models/User";
import { UniversityTutorial } from "../models/Tutorial";
import { UniversityTeam } from "../models/Team";
import { UniversityReview } from "../models/Review";

export async function GetOrganisationAverages(organisation: any, args: any, context: any) {
  return await UniversityOrganisation.findOne({
    where: {
      _id: organisation._id
    },
    group: ['subjects.tutorials.teams.users.reviews._id'],
    raw: true,
    attributes: {
      include: [
        [
          sequelize.fn('avg',
            sequelize.col('subjects.tutorials.teams.users.reviews.calm')),
          'calm'
        ],
        [
          sequelize.fn('avg',
            sequelize.col('subjects.tutorials.teams.users.reviews.calm')),
          'clearInstructions'
        ],
        [
          sequelize.fn('avg',
            sequelize.col('subjects.tutorials.teams.users.reviews.calm')),
          'cooperatively'
        ],
        [
          sequelize.fn('avg',
            sequelize.col('subjects.tutorials.teams.users.reviews.calm')),
          'crossTeam'
        ],
        [
          sequelize.fn('avg',
            sequelize.col('subjects.tutorials.teams.users.reviews.calm')),
          'distractions'
        ],
        [
          sequelize.fn('avg',
            sequelize.col('subjects.tutorials.teams.users.reviews.calm')),
          'easilyExplainsComplexIdeas'
        ],
        [
          sequelize.fn('avg',
            sequelize.col('subjects.tutorials.teams.users.reviews.calm')),
          'empathy'
        ],
        [
          sequelize.fn('avg',
            sequelize.col('subjects.tutorials.teams.users.reviews.calm')),
          'usesRegulators'
        ],
        [
          sequelize.fn('avg',
            sequelize.col('subjects.tutorials.teams.users.reviews.calm')),
          'influences'
        ],
        [
          sequelize.fn('avg',
            sequelize.col('subjects.tutorials.teams.users.reviews.calm')),
          'managesOwn'
        ],
        [
          sequelize.fn('avg',
            sequelize.col('subjects.tutorials.teams.users.reviews.calm')),
          'newIdeas'
        ],
        [
          sequelize.fn('avg',
            sequelize.col('subjects.tutorials.teams.users.reviews.calm')),
          'openToShare'
        ],
        [
          sequelize.fn('avg',
            sequelize.col('subjects.tutorials.teams.users.reviews.calm')),
          'positiveBelief'
        ],
        [
          sequelize.fn('avg',
            sequelize.col('subjects.tutorials.teams.users.reviews.calm')),
          'proactive'
        ],
        [
          sequelize.fn('avg',
            sequelize.col('subjects.tutorials.teams.users.reviews.calm')),
          'resilienceFeedback'
        ],
        [
          sequelize.fn('avg',
            sequelize.col('subjects.tutorials.teams.users.reviews.calm')),
          'signifiesInterest'
        ],
        [
          sequelize.fn('avg',
            sequelize.col('subjects.tutorials.teams.users.reviews.calm')),
          'workDemands'
        ]
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
            as: 'users',
            include: [{
              model: UniversityReview,
              as: 'reviews'
            }]
          }]
        }]
      }]
    }]
  })
}