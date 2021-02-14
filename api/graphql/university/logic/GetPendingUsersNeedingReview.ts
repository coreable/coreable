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
import { Review } from "../../results/models/Review";
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
    const submittedReviews = await Review.findAll({
      where: {
        uni_submitter_id: user._id,
        uni_subject_id: team.tutorial.subject._id,
        uni_state: team.tutorial.subject.state
      }
    });

    const usersReceivedReviews_ids: string[] = [];
    for (const review of submittedReviews) {
      usersReceivedReviews_ids.push(review.uni_receiver_id);
    }

    if (team.tutorial.subject.state !== 1) {
      usersReceivedReviews_ids.push(user._id);
    }

    team.users = await team.getUsers({
      where: {
        _id: {
          [Op.not]: usersReceivedReviews_ids
        }
      }
    });

    team.users = team.users.filter((pending: any) => {
      switch (team.tutorial.subject.state) {
        case 1:
          return pending._id === user._id;
        case 2:
        case 3:
          return pending._id !== user._id;
        default:
          return false;
      }
    });

    team.fromPending = true;
  }

  return userWithTeams.teams;
}

