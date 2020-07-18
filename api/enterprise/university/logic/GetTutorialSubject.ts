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
import { UniversitySubject } from "../models/Subject";
import { sequelize } from "../../../lib/sequelize";

export async function GetTutorialSubject(tutorial: any, args: any, context: any) {
  return await UniversityTutorial.findOne({
    where: {
      _id: tutorial._id
    },
    raw: true,
    attributes: {
      include: [
        [ sequelize.col('subject._id'), '_id'],
        [ sequelize.col('subject.name'), 'name'],
        [ sequelize.col('subject.state'), 'state'],
      ]
    },
    include: [{
      model: UniversitySubject,
      as: 'subject'
    }]
  });
}