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

