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

import { sequelize } from "../../../lib/sequelize";
import { UniversityUser } from "../models/User";
import { UniversityReview } from "../models/Review";

export async function GetReflectionAverages(user: any, args: any, { USER }: any) {
  return await UniversityUser.findOne({
    where: { user_id: USER._id },
    group: ['_id'],
    attributes: {
      exclude: [
        'createdAt',
        'updatedAt'
      ],
      include: [
        [
          sequelize.fn('avg',
            sequelize.col('reviews.calm')),
          'calm'
        ],
        [
          sequelize.fn('avg',
            sequelize.col('reviews.change')),
          'change'
        ],
        [
          sequelize.fn('avg',
            sequelize.col('reviews.clearInstructions')),
          'clearInstructions'
        ],
        [
          sequelize.fn('avg',
            sequelize.col('reviews.cooperatively')),
          'cooperatively'
        ],
        [
          sequelize.fn('avg',
            sequelize.col('reviews.crossTeam')),
          'crossTeam'
        ],
        [
          sequelize.fn('avg',
            sequelize.col('reviews.easilyExplainsComplexIdeas')),
          'easilyExplainsComplexIdeas'
        ],
        [
          sequelize.fn('avg',
            sequelize.col('reviews.empathy')),
          'empathy'
        ],
        [
          sequelize.fn('avg',
            sequelize.col('reviews.usesRegulators')),
          'usesRegulators'
        ],
        [
          sequelize.fn('avg',
            sequelize.col('reviews.influences')),
          'influences'
        ],
        [
          sequelize.fn('avg',
            sequelize.col('reviews.managesOwn')),
          'managesOwn'
        ],
        [
          sequelize.fn('avg',
            sequelize.col('reviews.newIdeas')),
          'newIdeas'
        ],
        [
          sequelize.fn('avg',
            sequelize.col('reviews.openToShare')),
          'openToShare'
        ],
        [
          sequelize.fn('avg',
            sequelize.col('reviews.positiveBelief')),
          'positiveBelief'
        ],
        [
          sequelize.fn('avg',
            sequelize.col('reviews.proactive')),
          'proactive'
        ],
        [
          sequelize.fn('avg',
            sequelize.col('reviews.resilienceFeedback')),
          'resilienceFeedback'
        ],
        [
          sequelize.fn('avg',
            sequelize.col('reviews.signifiesInterest')),
          'signifiesInterest'
        ],
        [
          sequelize.fn('avg',
            sequelize.col('reviews.verbalAttentiveFeedback')),
          'verbalAttentiveFeedback'
        ],
        [
          sequelize.fn('avg',
            sequelize.col('reviews.workDemands')),
          'workDemands'
        ]
      ]
    },
    include: [{
      model: UniversityReview,
      as: 'reviews',
      where: { submitter_id: user._id, receiver_id: user._id },
      attributes: {
        exclude: [
          'createdAt',
          'updatedAt'
        ]
      }
    }]
  });
}

