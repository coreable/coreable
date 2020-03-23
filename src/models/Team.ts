import { Model, DataTypes, Sequelize } from 'sequelize';
import { User } from './User';
import { Group } from './Group';

export class Team extends Model {
  public userID!: number;
  public groupID!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const sync = (sequelize: Sequelize) => {
  Team.init({
    'userID': {
      'type': DataTypes.INTEGER.UNSIGNED,
      'allowNull': false
    },
    'groupID': {
      'type': DataTypes.INTEGER.UNSIGNED,
      'allowNull': false
    }
  }, {
    'tableName': 'TEAM',
    'sequelize': sequelize
  });

  return Team;
}

export const associate = () => {
  Team.belongsTo(User, { foreignKey: { name: 'userID', allowNull: false, field: 'userID' } });
  Team.belongsTo(Group, { foreignKey: { name: 'groupID', allowNull: false, field: 'groupID' } });

  return Team;
}
