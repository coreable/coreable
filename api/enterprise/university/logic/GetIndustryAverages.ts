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

import { UniversityReview } from "../models/Review";
import { UniversityUser } from "../models/User";
import { sequelize } from "../../../lib/sequelize";
import { UniversityIndustry } from "../models/Industry";

export async function GetIndustryAverages(industry: any, args: any, context: any) {
  return await UniversityIndustry.findOne({
    where: {
      _id: industry._id
    },
    raw: true,
    attributes: {
      include: [
        [
          sequelize.fn('avg',
            sequelize.col('users.reviews.calm')),
          'calm'
        ],
        [
          sequelize.fn('avg',
            sequelize.col('users.reviews.clearInstructions')),
          'clearInstructions'
        ],
        [
          sequelize.fn('avg',
            sequelize.col('users.reviews.cooperatively')),
          'cooperatively'
        ],
        [
          sequelize.fn('avg',
            sequelize.col('users.reviews.crossTeam')),
          'crossTeam'
        ],
        [
          sequelize.fn('avg',
            sequelize.col('users.reviews.distractions')),
          'distractions'
        ],
        [
          sequelize.fn('avg',
            sequelize.col('users.reviews.easilyExplainsComplexIdeas')),
          'easilyExplainsComplexIdeas'
        ],
        [
          sequelize.fn('avg',
            sequelize.col('users.reviews.empathy')),
          'empathy'
        ],
        [
          sequelize.fn('avg',
            sequelize.col('users.reviews.usesRegulators')),
          'usesRegulators'
        ],
        [
          sequelize.fn('avg',
            sequelize.col('users.reviews.influences')),
          'influences'
        ],
        [
          sequelize.fn('avg',
            sequelize.col('users.reviews.managesOwn')),
          'managesOwn'
        ],
        [
          sequelize.fn('avg',
            sequelize.col('users.reviews.newIdeas')),
          'newIdeas'
        ],
        [
          sequelize.fn('avg',
            sequelize.col('users.reviews.openToShare')),
          'openToShare'
        ],
        [
          sequelize.fn('avg',
            sequelize.col('users.reviews.positiveBelief')),
          'positiveBelief'
        ],
        [
          sequelize.fn('avg',
            sequelize.col('users.reviews.proactive')),
          'proactive'
        ],
        [
          sequelize.fn('avg',
            sequelize.col('users.reviews.resilienceFeedback')),
          'resilienceFeedback'
        ],
        [
          sequelize.fn('avg',
            sequelize.col('users.reviews.signifiesInterest')),
          'signifiesInterest'
        ],
        [
          sequelize.fn('avg',
            sequelize.col('users.reviews.workDemands')),
          'workDemands'
        ]
      ]
    },
    include: [{
      model: UniversityUser,
      as: 'users',
      include: [{
        model: UniversityReview,
        as: 'reviews'
      }]
    }]
  });
}