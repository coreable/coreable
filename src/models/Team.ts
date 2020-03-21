import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../sequelize';
import { User } from './User';
import { Group } from './Group';

export class Team extends Model {
  public userID!: number;
  public groupID!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default Team.init({
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

// Relations
Team.hasOne(User, { sourceKey: 'userID', foreignKey: 'userID' });
Team.hasOne(Group, { sourceKey: 'groupID', foreignKey: 'groupID' });
