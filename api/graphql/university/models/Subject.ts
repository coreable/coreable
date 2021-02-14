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
  Sequelize,
  DataTypes
} from "sequelize";
import { UniversityTeam } from "./Team";
import { UniversitySubjectAverage } from "./SubjectAverage";
import { Review } from "../../results/models/Review";
import { UniversityTutorial } from "./Tutorial";
import { UniversityOrganisation } from "./Organisation";

class UniversitySubject extends Model {
  // Primary Key
  public _id!: string;

  // Foreign Keys
  public organisation_id!: string;

  // Relationships
  public teams!: [UniversityTeam];
  public reviews!: [Review];
  public averages!: [UniversitySubjectAverage];
  public organisation!: UniversityOrganisation;

  // Properties
  public name!: string;
  public state!: number;
  
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

const sync = (sequelize: Sequelize) => {
  UniversitySubject.init({
    '_id': {
      'type': DataTypes.UUID,
      'defaultValue': DataTypes.UUIDV4,
      'primaryKey': true
    },
    'name': {
      'type': DataTypes.STRING,
      'allowNull': false
    },
    'state': {
      'type': DataTypes.INTEGER,
      'defaultValue': 1,
      'allowNull': false,
      'validate': {
        'min': 1,
        'max': 3
      }
    },
    'organisation_id': {
      'type': DataTypes.UUID,
      'allowNull': false
    }
  }, {
    'tableName': 'UNIVERSITY_SUBJECT',
    'sequelize': sequelize,
  });

  return UniversitySubject;
}

const assosciate = () => {
  UniversitySubject.belongsTo(UniversityOrganisation, {
    foreignKey: 'organisation_id',
    targetKey: '_id',
    as: 'organisation'
  });
  UniversitySubject.hasMany(UniversityTutorial, {
    sourceKey: '_id',
    foreignKey: 'subject_id',
    as: 'tutorials'
  });
  UniversitySubject.hasMany(UniversitySubjectAverage, {
    sourceKey: '_id',
    foreignKey: 'subject_id',
    as: 'averages'
  });
  UniversitySubject.hasMany(Review, {
    sourceKey: '_id',
    foreignKey: 'subject_id',
    as: 'reviews'
  });
  return UniversitySubject;
}

export {
  UniversitySubject,
  assosciate,
  sync
};
