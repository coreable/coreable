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
import { sequelize } from "../../../lib/sequelize";

export async function GetManagerSubjects(manager: any, args: any, context: any) {
  return await Manager.findAll({
    where: {
      _id: manager._id
    },
    raw: true,
    attributes: {
      include: [
        [sequelize.col('organisation.subjects._id'), '_id'],
        [sequelize.col('organisation.subjects.name'), 'name'],
        [sequelize.col('organisation.subjects.state'), 'state'],
      ]
    },
    include: [{
      model: UniversityOrganisation,
      as: 'organisation',
      include: [{
        model: UniversitySubject,
        as: 'subjects'
      }]
    }]
  });
}
