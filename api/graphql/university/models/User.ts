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

import { UniversityTeam } from './Team';
import { Review } from '../../results/models/Review';
import { User } from '../../identity/models/User';
import { UniversityOrganisation } from './Organisation';
import { UniversityUserAverage } from './UserAverage';
import { UniversityUserReflectionAverage } from './UserReflectionAverage';

class UniversityUser extends Model {
  // Primary Key
  public _id!: string;

  // Foreign Keys
  public user_id!: string;

  // Relationships
  public user!: User;
  public teams!: [UniversityTeam];
  public organisations!: [UniversityOrganisation];
  public reflection!: [Review];
  public submissions!: [Review];
  public reviews!: [Review];
  public reflectionAverages!: [UniversityUserReflectionAverage];
  public averages!: [UniversityUserAverage];

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

const sync = (sequelize: Sequelize) => {
  UniversityUser.init({
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
    'tableName': 'UNIVERSITY_USER',
    'sequelize': sequelize
  });

  return UniversityUser;
}

const assosciate = () => {
  UniversityUser.belongsToMany(UniversityTeam, {
    through: 'UNIVERSITY_USER_TEAM',
    sourceKey: '_id',
    foreignKey: 'user_id',
    as: 'teams'
  });
  UniversityUser.hasMany(Review, {
    sourceKey: '_id',
    foreignKey: 'receiver_id',
    as: 'reviews'
  });
  UniversityUser.hasMany(Review, {
    sourceKey: '_id',
    foreignKey: 'submitter_id',
    as: 'submissions'
  });
  UniversityUser.hasMany(UniversityUserAverage, {
    sourceKey: '_id',
    foreignKey: 'user_id',
    as: 'averages'
  });
  UniversityUser.hasMany(UniversityUserReflectionAverage, {
    sourceKey: '_id',
    foreignKey: 'user_id',
    as: 'reflectionAverages'
  });
  UniversityUser.belongsTo(User, {
    foreignKey: 'user_id',
    targetKey: '_id',
    as: 'user'
  });
  return UniversityUser;
}

export {
  UniversityUser,
  sync,
  assosciate
}
