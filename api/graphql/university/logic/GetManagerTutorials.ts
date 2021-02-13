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

import { Manager } from "../../identity/models/Manager";
import { UniversityOrganisation } from "../models/Organisation";
import { UniversitySubject } from "../models/Subject";
import { UniversityTutorial } from "../models/Tutorial";
import { sequelize } from "../../../lib/sequelize";

export async function GetManagerTutorials(manager: any, args: any, context: any) {
  return await Manager.findAll({
    where: {
      _id: manager._id
    },
    raw: true,
    attributes: {
      include: [
        [sequelize.col('organisation.subjects.tutorials._id'), '_id'],
        [sequelize.col('organisation.subjects.tutorials.name'), 'name']
      ]
    },
    include: [{
      model: UniversityOrganisation,
      as: 'organisation',
      include: [{
        model: UniversitySubject,
        as: 'subjects',
        include: [{
          model: UniversityTutorial,
          as: 'tutorials',
        }]
      }]
    }]
  })
}
