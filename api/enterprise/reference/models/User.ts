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

import {
  DataTypes,
  Sequelize,
  Model
} from 'sequelize';

import { User } from '../../../identity/models/User';
import { ReferenceInvite } from './Invite';
import { ReferenceReview } from './Review';

class ReferenceUser extends Model {
  // Primary Key
  public _id!: string;

  // Foreign Keys
  public user_id!: string;
  public industry_id!: string;

  // Relationships
  public user!: User;
  public results!: [ReferenceReview];
  public invites!: [ReferenceInvite];

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

const sync = (sequelize: Sequelize) => {
  ReferenceUser.init({
    '_id': {
      'primaryKey': true,
      'type': DataTypes.UUID,
      'defaultValue': DataTypes.UUIDV4,
      'allowNull': false
    },
    'user_id': {
      'type': DataTypes.UUID,
      'allowNull': false
    }
  }, {
    'tableName': 'REFERENCE_USER',
    'sequelize': sequelize
  });

  return ReferenceUser;
}

const assosciate = () => {
  ReferenceUser.hasMany(ReferenceReview, {
    sourceKey: '_id',
    foreignKey: 'receiver_id',
    as: 'results'
  });
  ReferenceUser.hasMany(ReferenceInvite, {
    sourceKey: '_id',
    foreignKey: 'requester_id',
    as: 'requests'
  });
  return ReferenceUser;
}

export {
  ReferenceUser,
  sync,
  assosciate
}