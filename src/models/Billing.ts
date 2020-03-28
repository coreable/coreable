import { Model, Sequelize, DataTypes } from "sequelize";
import { Manager } from "./Manager";

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
    'sequelize': sequelize
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
