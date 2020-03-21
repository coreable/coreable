import { Model, DataTypes, literal } from 'sequelize';
import { sequelize } from '../sequelize';
import { Industry } from './Industry'; 

export class User extends Model {
  public userID!: number;
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public industryID!: number;
  public cognitoID!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
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
    'validate': {
      'isEmail': true
    }
  },
  'industryID': {
    'type': DataTypes.INTEGER.UNSIGNED,
    'allowNull': false
  },
  'cognitoID': {
    'type': DataTypes.STRING,
    'allowNull': false
  }
}, {
  'tableName': 'USER',
  'sequelize': sequelize
});

// Relations
User.hasOne(Industry, { sourceKey: 'industryID', foreignKey: 'industryID' });
