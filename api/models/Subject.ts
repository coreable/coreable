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

import { Model, Sequelize, DataTypes, HasMany, BelongsToMany } from "sequelize";
import { Team } from "./Team";
// import { User } from "./User";
import { Manager } from "./Manager";
import { SubjectAverage } from "./SubjectAverage";
import { Review } from "./Review";

class Subject extends Model {
  // PK
  public _id!: string;
   
  public name!: string;
  public state!: number;
  public managers!: [Manager];
  public teams!: [Team];
  public reviews!: [Review];

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

const sync = (sequelize: Sequelize) => {
  Subject.init({
    '_id': {
      'type': DataTypes.UUID,
      'defaultValue': DataTypes.UUIDV4,
      'primaryKey': true
    },  
    'name': {
      'type': DataTypes.STRING,
      'allowNull': false
    },
    'state': {
      'type': DataTypes.INTEGER,
      'defaultValue': 1,
      'allowNull': false,
      'validate': {
        'min': 1,
        'max': 3
      }
    }
  }, {
    'tableName': 'SUBJECT',
    'sequelize': sequelize,
  });

  return Subject;
}

let SubjectTeam: HasMany<Subject, Team>;
let SubjectManager: BelongsToMany<Subject, Manager>;
let AverageSubject: HasMany<Subject, SubjectAverage>;
let SubjectReviews: HasMany<Subject, Review>;

const assosciate = () => {
  SubjectTeam = Subject.hasMany(Team, { sourceKey: '_id', foreignKey: 'subject_id', as: 'teams' });
  SubjectManager = Subject.belongsToMany(Manager, { through: 'MANAGER_SUBJECT', sourceKey: '_id', foreignKey: 'subject_id', as: 'managers' });
  AverageSubject = Subject.hasMany(SubjectAverage, { sourceKey: '_id', foreignKey: 'subject_id', as: 'averages' });
  SubjectReviews = Subject.hasMany(Review, { sourceKey: '_id', foreignKey: 'subject_id', as: 'reviews' });
  return Subject;
}

export {
  assosciate,
  sync,
  SubjectTeam,
  SubjectManager,
  AverageSubject,
  SubjectReviews,
  Subject
};
