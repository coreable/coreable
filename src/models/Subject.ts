import { Model, Sequelize, DataTypes } from "sequelize";
import { Team } from "./Team";
import { User } from "./User";
import { Manager } from "./Manager";

class Subject extends Model {
  // PK
  public subjectID!: string;
  public subjectName!: string;
  public state!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

const sync = (sequelize: Sequelize) => {
  Subject.init({
    'subjectID': {
      'type': DataTypes.UUID,
      'defaultValue': DataTypes.UUIDV4,
      'primaryKey': true
    },
    'subjectName': {
      'type': DataTypes.STRING,
      'allowNull': false
    }
  }, {
    'tableName': 'SUBJECT',
    'sequelize': sequelize
  });

  return Subject;
}

let SubjectTeam;
let SubjectManager;
const assosciate = () => {
  SubjectTeam = Subject.hasMany(Team, { sourceKey: 'subjectID', foreignKey: 'subjectID' });
  SubjectManager = Subject.belongsToMany(Manager, { through: 'MANAGER_SUBJECT', sourceKey: 'subjectID', foreignKey: 'subjectID' });
  return Subject;
}

export {
  assosciate,
  sync,
  SubjectTeam,
  SubjectManager,
  Subject,
};
