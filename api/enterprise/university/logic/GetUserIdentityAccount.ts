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

import { UniversityUser } from "../models/User";
import { User } from "../../../identity/models/User";
import { sequelize } from "../../../lib/sequelize";

export async function GetUserIdentityAccount(user: any, args: any, context: any) {
  return await UniversityUser.findOne({
    where: {
      _id: user._id,
    },
    attributes: {
      include: [
        [ sequelize.col('user._id'), '_id' ],
        [ sequelize.col('user.email'), 'email' ],
        [ sequelize.col('user.firstName'), 'firstName' ],
        [ sequelize.col('user.lastName'), 'lastName' ],
        [ sequelize.col('user.updatedAt'), 'updatedAt' ],
        [ sequelize.col('user.createdAt'), 'createdAt' ]
      ]
    },
    raw: true,
    include: [{
      model: User,
      as: 'user'
    }]
  })
}