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
import { User } from "../../../identity/models/User";
import { ReferenceInvite } from "./Invite";

class ReferenceList extends Model {
  // Primary Key
  public _id!: string;

  // Foreing Keys
  public requester_id!: string;
  public reviewer_id!: string;
  public invite_id!: string;

  // Relationships
  public requester!: User;
  public reviewer!: User;
  public invite!: ReferenceInvite;

  // Properties
  public status!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

const sync = (sequelize: Sequelize) => {
  ReferenceList.init({
    '_id': {
      'type': DataTypes.UUID,
      'defaultValue': DataTypes.UUIDV4,
      'primaryKey': true
    },
    'requester_id': {
      'type': DataTypes.UUID,
      'allowNull': false
    },
    'reviewer_id': {
      'type': DataTypes.UUID,
      'allowNull': false
    },
    'invite_id': {
      'type': DataTypes.UUID,
      'allowNull': false
    },
    'status': {
      'type': DataTypes.INTEGER,
      'allowNull': false
    },
  }, {
    'tableName': 'REFERENCE_LIST',
    'sequelize': sequelize,
  });

  return ReferenceList;
}

const assosciate = () => {
  ReferenceList.belongsTo(User, {
    targetKey: 'requester_id',
    foreignKey: '_id',
    as: 'requester'
  });
  ReferenceList.belongsTo(User, {
    targetKey: 'reviewer_id',
    foreignKey: '_id',
    as: 'reviewer'
  });
  return ReferenceList;
}

export {
  ReferenceList,
  assosciate,
  sync
};
