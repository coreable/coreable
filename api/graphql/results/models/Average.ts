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

// Identity
import { Industry } from "../../identity/models/Industry";
import { User } from "../../identity/models/User";

// Reference
import { ReferenceUser } from "../../reference/models/User";

// University
import { UniversityOrganisation } from "../../university/models/Organisation";
import { UniversitySubject } from "../../university/models/Subject";
import { UniversityTeam } from "../../university/models/Team";
import { UniversityTutorial } from "../../university/models/Tutorial";
import { UniversityUser } from "../../university/models/User";

class Average extends Model {
  /** PRIMARY KEYS */
  public _id!: string;

  /** FOREIGN KEYS */
  // Identity
  public identity_receiver_id!: string;
  public identity_submitter_id!: string;
  public identity_industry_id!: string;
  // Univerisity
  public uni_receiver_id!: string;
  public uni_submitter_id!: string;
  public uni_subject_id!: string;
  public uni_team_id!: string;
  public uni_tutorial_id!: string;
  public uni_organisation_id!: string;
  // Reference
  public ref_receiver_id!: string;
  public ref_submitter_id!: string;

  /** RELATIONSHIPS */
  // Identity
  public identity_submitter!: User;
  public identity_receiver!: User;
  public identity_industry!: Industry;
  // University
  public uni_receiver!: UniversityUser;
  public uni_submitter!: UniversityUser;
  public uni_subject!: UniversitySubject;
  public uni_team!: UniversityTeam;
  public uni_tutorial!: UniversityTutorial;
  public uni_organisation!: UniversityOrganisation;
  // Reference
  public ref_receiver!: ReferenceUser;
  public ref_submitter!: ReferenceUser;

  /** PROPERTIES */
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

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

const sync = (sequelize: Sequelize) => {
  Average.init({
    '_id': {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    /** IDENTITY */
    'identity_receiver_id': {
      type: DataTypes.UUID,
      allowNull: true
    },
    'identity_submitter_id': {
      type: DataTypes.UUID,
      allowNull: true
    },
    'identity_industry_id': {
      type: DataTypes.UUID,
      allowNull: true
    },
    /** UNIVERSITY */
    'uni_receiver_id': {
      type: DataTypes.UUID,
      allowNull: true
    },
    'uni_submitter_id': {
      type: DataTypes.UUID,
      allowNull: true
    },
    'uni_organisation_id': {
      type: DataTypes.UUID,
      allowNull: true
    },
    'uni_subject_id': {
      type: DataTypes.UUID,
      allowNull: true
    },
    'uni_tutorial_id': {
      type: DataTypes.UUID,
      allowNull: true
    },
    'uni_team_id': {
      type: DataTypes.UUID,
      allowNull: true
    },
    /** REFERENCE */
    'ref_receiver_id': {
      type: DataTypes.UUID,
      allowNull: true
    },
    'ref_submitter_id': {
      type: DataTypes.UUID,
      allowNull: true
    },
    'ref_invite_id': {
      type: DataTypes.UUID,
      allowNull: true
    },
    /** PROPERTIES */
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
  }, {
    'tableName': 'AVERAGE',
    'sequelize': sequelize
  });

  return Average;
}

const assosciate = () => {
  /** IDENTITY */
  Average.belongsTo(User, {
    foreignKey: 'identity_receiver_id',
    targetKey: '_id',
    as: 'identity_receiver'
  });
  Average.belongsTo(User, {
    foreignKey: 'identity_submitter_id',
    targetKey: '_id',
    as: 'identity_submitter'
  });
  Average.belongsTo(Industry, {
    foreignKey: 'identity_industry_id',
    targetKey: '_id',
    as: 'identity_industry'
  });
  /** UNIVERSITY */
  Average.belongsTo(UniversityUser, {
    foreignKey: 'uni_receiver_id',
    targetKey: '_id',
    as: 'uni_receiver'
  });
  Average.belongsTo(UniversityUser, {
    foreignKey: 'uni_submitter_id',
    targetKey: '_id',
    as: 'uni_submitter'
  });
  Average.belongsTo(UniversitySubject, {
    foreignKey: 'uni_subject_id',
    targetKey: '_id',
    as: 'uni_subject'
  });
  Average.belongsTo(UniversityTeam, {
    foreignKey: 'uni_team_id',
    targetKey: '_id',
    as: 'uni_team'
  });
  Average.belongsTo(UniversityTutorial, {
    foreignKey: 'uni_tutorial_id',
    targetKey: '_id',
    as: 'uni_tutorial'
  });
  Average.belongsTo(UniversityOrganisation, {
    foreignKey: 'uni_organisation_id',
    targetKey: '_id',
    as: 'uni_organisation'
  });
  /** REFERENCE */
  Average.belongsTo(ReferenceUser, {
    foreignKey: 'ref_receiver_id',
    targetKey: '_id',
    as: 'ref_receiver'
  });
  Average.belongsTo(ReferenceUser, {
    foreignKey: 'ref_submitter_id',
    targetKey: '_id',
    as: 'ref_submitter'
  });
  return Average;
}

export {
  Average,
  sync,
  assosciate
}
