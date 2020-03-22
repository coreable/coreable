import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../sequelize';
import { Industry } from './Industry'; 
import { Group } from './Group';
import { Team } from './Team';

import {
  generatePasswordHash,
  checkPassword
} from '../lib/hash';

export class User extends Model {
  public userID!: number;
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public industryID!: number;
  public cognitoID!: number;
  public password!: string;
  public JWT!: string;
  public root!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public logout: ((token: any) => Promise<void>) | undefined;
  public login: ((payload: string) => Promise<boolean>) | undefined;
}

export default User.init({
  'userID': {
    'type': DataTypes.INTEGER.UNSIGNED,
    'autoIncrement': true,
    'primaryKey': true
  },
  'firstName': {
    'type': DataTypes.STRING,
    'allowNull': false
  },
  'lastName': {
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
  'industryID': {
    'type': DataTypes.INTEGER.UNSIGNED,
    'allowNull': true
  },
  'cognitoID': {
    'type': DataTypes.STRING,
    'allowNull': true
  },
  'password': {
    'type': DataTypes.STRING,
    'allowNull': true
  },
  'root': {
    'type': DataTypes.BOOLEAN,
    'allowNull': true,
    'defaultValue': false
  }
}, {
  'tableName': 'USER',
  'sequelize': sequelize
});

User.belongsTo(Industry, { foreignKey: { name: 'industryID', allowNull: true, field: 'indusryID' } });

User.beforeCreate((user, options) => {
  return generatePasswordHash(user.password).then((hash) => {
    user.password = hash;
  }).catch((err) => {
    throw err
  });
});

User.prototype.login = async function(payload) {
  return checkPassword(payload, this.password);
}

User.prototype.logout = async function(token) {
  
}