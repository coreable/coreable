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

import { UniversityTeam } from "../models/Team";
import { UniversitySubject } from "../models/Subject";
import { UniversityUser } from "../models/User";
import { UniversityReview } from "../models/Review";
import { UniversityTutorial } from "../models/Tutorial";
import { Op } from "sequelize";

export async function GetPendingUsersNeedingReview(user: any, args: any, { USER }: any) {
  const userWithTeams: any = await UniversityUser.findOne({
    where: {
      _id: user._id
    },
    include: [{
      model: UniversityTeam,
      as: 'teams',
      include: [{
        model: UniversityTutorial,
        as: 'tutorial',
        include: [{
          model: UniversitySubject,
          as: 'subject',
        }]
      }, {
        model: UniversityUser,
        as: 'users'
      }]
    }]
  });

  for (const team of userWithTeams.teams) {
    const submittedReviews = await UniversityReview.findAll({
      where: {
        submitter_id: user._id,
        subject_id: team.tutorial.subject._id,
        state: team.tutorial.subject.state
      }
    });

    const usersReceivedReviews_ids: string[] = [];
    for (const review of submittedReviews) {
      usersReceivedReviews_ids.push(review.receiver_id);
    }

    const usersPending = await team.getUsers({
      where: {
        _id: {
          [Op.not]: usersReceivedReviews_ids
        }
      }
    });

    for (let i = 0; i < usersPending.length; i++) {
      if (usersPending[i]._id === user._id && team.tutorial.subject.state > 1) {
        delete usersPending[i];
      }
    }
    
    team.users = usersPending.filter((user: any) => !!user);
    team.fromPending = true;
  }

  return userWithTeams.teams;
}

