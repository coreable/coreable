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
import { UniversityOrganisation } from './Organisation';
import { generatePasswordHash, checkPassword } from '../../../identity/logic/Hash';

class UniversityManager extends Model {
  // Primary Key
  public _id!: string;

  // Foreign Keys
  public organisation_id!: string;

  // Relationships
  public organisation!: UniversityOrganisation;
  
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

    // Mad different methods
    public login: ((payload: string) => Promise<boolean>) | undefined;
}

const sync = (sequelize: Sequelize) => {
  UniversityManager.init({
    '_id': {
      'primaryKey': true,
      'type': DataTypes.UUID,
      'defaultValue': DataTypes.UUIDV4,
      'allowNull': false
    },
    'firstName': {
      'type': DataTypes.STRING,
      'allowNull': false
    },
    'lastName': {
      'type': DataTypes.STRING,
      'allowNull': false
    },
    'email': {
      'type': DataTypes.STRING,
      'allowNull': false,
      'unique': true,
      'validate': {
        'isEmail': true
      }
    },
    'organisation_id': {
      'type': DataTypes.UUID,
      'allowNull': false
    },
    'password': {
      'type': DataTypes.STRING,
      'allowNull': false,
      'defaultValue': DataTypes.UUIDV4
    },
    'passwordResetToken': {
      'type': DataTypes.STRING,
      'allowNull': true
    },
    'passwordResetExpiry': {
      'type': DataTypes.DATE,
      'allowNull': true
    },
    'lockoutAttempts': {
      'type': DataTypes.INTEGER,
      'allowNull': false,
      'defaultValue': 0
    },
    'lockoutTimer': {
      'type': DataTypes.DATE,
      'allowNull': true
    }
  }, {
    'tableName': 'UNIVERSITY_MANAGER',
    'sequelize': sequelize
  });


  // Hooks
  UniversityManager.beforeCreate(async (manager: UniversityManager) => {
    try {
      manager.password = await generatePasswordHash(manager.password);
    } catch (err) {
      throw err;
    }
  });

  UniversityManager.beforeUpdate(async (manager: any) => {
    if (manager._previousDataValues.password !== manager.dataValues.password) {
      try {
        manager.password = await generatePasswordHash(manager.dataValues.password);
      } catch (err) {
        throw err;
      }
    }
  });

  UniversityManager.prototype.login = async function (payload: string) {
    return checkPassword(payload, this.password);
  }

  return UniversityManager;
}

const assosciate = () => {
  UniversityManager.belongsTo(UniversityOrganisation, {
    foreignKey: 'organisation_id',
    targetKey: '_id',
    as: 'organisation'
  });
  return UniversityManager;
}

export {
  UniversityManager,
  sync,
  assosciate
}
