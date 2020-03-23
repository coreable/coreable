import { Model, DataTypes, Sequelize } from 'sequelize';
import { User } from './User';
import { Industry } from './Industry';
import { Team } from './Team';

export class Group extends Model {
  public groupID!: number;
  public groupName!: string;
  public groupLeaderID!: number;
  public inviteCode!: string;
  public industryID!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const sync = (sequelize: Sequelize) => {
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

  return Group;
}

export const assosciate = () => {
    Group.belongsTo(Industry, { foreignKey: { name: 'industryID', allowNull: false, field: 'industryID' }});
    Group.belongsTo(User, { foreignKey: { name: 'groupLeaderID', allowNull: false, field: 'userID' } });
    Group.belongsToMany(User, { through: Team, foreignKey: 'groupID' });
    
    return Group;
}