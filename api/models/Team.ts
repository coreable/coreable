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

import { Model, DataTypes, Sequelize, BelongsToMany, BelongsTo, HasMany } from 'sequelize';
import { User } from './User';
import { Subject } from './Subject';
import { TeamAverage } from './TeamAverage';

class Team extends Model {
  // PK
  public _id!: string;

  public name!: string;
  public inviteCode!: string;
  public subject_id!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public subject!: Subject;
  public users!: [User];
}

const sync = (sequelize: Sequelize) => {
  Team.init({
    '_id': {
      'type': DataTypes.UUID,
      'defaultValue': DataTypes.UUIDV4,
      'primaryKey': true
    },
    'name': {
      'type': DataTypes.STRING,
      'allowNull': false
    },
    'inviteCode': {
      'type': DataTypes.STRING,
      'allowNull': false
    },
    'subject_id': {
      'type': DataTypes.UUID,
      'allowNull': false
    }
  }, {
    'tableName': 'TEAM',
    'sequelize': sequelize,
  });

  return Team;
}

let TeamUser: BelongsToMany<Team, User>;
let TeamSubject: BelongsTo<Team, Subject>;
let AverageTeam: HasMany<Team, TeamAverage>;

const assosciate = () => {
  TeamUser = Team.belongsToMany(User, { through: 'USER_TEAM', sourceKey: '_id', foreignKey: 'team_id', as: 'users' });
  TeamSubject = Team.belongsTo(Subject, { targetKey: '_id', foreignKey: 'subject_id', as: 'subject' });
  AverageTeam = Team.hasMany(TeamAverage, { sourceKey: '_id', foreignKey: 'team_id', as: 'averages' });
  return Team;
}

export {
  sync,
  assosciate,
  TeamUser,
  TeamSubject,
  AverageTeam,
  Team
}
