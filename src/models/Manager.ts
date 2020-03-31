import { Model, Sequelize, DataTypes } from "sequelize";
import { Subject } from "./Subject";
import { Billing } from "./Billing";
import { generatePasswordHash, checkPassword } from "../lib/hash";

class Manager extends Model {
  // PK
  public managerID!: string;

  public email!: string;
  public firstName!: string;
  public lastName!: string;
  public password!: string;
  public passwordResetToken!: string;
  public passwordResetExpiry!: Date

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public login: ((payload: string) => Promise<boolean>) | undefined;
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
      'allowNull': false
    },
    'lastName': {
      'type': DataTypes.STRING,
      'allowNull': false
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
    }
  }, {
    'tableName': 'MANAGER',
    'sequelize': sequelize,
  });

  // Hooks
  Manager.beforeCreate(async (manager: Manager) => {
    try {
      manager.password = await generatePasswordHash(manager.password);
    } catch (err) {
      throw err;
    }
  });

  Manager.prototype.login = async function(payload: string) {
    return checkPassword(payload, this.password);
  }

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