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
import { UniversityReview } from './Review';
import { UniversityTeam } from './Team';
import { UniversityTutorialAverage } from './TutorialAverage';
import { UniversityOrganisation } from './Organisation';

class UniversityTutorial extends Model {
  // Primary Key
  public _id!: string;

  // Foreign Keys
  public subject_id!: string;

  // Relationships
  public subject!: UniversitySubject;
  public teams!: [UniversityTeam];
  public users!: [UniversityUser];
  public reviews!: [UniversityReview];
  public organisation!: UniversityOrganisation;

  // Properties
  public name!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

const sync = (sequelize: Sequelize) => {
  UniversityTutorial.init({
    '_id': {
      'type': DataTypes.UUID,
      'defaultValue': DataTypes.UUIDV4,
      'primaryKey': true
    },
    'name': {
      'type': DataTypes.STRING,
      'allowNull': false
    },
    'subject_id': {
      'type': DataTypes.UUID,
      'allowNull': false
    }
  }, {
    'tableName': 'UNIVERSITY_TUTORIAL',
    'sequelize': sequelize,
  });

  return UniversityTutorial;
}

const assosciate = () => {
  UniversityTutorial.hasMany(UniversityTeam, {
    sourceKey: '_id',
    foreignKey: 'tutorial_id',
    as: 'teams'
  });
  UniversityTutorial.belongsTo(UniversitySubject, {
    targetKey: '_id',
    foreignKey: 'subject_id',
    as: 'subject'
  });
  UniversityTutorial.hasMany(UniversityTutorialAverage, {
    sourceKey: '_id',
    foreignKey: 'team_id',
    as: 'averages'
  });
  UniversityTutorial.hasMany(UniversityReview, {
    sourceKey: '_id',
    foreignKey: 'tutorial_id',
    as: 'reviews'
  });
  return UniversityTutorial;
}

export {
  UniversityTutorial,
  sync,
  assosciate
}
