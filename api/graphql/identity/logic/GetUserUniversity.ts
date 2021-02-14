/*
  ===========================================================================
    Copyright (C) 2021 Coreable
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
import { User } from "../models/User";
import { UniversityUser } from "../../university/models/User";

export async function GetUserUniversity(user: any, args: any, context: any) {
  return await User.findOne({
    where: {
      _id: user._id
    },
    raw: true,
    attributes: {
      include: [
        [sequelize.col('university.user_id'), 'user_id'],
        [sequelize.col('university._id'), '_id']
      ]
    },
    include: [{
      model: UniversityUser,
      as: 'university'
    }]
  });
}