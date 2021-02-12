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
import { UniversitySubject } from "../models/Subject";

export async function GetSubjectTutorials(subject: any, args: any, context: any) {
  return await UniversitySubject.findAll({
    where: {
      _id: subject._id
    },
    raw: true,
    attributes: {
      include: [
        [ sequelize.col('tutorials._id'), '_id'],
        [ sequelize.col('tutorials.name'), 'name'],
      ]
    },
    include: [{
      model: UniversityTutorial,
      as: 'tutorials'
    }]
  });
}