import { Model, DataTypes, Sequelize } from 'sequelize';
import { sequelize } from '../lib/sequelize';
import { User } from './User';
import { Industry } from './Industry';

export class Group extends Model {
  public groupID!: number;
  public groupName!: string;
  public groupLeaderID!: number;
  public inviteCode!: string;
  public industryID!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default (sequelize: Sequelize) => {
  Group.init({
    'groupID': {
      'type': DataTypes.INTEGER.UNSIGNED,
      'primaryKey': true,
      'autoIncrement': true
    },
    'groupName': {
      'type': DataTypes.STRING,
      'allowNull': false
    },
    'groupLeaderID': {
      'type': DataTypes.INTEGER.UNSIGNED,
      'allowNull': false,
    },
    'inviteCode': {
      'type': DataTypes.STRING,
      'allowNull': false,
    },
    'industryID': {
      'type': DataTypes.INTEGER.UNSIGNED,
      'allowNull': false
    }
  }, {
    'tableName': 'GROUP',
    'sequelize': sequelize
  });

  // Relations
  Group.belongsTo(Industry, { foreignKey: { name: 'industryID', allowNull: false, field: 'industryID' }});
  Group.belongsTo(User, { foreignKey: { name: 'groupLeaderID', allowNull: false, field: 'userID' } });
  
  return Group;
}
