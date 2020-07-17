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
import { UniversityUser } from "../models/User";
import { UniversityTeam } from "../models/Team";
import { UniversityReview } from "../models/Review";

export async function GetSubjectAverages(subject: any, args: any, context: any) {
  return await UniversitySubject.findOne(
    {
      where: { _id: subject._id },
      group: ['_id'],
      attributes: {
        exclude: [
          '_id',
          'name',
          'state',
          'createdAt',
          'updatedAt'
        ],
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
          ],
        ]
      },
      include: [{
        model: UniversityTeam, as: 'teams',
        attributes: {
          exclude: [
            'name',
            'inviteCode',
            'createdAt',
            'updatedAt'
          ]
        },
        include: [{
          model: UniversityUser, as: 'users',
          attributes: {
            exclude: [
              'firstName',
              'lastName',
              'email',
              'password',
              'passwordResetToken',
              'passwordResetExpiry',
              'createdAt',
              'updatedAt'
            ]
          },
          include: [{
            model: UniversityReview, as: 'reviews', attributes: {
              exclude: [
                'createdAt',
                'updatedAt'
              ]
            }
          }]
        }]
      }]
    }
  );
}
