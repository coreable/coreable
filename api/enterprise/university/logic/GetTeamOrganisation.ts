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

import { UniversityTutorial } from "../models/Tutorial";
import { sequelize } from "../../../lib/sequelize";
import { UniversityTeam } from "../models/Team";
import { UniversitySubject } from "../models/Subject";
import { UniversityOrganisation } from "../models/Organisation";

export async function GetTeamOrganisation(team: any, args: any, context: any) {
  return await UniversityTeam.findOne({
    where: {
      _id: team._id
    },
    raw: true,
    attributes: {
      include: [
        [ sequelize.col('tutorial.subject.organisation._id'), '_id'],
        [ sequelize.col('tutorial.subject.organisation.name'), 'name']
      ]
    },
    include: [{
      model: UniversityTutorial,
      as: 'tutorial',
      include: [{
        model: UniversitySubject,
        as: 'subject',
        include: [{
          model: UniversityOrganisation,
          as: 'organisation'
        }]
      }]
    }]
  });
}