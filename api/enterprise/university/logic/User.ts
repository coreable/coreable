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
import { UniversityTeam } from "../models/Team";
import { UniversitySubject } from "../models/Subject";

export async function GetUserSubjects(user: any, args: any, { USER }: any) {
  const res = await sequelize.models.User.findOne({
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
      ],
    },
    include: [{
      model: UniversityTeam,
      as: 'teams',
      group: ['_id'],
      attributes: {
        exclude: [
          'updatedAt',
          'createdAt'
        ]
      },
      include: [{
        model: UniversitySubject,
        as: 'subject',
        group: ['_id'],
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
      }
      ]
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

export async function GetPendingUsersNeedingReview(user: any, args: any, { USER }: any) {
  const teams = await (user as any).getTeams({
    model: UniversityTeam,
    include: [{ model: UniversitySubject, as: 'subject' }],
    attributes: { exclude: ['inviteCode'] }
  });

  for (const team of teams) {
    team.users = [];

    const hasReviewed = await sequelize.models.Review.findAll({
      where: { submitter_id: USER._id, subject_id: team.subject._id, state: team.subject.state }
    });

    if (!hasReviewed.length) {
      team.users = await team.getUsers();
    }
  }

  return teams;
}

export async function GetAverageReflectionResult(user: any, args: any, { USER }: any) {
  return await sequelize.models.Review.findAll({
    where: { receiver_id: USER._id, submitter_id: USER._id },
    group: ['_id'],
    attributes: {
      exclude: [
        '_id',
        'updatedAt',
        'createdAt'
      ],
      include: [
        [
          sequelize.fn('avg',
            sequelize.col('review.calm')),
          'calm'
        ],
        [
          sequelize.fn('avg',
            sequelize.col('review.change')),
          'change'
        ],
        [
          sequelize.fn('avg',
            sequelize.col('review.clearInstructions')),
          'clearInstructions'
        ],
        [
          sequelize.fn('avg',
            sequelize.col('review.cooperatively')),
          'cooperatively'
        ],
        [
          sequelize.fn('avg',
            sequelize.col('review.crossTeam')),
          'crossTeam'
        ],
        [
          sequelize.fn('avg',
            sequelize.col('review.easilyExplainsComplexIdeas')),
          'easilyExplainsComplexIdeas'
        ],
        [
          sequelize.fn('avg',
            sequelize.col('review.empathy')),
          'empathy'
        ],
        [
          sequelize.fn('avg',
            sequelize.col('review.usesRegulators')),
          'usesRegulators'
        ],
        [
          sequelize.fn('avg',
            sequelize.col('review.influences')),
          'influences'
        ],
        [
          sequelize.fn('avg',
            sequelize.col('review.managesOwn')),
          'managesOwn'
        ],
        [
          sequelize.fn('avg',
            sequelize.col('review.newIdeas')),
          'newIdeas'
        ],
        [
          sequelize.fn('avg',
            sequelize.col('review.openToShare')),
          'openToShare'
        ],
        [
          sequelize.fn('avg',
            sequelize.col('review.positiveBelief')),
          'positiveBelief'
        ],
        [
          sequelize.fn('avg',
            sequelize.col('review.proactive')),
          'proactive'
        ],
        [
          sequelize.fn('avg',
            sequelize.col('review.resilienceFeedback')),
          'resilienceFeedback'
        ],
        [
          sequelize.fn('avg',
            sequelize.col('review.signifiesInterest')),
          'signifiesInterest'
        ],
        [
          sequelize.fn('avg',
            sequelize.col('review.verbalAttentiveFeedback')),
          'verbalAttentiveFeedback'
        ],
        [
          sequelize.fn('avg',
            sequelize.col('review.workDemands')),
          'workDemands'
        ],
      ]
    }
  });
}