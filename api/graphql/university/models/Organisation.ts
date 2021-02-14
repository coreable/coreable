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

import { UniversitySubject } from "./Subject";
import { Manager } from "../../identity/models/Manager";
import { UniversityOrganisationAverage } from "./OrganisationAverage";

class UniversityOrganisation extends Model {
  // Primary Key
  public _id!: string;

  // Relationships
  public subjects!: [UniversitySubject];
  public averages!: [UniversityOrganisationAverage];
  public managers!: [Manager];

  // Properties
  public name!: string;
  
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

const sync = (sequelize: Sequelize) => {
  UniversityOrganisation.init({
    '_id': {
      'type': DataTypes.UUID,
      'defaultValue': DataTypes.UUIDV4,
      'primaryKey': true
    },
    'name': {
      'type': DataTypes.STRING,
      'allowNull': false
    }
  }, {
    'tableName': 'UNIVERSITY_ORGANISATION',
    'sequelize': sequelize,
  });

  return UniversityOrganisation;
}

const assosciate = () => {
  UniversityOrganisation.belongsToMany(Manager, {
    through: 'UNIVERSITY_MANAGER_ORGANISATION',
    sourceKey: '_id',
    foreignKey: 'organisation_id',
    as: 'managers'
  });

  UniversityOrganisation.hasMany(UniversitySubject, {
    sourceKey: '_id',
    foreignKey: 'organisation_id',
    as: 'subjects'
  });
  return UniversityOrganisation;
}

export {
  UniversityOrganisation,
  assosciate,
  sync
};
