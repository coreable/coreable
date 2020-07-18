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
import { UniversityUser } from "../models/User";

export async function GetUniversityAccountWithTeamsFromUser_id({ JWT }: any) {
  return await UniversityUser.findOne({
    where: {
      user_id: JWT._id
    },
    include: [{
      model: UniversityTeam,
      as: 'teams'
    }]
  });
}

export async function GetUniversityAccountWithTeamsFromPrimaryKey({ USER }: any) {
  return await UniversityUser.findOne({
    where: {
      _id: USER._id
    },
    include: [{
      model: UniversityTeam,
      as: 'teams'
    }]
  });
}
