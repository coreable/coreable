import { Model, Sequelize, DataTypes, BelongsTo } from "sequelize";
import { Team } from "./Team";

class SubjectAverage extends Model {
  // PK
  public _id!: string;
  // FK
  public team_id!: string;
  public subject_id!: string;
  public industry_id!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

const sync = (sequelize: Sequelize) => {
  SubjectAverage.init({
    '_id': {
      'type': DataTypes.UUID,
      'defaultValue': DataTypes.UUIDV4,
      'primaryKey': true
    },
    'subject_id': {
      type: DataTypes.UUID,
      allowNull: true
    },
    'emotionalResponse': {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    'empathy': {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    'managesOwn': {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    'faith': {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    'cooperatively': {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    'positiveBelief': {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    'resilienceFeedback': {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    'calm': {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    'change': {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    'newIdeas': {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    'workDemands': {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    'proactive': {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    'influences': {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    'clearInstructions': {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    'preventsMisunderstandings': {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    'easilyExplainsComplexIdeas': {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    'openToShare': {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    'tone': {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    'crossTeam': {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    'distractions': {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    'eyeContact': {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    'signifiesInterest': {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    'verbalAttentiveFeedback': {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    }
  }, {
    'tableName': 'SUBJECT_AVERAGE',
    'sequelize': sequelize
  });

  return SubjectAverage;
}

let AverageSubject: BelongsTo<SubjectAverage, Team>;

const assosciate = () => {
  AverageSubject = SubjectAverage.belongsTo(Team, { foreignKey: 'team_id', targetKey: '_id', as: 'team' });
  return SubjectAverage;
}

export {
  sync,
  assosciate,
  AverageSubject,
  SubjectAverage
}