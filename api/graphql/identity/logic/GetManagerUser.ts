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

export async function GetManagerUser(manager: any, args: any, context: any) {
  return await User.findOne({
    where: {
      _id: manager.user_id
    },
    raw: true,
    attributes: {
      include: [
        [
          sequelize.col('_id'), '_id'
        ],
        [
          sequelize.col('email'), 'email'
        ],
        [
          sequelize.col('firstName'), 'firstName'
        ],
        [
          sequelize.col('lastName'), 'lastName'
        ],
        [
          sequelize.col('industry_id'), 'industry_id'
        ],
        [
          sequelize.col('createdAt'), 'createdAt'
        ],
        [
          sequelize.col('updatedAt'), 'updatedAt'
        ]
      ]
    },
  });
}
