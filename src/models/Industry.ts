import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../sequelize';
import { User } from './User';

export class Industry extends Model {
  public industryID!: number;
  public industryName!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default Industry.init({
  'industryID': {
    'type': DataTypes.INTEGER.UNSIGNED,
    'autoIncrement': true,
    'primaryKey': true,
  },
  'industryName': {
    'type': DataTypes.STRING,
    'allowNull': false,
    'unique': true
  }
}, {
  'tableName': 'INDUSTRY',
  'sequelize': sequelize
});
