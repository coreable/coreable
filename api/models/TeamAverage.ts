import { Model, Sequelize, DataTypes, BelongsTo } from "sequelize";
import { Team } from "./Team";

class TeamAverage extends Model {
  // PK
  public _id!: string;
  // FK
  public team_id!: string;
  public subject_id!: string;
  public industry_id!: string;

  public calm!: number;
  // public change!: number;
  public clearInstructions!: number;
  public cooperatively!: number;
  public crossTeam!: number;
  public distractions!: number;
  public easilyExplainsComplexIdeas!: number;
  // public emotionalResponse!: number;
  public empathy!: number;
  public eyeContact!: number;
  /* public faith!: number; */
  public influences!: number;
  public managesOwn!: number;
  public newIdeas!: number;
  public openToShare!: number;
  public positiveBelief!: number;
  /* public preventsMisunderstandings!: number; */
  public proactive!: number;
  public resilienceFeedback!: number;
  public signifiesInterest!: number;
  // public tone!: number;
  // public verbalAttentiveFeedback!: number;
  public workDemands!: number;  

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

const sync = (sequelize: Sequelize) => {
  TeamAverage.init({
    '_id': {
      'type': DataTypes.UUID,
      'defaultValue': DataTypes.UUIDV4,
      'primaryKey': true
    },
    'team_id': {
      type: DataTypes.UUID,
      allowNull: true
    },
    'empathy': {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    'managesOwn': {
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
    'easilyExplainsComplexIdeas': {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    'openToShare': {
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
  }, {
    'tableName': 'TEAM_AVERAGE',
    'sequelize': sequelize
  });

  return TeamAverage;
}

let AverageTeam: BelongsTo<TeamAverage, Team>;

const assosciate = () => {
  AverageTeam = TeamAverage.belongsTo(Team, { foreignKey: 'team_id', targetKey: '_id', as: 'team' });
  return TeamAverage;
}

export {
  sync,
  assosciate,
  AverageTeam,
  TeamAverage
}