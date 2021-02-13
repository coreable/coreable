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
import { UniversityOrganisation } from '../../university/models/Organisation';
import { User } from './User';

class Manager extends Model {
  // Primary Keys
  public _id!: string;

  // Foreign Keys
  public user_id!: string;

  // Relationships
  public organisations!: [UniversityOrganisation];
  public user!: User;

  // Properties
  public email!: string;
  public firstName!: string;
  public lastName!: string;
  public password!: string;
  public passwordResetToken!: string;
  public passwordResetExpiry!: Date
  public lockoutAttempts!: number;
  public lockoutTimer!: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // It's like mad different methods to the way I do my shit
  public login: ((payload: string) => Promise<boolean>) | undefined;
}

const sync = (sequelize: Sequelize) => {
  Manager.init({
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
    'tableName': 'MANAGER',
    'sequelize': sequelize
  });

  return Manager;
}

const assosciate = () => {
  Manager.belongsToMany(UniversityOrganisation, {
    through: 'UNIVERSITY_MANAGER_ORGANISATION',
    sourceKey: '_id',
    foreignKey: 'manager_id',
    as: 'organisations'
  });
  Manager.belongsTo(User, {
    foreignKey: 'user_id',
    targetKey: '_id',
    as: 'user'
  });
  return Manager;
}

export {
  Manager,
  sync,
  assosciate
}
