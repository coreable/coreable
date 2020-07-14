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
} from 'sequelize';
import { generatePasswordHash, checkPassword } from '../logic/functions/Hash';
import { UniversityUser } from '../../enterprise/university/models/User';

class User extends Model {
  // Primary Key
  public _id!: string;

  // Relationships
  public universityAccount!: UniversityUser;

  public email!: string;
  public firstName!: string;
  public lastName!: string;
  // public enterprise!: string;
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
  User.init({
    '_id': {
      'type': DataTypes.UUID,
      'defaultValue': DataTypes.UUIDV4,
      'primaryKey': true
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
      'allowNull': true,
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
    'tableName': 'USER',
    'sequelize': sequelize
  });

  // Hooks
  User.beforeCreate(async (user: User) => {
    try {
      user.password = await generatePasswordHash(user.password);
    } catch (err) {
      throw err;
    }
  });

  User.beforeUpdate(async (user: any) => {
    if (user._previousDataValues.password !== user.dataValues.password) {
      try {
        user.password = await generatePasswordHash(user.dataValues.password);
      } catch (err) {
        throw err;
      }
    }
  });

  User.prototype.login = async function (payload: string) {
    return checkPassword(payload, this.password);
  }
};

const assosciate = () => {
  User.hasMany(UniversityUser, { sourceKey: '_id', foreignKey: 'account_id', as: 'universityAccount' });
  return User;
}

export {
  User,
  sync,
  assosciate
}