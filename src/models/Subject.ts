import { Model, Sequelize, DataTypes } from "sequelize";
import { Team } from "./Team";
// import { User } from "./User";
import { Manager } from "./Manager";

class Subject extends Model {
  // PK
  public _id!: string;
   
  public name!: string;
  public state!: number;
  public managers!: [Manager];
  public teams!: [Team];

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

const sync = (sequelize: Sequelize) => {
  Subject.init({
    '_id': {
      'type': DataTypes.UUID,
      'defaultValue': DataTypes.UUIDV4,
      'primaryKey': true
    },
    'name': {
      'type': DataTypes.STRING,
      'allowNull': false
    },
    'state': {
      'type': DataTypes.INTEGER,
      'defaultValue': 1,
      'allowNull': false,
      'validate': {
        'min': 1,
        'max': 3
      }
    }
  }, {
    'tableName': 'SUBJECT',
    'sequelize': sequelize,
  });

  return Subject;
}

let SubjectTeam;
let SubjectManager;
const assosciate = () => {
  SubjectTeam = Subject.hasMany(Team, { sourceKey: '_id', foreignKey: 'subject_id', as: 'teams' });
  SubjectManager = Subject.belongsToMany(Manager, { through: 'MANAGER_SUBJECT', sourceKey: '_id', foreignKey: 'subject_id', as: 'managers' });
  return Subject;
}

export {
  assosciate,
  sync,
  SubjectTeam,
  SubjectManager,
  Subject,
};
