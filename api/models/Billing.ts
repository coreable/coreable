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

import { Model, Sequelize, DataTypes } from "sequelize";
// import { Manager } from "./Manager";

class Billing extends Model {
  // PK
  public bilingID!: string;

  public contactEmail!: string;
  public contactPhone!: string;
  public contactName!: string;
  public cycleStart!: Date;
  public cycleEnd!: Date;
  public negativeBalance!: number;
  public positiveBalance!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

const sync = (sequelize: Sequelize) => {
  Billing.init({
    'billingID': {
      'type': DataTypes.UUID,
      'defaultValue': DataTypes.UUIDV4,
      'primaryKey': true
    },
    'contactEmail': {
      'type': DataTypes.STRING,
      'allowNull': false,
      'validate': {
        'isEmail': false
      }
    },
    'contactPhone': {
      'type': DataTypes.STRING,
      'allowNull': false,
    },
    'contactName': {
      'type': DataTypes.STRING,
      'allowNull': false,
    },
    'cycleStart': {
      'type': DataTypes.DATE,
      'allowNull': false,
    },
    'cycleEnd': {
      'type': DataTypes.DATE,
      'allowNull': false,
    },
    'negativeBalance': {
      'type': DataTypes.NUMBER,
      'allowNull': false,
      'defaultValue': 0,
      'comment': 'The amount they owe(d) to us during the payment cycle'
    },
    'positiveBalance': {
      'type': DataTypes.NUMBER,
      'allowNull': false,
      'defaultValue': 0,
      'comment': 'The payment we recieved at the end of the payment cycle' 
    }
  }, {
    'tableName': 'BILLING',
    'sequelize': sequelize,
  });

  return Billing;
}

let BillingManager;
const assosciate = () => {
  // BillingManager = Billing.belongsToMany(Manager, { through: 'MANAGER_BILLING', sourceKey: 'billingID', foreignKey: 'billingID' });
  // return Billing;
}

export {
  Billing,
  sync,
  assosciate,
  BillingManager
}
