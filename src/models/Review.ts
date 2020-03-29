import { Model, DataTypes, Sequelize } from 'sequelize';
import { User } from './User';

class Review extends Model {
  // PK
  public reviewID!: string;
  // FK
  public userID!: string;
  public submittedByID!: string;

  public emotionalResponse!: number;
  public empathy!: number;
  public managesOwn!: number;
  public faith!: number;
  public cooperatively!: number;
  public positiveBelief!: number;
  public resilienceFeedback!: number;
  public calm!: number;
  public change!: number;
  public newIdeas!: number;
  public workDemands!: number;
  public proactive!: number;
  public influences!: number;
  public clearInstructions!: number;
  public preventsMisunderstandings!: number;
  public easilyExplainsComplexIdeas!: number;
  public openToShare!: number;
  public tone!: number;
  public crossTeam!: number;
  public distractions!: number;
  public eyeContact!: number;
  public signifiesInterest!: number;
  public verbalAttentiveFeedback!: number;
  // ??????
  public stage!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

const sync = (sequelize: Sequelize) => {
  Review.init({
    'reviewID': {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    'userID': {
      type: DataTypes.UUID,
      allowNull: false
    },
    'submittedByID': {
      type: DataTypes.UUID,
      allowNull: false
    },
    'emotionalResponse': {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    'empathy': {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    'managesOwn': {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    'faith': {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    'cooperatively': {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    'positiveBelief': {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    'resilienceFeedback': {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    'calm': {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    'change': {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    'newIdeas': {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    'workDemands': {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    'proactive': {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    'influences': {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    'clearInstructions': {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    'preventsMisunderstandings': {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    'easilyExplainsComplexIdeas': {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    'openToShare': {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    'tone': {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    'crossTeam': {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    'distractions': {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    'eyeContact': {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    'signifiesInterest': {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    'verbalAttentiveFeedback': {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    'stage': {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    }
  }, {
    'tableName': 'REVIEW',
    'sequelize': sequelize
  });

  return Review;
}

let ReviewResultsUser;
let ReviewSubmittedUser;
const assosciate = () => {
  ReviewResultsUser = Review.belongsTo(User, { foreignKey: 'userID', targetKey: 'userID', as: 'ReviewResults' });
  ReviewSubmittedUser = Review.belongsTo(User, { foreignKey: 'submittedByID', targetKey: 'userID', as: 'ReviewSubmitted' });
  return Review;
}

export {
  sync,
  assosciate,
  ReviewResultsUser,
  ReviewSubmittedUser,
  Review,
};