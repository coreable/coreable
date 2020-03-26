import { Model, DataTypes, Sequelize } from 'sequelize';
import {
  generatePasswordHash,
  checkPassword
} from '../lib/hash';

import { Group } from './Group';
import { Review } from './Review';
import { Industry } from './Industry';
import { Team } from './Team';

export class User extends Model {
  public userID!: number;
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public industryID!: number;
  public password!: string;
  public root!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public logout: ((token: any) => Promise<void>) | undefined;
  public login: ((payload: string) => Promise<boolean>) | undefined;
}

export const sync = (sequelize: Sequelize) => {
  User.init({
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
      'allowNull': true,
      'references': {
        'model': Industry, 
        'key': 'industryID'
      }
    },
    'password': {
      'type': DataTypes.STRING,
      'allowNull': true,
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

  // Hooks
  User.beforeCreate(async (user: User) => {
    return await generatePasswordHash(user.password).then((hash) => {
      user.password = hash;
    }).catch((err) => {
      throw err
    });
  });

  User.prototype.login = async function(payload: string) {
    return checkPassword(payload, this.password);
  }

  return User;
}

export const assosciate = () => {
  User.belongsTo(Industry, { foreignKey: { name: 'industryID', allowNull: true, field: 'industryID' } });
  User.belongsToMany(Group, { through: Team, foreignKey: 'userID' });
  User.hasMany(Team, { foreignKey: 'userID' });
  User.hasMany(Review, { foreignKey: 'subjectID' });
  User.hasMany(Review, { foreignKey: 'completedByID' });

  return User;
}