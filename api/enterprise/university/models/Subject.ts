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
import { SubjectAverage } from "./SubjectAverage";
import { UniversityReview } from "./Review";

class UniversitySubject extends Model {
  // Primary Key
  public _id!: string;

  public name!: string;
  public state!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public teams!: [UniversityTeam];
  public reviews!: [UniversityReview];
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
    }
  }, {
    'tableName': 'UNIVERSITY_SUBJECT',
    'sequelize': sequelize,
  });

  return UniversitySubject;
}

const assosciate = () => {
  UniversitySubject.hasMany(UniversityTeam,
    {
      sourceKey: '_id',
      foreignKey: 'subject_id',
      as: 'teams'
    }
  );
  UniversitySubject.hasMany(SubjectAverage, 
    {
      sourceKey: '_id',
      foreignKey: 'subject_id',
      as: 'averages'
    }
  );
  UniversitySubject.hasMany(UniversityReview, 
    { 
      sourceKey: '_id',
      foreignKey: 'subject_id',
      as: 'reviews'
    }
  );
  return UniversitySubject;
}

export {
  UniversitySubject,
  assosciate,
  sync
};
