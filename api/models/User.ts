/*
===========================================================================
Copyright (C) 2020 Coreable
This file is part of Coreable's source code.
Corables source code is free software; you can redistribute it
and/or modify it under the terms of the End-user license agreement.
Coreable's source code is distributed in the hope that it will be
useful, but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
You should have received a copy of the license along with the 
Coreable source code.
===========================================================================
*/ 

import { Model, DataTypes, Sequelize, BelongsToMany, HasMany, BelongsTo } from 'sequelize';
import {
  generatePasswordHash,
  checkPassword
} from '../lib/hash';
import { Team } from './Team';
import { Review } from './Review';
import { Industry } from './Industry';

class User extends Model {
  // PK
  public _id!: string;

  public email!: string;
  public firstName!: string;
  public lastName!: string;
  public password!: string;
  public passwordResetToken!: string;
  public passwordResetExpiry!: Date

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public login: ((payload: string) => Promise<boolean>) | undefined;
  public teams!: [Team];
  public submissions!: [Review];
  public reviews!: [Review];
  public reflection!: Review;
  public industry!: Industry;
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
    'industry_id': {
      'type': DataTypes.UUID,
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

  User.prototype.login = async function(payload: string) {
    return checkPassword(payload, this.password);
  }

  return User;
}

let UserTeam: BelongsToMany<User, Team>;
let UserReviewResults: HasMany<User, Review>;
let UserReviewSubmitted: HasMany<User, Review>;
let UserIndustry: BelongsTo<User, Industry>;

const assosciate = () => {
  UserTeam = User.belongsToMany(Team, { through: 'USER_TEAM', sourceKey: '_id', foreignKey: 'user_id', as: 'teams' });
  UserReviewResults = User.hasMany(Review, { sourceKey: '_id', foreignKey: 'receiver_id', as: 'reviews' });
  UserReviewSubmitted = User.hasMany(Review, { sourceKey: '_id', foreignKey: 'submitter_id', as: 'submissions' });
  UserIndustry = User.belongsTo(Industry, { foreignKey: 'industry_id', targetKey: '_id', as: 'industry' });
  return User;
}

export {
  sync,
  assosciate,
  UserTeam,
  UserReviewResults,
  UserReviewSubmitted,
  UserIndustry,
  User
}