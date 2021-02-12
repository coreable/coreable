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
  DataTypes,
  Sequelize
} from 'sequelize';
import { UniversityUser } from './User';
import { UniversitySubject } from './Subject';
import { UniversityTeam } from './Team';
import { UniversityTutorial } from './Tutorial';
import { UniversityOrganisation } from './Organisation';

class UniversityReview extends Model {
  // Primary Key
  public _id!: string;

  // Foreign Keys
  public receiver_id!: string;
  public submitter_id!: string;
  public subject_id!: string;
  public team_id!: string;
  public tutorial_id!: string;
  public organisation_id!: string;

  // Relationships
  public receiver!: UniversityUser;
  public submitter!: UniversityUser;
  public subject!: UniversitySubject;
  public team!: UniversityTeam;
  public tutorial!: UniversityTutorial;
  public organisation!: UniversityOrganisation;

  // Properties
  public calm!: number;
  public clearInstructions!: number;
  public cooperatively!: number;
  public crossTeam!: number;
  public distractions!: number;
  public easilyExplainsComplexIdeas!: number;
  public empathy!: number;
  public usesRegulators!: number;
  public influences!: number;
  public managesOwn!: number;
  public newIdeas!: number;
  public openToShare!: number;
  public positiveBelief!: number;
  public proactive!: number;
  public resilienceFeedback!: number;
  public signifiesInterest!: number;
  public workDemands!: number;
  public state!: number;
  
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

const sync = (sequelize: Sequelize) => {
  UniversityReview.init({
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
    'subject_id': {
      type: DataTypes.UUID,
      allowNull: false
    },
    'team_id': {
      type: DataTypes.UUID,
      allowNull: false
    },
    'tutorial_id': {
      type: DataTypes.UUID,
      allowNull: false
    },
    'organisation_id': {
      type: DataTypes.UUID,
      allowNull: false
    },
    'empathy': {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    'managesOwn': {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    'cooperatively': {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    'positiveBelief': {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    'resilienceFeedback': {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    'calm': {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    'newIdeas': {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    'workDemands': {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    'proactive': {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    'influences': {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    'clearInstructions': {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    'easilyExplainsComplexIdeas': {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    'openToShare': {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    'crossTeam': {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    'distractions': {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    'usesRegulators': {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    'signifiesInterest': {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    'state': {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 3
      }
    }
  }, {
    'tableName': 'UNIVERSITY_REVIEW',
    'sequelize': sequelize,
  });

  return UniversityReview;
}

const assosciate = () => {
  UniversityReview.belongsTo(UniversityUser, {
    foreignKey: 'receiver_id',
    targetKey: '_id',
    as: 'receiver'
  });
  UniversityReview.belongsTo(UniversityUser, {
    foreignKey: 'submitter_id',
    targetKey: '_id',
    as: 'submitter'
  });
  UniversityReview.belongsTo(UniversitySubject, {
    foreignKey: 'subject_id',
    targetKey: '_id',
    as: 'subject'
  });
  UniversityReview.belongsTo(UniversityTeam, {
    foreignKey: 'team_id',
    targetKey: '_id',
    as: 'team'
  });
  UniversityReview.belongsTo(UniversityTutorial, {
    foreignKey: 'tutorial_id',
    targetKey: '_id',
    as: 'tutorial'
  });
  UniversityReview.belongsTo(UniversityOrganisation, {
    foreignKey: 'organisation_id',
    targetKey: '_id',
    as: 'organisation'
  });
  return UniversityReview;
}

export {
  UniversityReview,
  sync,
  assosciate
};
