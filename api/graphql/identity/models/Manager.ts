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
import { generatePasswordHash, checkPassword } from '../logic/Hash';

class Manager extends Model {
  // Primary Key
  public _id!: string;

  // Relationships
  public organisations!: [UniversityOrganisation];
  
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
    'tableName': 'MANAGER',
    'sequelize': sequelize
  });

  // Hooks
  Manager.beforeCreate(async (manager: Manager) => {
    try {
      manager.password = await generatePasswordHash(manager.password);
    } catch (err) {
      throw err;
    }
  });

  Manager.beforeUpdate(async (manager: any) => {
    if (manager._previousDataValues.password !== manager.dataValues.password) {
      try {
        manager.password = await generatePasswordHash(manager.dataValues.password);
      } catch (err) {
        throw err;
      }
    }
  });

  Manager.prototype.login = async function (payload: string) {
    return checkPassword(payload, this.password);
  }

  return Manager;
}

const assosciate = () => {
  Manager.belongsToMany(UniversityOrganisation, {
    through: 'UNIVERSITY_MANAGER_ORGANISATION',
    sourceKey: '_id',
    foreignKey: 'manager_id',
    as: 'organisations'
  });
  return Manager;
}

export {
  Manager,
  sync,
  assosciate
}
