import { Model, DataTypes, Sequelize } from 'sequelize';
import { User } from './User';
import { Subject } from './Subject';

class Team extends Model {
  [x: string]: any;

  // PK
  public teamID!: string;

  public teamName!: string;
  public inviteCode!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  
}

const sync = (sequelize: Sequelize) => {
  Team.init({
    'teamID': {
      'type': DataTypes.UUID,
      'defaultValue': DataTypes.UUIDV4,
      'primaryKey': true
    },
    'teamName': {
      'type': DataTypes.STRING,
      'allowNull': false
    },
    'inviteCode': {
      'type': DataTypes.STRING,
      'allowNull': false
    },
    'subjectID': {
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
  TeamUser = Team.belongsToMany(User, { through: 'USER_TEAM', sourceKey: 'teamID', foreignKey: 'teamID' });
  TeamSubject = Team.belongsTo(Subject, { foreignKey: 'subjectID', targetKey: 'subjectID' });
  return Team;
}

export {
  sync,
  assosciate,
  TeamUser,
  TeamSubject,
  Team
}
