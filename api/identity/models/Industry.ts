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

import { User } from "./User";
// import { IndustryAverage } from "./IndustryAverage";

class Industry extends Model {
  // Primary Key
  public _id!: string;

  // Relationships
  public users!: [User];

  // Properties
  public name!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

const sync = (sequelize: Sequelize) => {
  Industry.init({
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
    'tableName': 'INDUSTRY',
    'sequelize': sequelize,
  });

  return Industry;
}

const assosciate = () => {
  Industry.hasMany(User, {
    sourceKey: '_id',
    foreignKey: 'industry_id',
    as: 'users'
  });
  // Industry.hasMany(IndustryAverage, {
  //   sourceKey: '_id',
  //   foreignKey: 'industry_id',
  //   as: 'averages'
  // });
  
  return Industry;
}

export {
  Industry,
  assosciate,
  sync
};
