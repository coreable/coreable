import { Model, Sequelize, DataTypes } from "sequelize";
import { Subject } from "./Subject";
import { Billing } from "./Billing";

class Manager extends Model {
  // PK
  public managerID!: string;

  public email!: string;
  public firstName!: string;
  public lastName!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

const sync = (sequelize: Sequelize) => {
  Manager.init({
    'managerID': {
      'type': DataTypes.UUID,
      'defaultValue': DataTypes.UUIDV4,
      'primaryKey': true
    },
    'email': {
      'type': DataTypes.STRING,
      'allowNull': false,
      'unique': true,
      'validate': {
        'isEmail': true
      }
    },
    'firstName': {
      'type': DataTypes.STRING,
    },
    'lastName': {
      'type': DataTypes.STRING,
    }
  }, {
    'tableName': 'MANAGER',
    'sequelize': sequelize
  });

  return Manager;
}

let ManagerSubject;
let ManagerBilling;
const assosciate = () => {
  ManagerSubject = Manager.belongsToMany(Subject, { through: 'MANAGER_SUBJECT', sourceKey: 'managerID', foreignKey: 'managerID' });
  // ManagerBilling = Manager.belongsToMany(Billing, { through: 'MANAGER_BILLING', sourceKey: 'managerID', foreignKey: 'managerID' });
  return Manager;
}

export {
  Manager,
  sync,
  assosciate,
  ManagerSubject,
  ManagerBilling
}