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

import { Model, DataTypes, Sequelize, BelongsTo } from 'sequelize';
import { User } from './User';

class Review extends Model {
  // PK
  public _id!: string;

  // FK
  public receiver_id!: string;
  public receiver!: User;
  public submitter_id!: string;
  public submitter!: User;

  public calm!: number;
  public change!: number;
  public clearInstructions!: number;
  public cooperatively!: number;
  public crossTeam!: number;
  public distractions!: number;
  public easilyExplainsComplexIdeas!: number;
  public emotionalResponse!: number;
  public empathy!: number;
  public eyeContact!: number;
  public faith!: number;
  public influences!: number;
  public managesOwn!: number;
  public newIdeas!: number;
  public openToShare!: number;
  public positiveBelief!: number;
  public preventsMisunderstandings!: number;
  public proactive!: number;
  public resilienceFeedback!: number;
  public signifiesInterest!: number;
  public tone!: number;
  public verbalAttentiveFeedback!: number;
  public workDemands!: number;  
  // ??????
  public state!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

const sync = (sequelize: Sequelize) => {
  Review.init({
    '_id': {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    'receiver_id': {
      type: DataTypes.UUID,
      allowNull: false
    },
    'submitter_id': {
      type: DataTypes.UUID,
      allowNull: false
    },
    'emotionalResponse': {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    'empathy': {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    'managesOwn': {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    'faith': {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    'cooperatively': {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    'positiveBelief': {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    'resilienceFeedback': {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    'calm': {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    'change': {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    'newIdeas': {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    'workDemands': {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    'proactive': {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    'influences': {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    'clearInstructions': {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    'preventsMisunderstandings': {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    'easilyExplainsComplexIdeas': {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    'openToShare': {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    'tone': {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    'crossTeam': {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    'distractions': {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    'eyeContact': {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    'signifiesInterest': {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    'verbalAttentiveFeedback': {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    'state': {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 4
      }
    }
  }, {
    'tableName': 'REVIEW',
    'sequelize': sequelize,
  });

  return Review;
}

let ReviewResultsUser: BelongsTo<Review, User> ;
let ReviewSubmittedUser: BelongsTo<Review, User>;
const assosciate = () => {
  ReviewResultsUser = Review.belongsTo(User, { foreignKey: 'receiver_id', targetKey: '_id', as: 'receiver' });
  ReviewSubmittedUser = Review.belongsTo(User, { foreignKey: 'submitter_id', targetKey: '_id', as: 'submitter' });
  return Review;
}

export {
  sync,
  assosciate,
  ReviewResultsUser,
  ReviewSubmittedUser,
  Review,
};