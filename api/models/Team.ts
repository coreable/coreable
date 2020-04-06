import { Model, DataTypes, Sequelize } from 'sequelize';
import { User } from './User';
import { Subject } from './Subject';

class Team extends Model {
  // PK
  public _id!: string;

  public name!: string;
  public inviteCode!: string;
  public subject_id!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public subject!: Subject;
  public users!: [User];
}

const sync = (sequelize: Sequelize) => {
  Team.init({
    '_id': {
      'type': DataTypes.UUID,
      'defaultValue': DataTypes.UUIDV4,
      'primaryKey': true
    },
    'name': {
      'type': DataTypes.STRING,
      'allowNull': false
    },
    'inviteCode': {
      'type': DataTypes.STRING,
      'allowNull': false
    },
    'subject_id': {
      'type': DataTypes.UUID,
      'allowNull': false
    }
  }, {
    'tableName': 'TEAM',
    'sequelize': sequelize,
  });

  return Team;
}

let TeamUser;
let TeamSubject;
const assosciate = () => {
  TeamUser = Team.belongsToMany(User, { through: 'USER_TEAM', sourceKey: '_id', foreignKey: 'team_id', as: 'users' });
  TeamSubject = Team.belongsTo(Subject, { targetKey: '_id', foreignKey: 'subject_id', as: 'subject' });
  return Team;
}

export {
  sync,
  assosciate,
  TeamUser,
  TeamSubject,
  Team
}
