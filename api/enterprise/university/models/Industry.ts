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
import { UniversityUser } from "./User";
import { UniversityIndustryAverage } from "./IndustryAverage";

class UniversityIndustry extends Model {
  // Primary Key
  public _id!: string;

  // Relationships
  public users!: [UniversityUser];

  // Properties
  public name!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

const sync = (sequelize: Sequelize) => {
  UniversityIndustry.init({
    '_id': {
      'type': DataTypes.UUID,
      'defaultValue': DataTypes.UUIDV4,
      'primaryKey': true
    },
    'name': {
      'type': DataTypes.STRING,
      'allowNull': false
    },
  }, {
    'tableName': 'UNIVERSITY_INDUSTRY',
    'sequelize': sequelize,
  });

  return UniversityIndustry;
}

const assosciate = () => {
  UniversityIndustry.hasMany(UniversityUser, {
    sourceKey: '_id',
    foreignKey: 'industry_id',
    as: 'users'
  });
  UniversityIndustry.hasMany(UniversityIndustryAverage, {
    sourceKey: '_id',
    foreignKey: 'industry_id',
    as: 'averages'
  });
  
  return UniversityIndustry;
}

export {
  UniversityIndustry,
  assosciate,
  sync
};
