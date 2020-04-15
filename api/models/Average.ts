import { Model, Sequelize, DataTypes, BelongsTo } from "sequelize";
import { Subject } from "./Subject";
import { Team } from "./Team";
import { Industry } from "./Industry";

class Average extends Model {
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
  Average.init({
    '_id': {
      'type': DataTypes.UUID,
      'defaultValue': DataTypes.UUIDV4,
      'primaryKey': true
    },
    'team_id': {
      type: DataTypes.UUID,
      allowNull: true
    },
    'subject_id': {
      type: DataTypes.UUID,
      allowNull: true
    },
    'industry_id': {
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
    'tableName': 'AVERAGE',
    'sequelize': sequelize
  });

  return Average;
}

let AverageSubject: BelongsTo<Average, Subject>;
let AverageTeam: BelongsTo<Average, Team>;
let AverageIndustry: BelongsTo<Average, Industry>;

const assosciate = () => {
  AverageSubject = Average.belongsTo(Subject, { foreignKey: 'subject_id', targetKey: '_id', as: 'subject' });
  AverageTeam = Average.belongsTo(Team, { foreignKey: 'team_id', targetKey: '_id', as: 'team' });
  AverageIndustry = Average.belongsTo(Industry, { foreignKey: 'industry_id', targetKey: '_id', as: 'industry' });
  return Average;
}

export {
  sync,
  assosciate,
  AverageSubject,
  AverageTeam,
  AverageIndustry,
  Average
}