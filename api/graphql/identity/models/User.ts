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

import { generatePasswordHash, checkPassword } from '../logic/Hash';
import { UniversityUser } from '../../university/models/User';
import { ReferenceUser } from '../../reference/models/User';
import { Industry } from './Industry';
import { Manager } from './Manager';
import { ReferenceInvite } from '../../reference/models/Invite';
import { Review } from '../../results/models/Review';

class User extends Model {
  // Primary Key
  public _id!: string;

  // Foreign Keys
  public industry_id!: string;

  // Relationships
  public university!: UniversityUser;
  public reference!: ReferenceUser;
  public industry!: Industry;
  public manager!: Manager;
  public invites!: [ReferenceInvite];

  // Fields
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
    },
    'industry_id': {
      'type': DataTypes.UUID,
      'allowNull': true
    },
  }, {
    'tableName': 'USER',
    'sequelize': sequelize
  });

  // Hooks
  User.beforeCreate(async (user: User) => {
    try {
      user.email = user.email.toLowerCase();
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

  return User;
};

const assosciate = () => {
  User.hasOne(Manager, {
    sourceKey: '_id',
    foreignKey: 'user_id',
    as: 'manager' 
  });
  User.hasMany(UniversityUser, { 
    sourceKey: '_id',
    foreignKey: 'user_id',
    as: 'university' 
  });
  User.hasMany(ReferenceUser, { 
    sourceKey: '_id',
    foreignKey: 'user_id',
    as: 'reference' 
  });
  User.belongsTo(Industry, {
    foreignKey: 'industry_id',
    targetKey: '_id',
    as: 'industry'
  });
  User.hasMany(ReferenceInvite, {
    sourceKey: 'email',
    foreignKey: 'email',
    as: 'invites'
  });
  return User;
}

export {
  User,
  sync,
  assosciate
}
