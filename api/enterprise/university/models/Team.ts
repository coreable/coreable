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
  Model,
  DataTypes,
  Sequelize
} from 'sequelize';
import { UniversityUser } from './User';
import { UniversitySubject } from './Subject';
import { TeamAverage } from './TeamAverage';
import { UniversityReview } from './Review';

class UniversityTeam extends Model {
  // Primary Key
  public _id!: string;

  public name!: string;
  public inviteCode!: string;
  public subject_id!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public subject!: UniversitySubject;
  public users!: [UniversityUser];
  public reviews!: [UniversityReview];
}

const sync = (sequelize: Sequelize) => {
  UniversityTeam.init({
    '_id': {
      'type': DataTypes.UUID,
      'defaultValue': DataTypes.UUIDV4,
      'primaryKey': true
    },
    'name': {
      'type': DataTypes.STRING,
      'allowNull': false
    },
    'inviteCode': {
      'type': DataTypes.STRING,
      'allowNull': false
    },
    'subject_id': {
      'type': DataTypes.UUID,
      'allowNull': false
    }
  }, {
    'tableName': 'UNIVERSITY_TEAM',
    'sequelize': sequelize,
  });

  return UniversityTeam;
}

const assosciate = () => {
  UniversityTeam.belongsToMany(UniversityUser, 
    {
      through: 'UNIVERSITY_USER_TEAM',
      sourceKey: '_id',
      foreignKey: 'team_id',
      as: 'users'
    }
  );
  UniversityTeam.belongsTo(UniversitySubject, 
    {
      targetKey: '_id',
      foreignKey: 'subject_id',
      as: 'subject'
    }
  );
  UniversityTeam.hasMany(TeamAverage, 
    {
      sourceKey: '_id',
      foreignKey: 'team_id',
      as: 'averages'
    }
  );
  UniversityTeam.hasMany(UniversityReview, 
    {
      sourceKey: '_id',
      foreignKey: 'team_id',
      as: 'reviews'
    }
  );
  return UniversityTeam;
}

export {
  UniversityTeam,
  sync,
  assosciate
}
