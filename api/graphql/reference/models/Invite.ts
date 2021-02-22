/*
  ===========================================================================
    Copyright (C) 2021 Coreable
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
import { User } from "../../identity/models/User";

import { ReferenceUser } from "./User";

class ReferenceInvite extends Model {
  // Primary Key
  public _id!: string;

  // Foreing Keys
  public requester_id!: string;

  // Relationships
  public requester!: ReferenceUser;
  public invitee!: ReferenceUser;

  // Properties
  public name!: string;
  public relation!: string;
  public email!: string;
  public message!: string;
  public complete!: number; // 0 = FALSE; 1 = TRUE

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

const sync = (sequelize: Sequelize) => {
  ReferenceInvite.init({
    '_id': {
      'type': DataTypes.UUID,
      'defaultValue': DataTypes.UUIDV4,
      'primaryKey': true
    },
    'requester_id': {
      'type': DataTypes.UUID,
      'allowNull': false
    },
    'name': {
      'type': DataTypes.STRING,
      'allowNull': false
    },
    'relation': {
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
    'message': {
      'type': DataTypes.STRING,
      'allowNull': false
    },
    'complete': {
      'type': DataTypes.INTEGER,
      'allowNull': false,
      'defaultValue': 0
    }
  }, {
    'tableName': 'REFERENCE_INVITE',
    'sequelize': sequelize,
  });

  return ReferenceInvite;
}

const assosciate = () => {
  // receiver
  ReferenceInvite.belongsTo(ReferenceUser, {
    targetKey: '_id',
    foreignKey: 'requester_id',
    as: 'requester'
  });
  // submitter
  ReferenceInvite.belongsTo(User, {
    targetKey: 'email',
    foreignKey: 'email',
    as: 'invitee'
  });
  return ReferenceInvite;
}

export {
  ReferenceInvite,
  assosciate,
  sync
};
