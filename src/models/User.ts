import { Model, DataTypes, Sequelize, BelongsToMany } from 'sequelize';
import {
  generatePasswordHash,
  checkPassword
} from '../lib/hash';
import { Team } from './Team';
import { Review } from './Review';

class User extends Model {
  // PK
  public _id!: string;

  public email!: string;
  public firstName!: string;
  public lastName!: string;
  public password!: string;
  public passwordResetToken!: string;
  public passwordResetExpiry!: Date

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public login: ((payload: string) => Promise<boolean>) | undefined;
  public teams!: [Team];
  public submissions!: [Review];
  public reviews!: [Review];
}

const sync = (sequelize: Sequelize) => {
  User.init({
    '_id': {
      'type': DataTypes.UUID,
      'defaultValue': DataTypes.UUIDV4,
      'primaryKey': true
    },
    'firstName': {
      'type': DataTypes.STRING,
      'allowNull': false
    },
    'lastName': {
      'type': DataTypes.STRING,
      'allowNull': false
    },
    'email': {
      'type': DataTypes.STRING,
      'allowNull': false,
      'unique': true,
      'validate': {
        'isEmail': true
      }
    },
    'password': {
      'type': DataTypes.STRING,
      'allowNull': true,
    },
    'passwordResetToken': {
      'type': DataTypes.STRING,
      'allowNull': true
    },
    'passwordResetExpiry': {
      'type': DataTypes.DATE,
      'allowNull': true
    }
  }, {
    'tableName': 'USER',
    'sequelize': sequelize
  });

  // Hooks
  User.beforeCreate(async (user: User) => {
    try {
      user.password = await generatePasswordHash(user.password);
    } catch (err) {
      throw err;
    }
  });

  User.prototype.login = async function(payload: string) {
    return checkPassword(payload, this.password);
  }

  return User;
}

let UserTeam: BelongsToMany<User, Team>;
let UserReviewResults;
let UserReviewSubmitted;
const assosciate = () => {
  UserTeam = User.belongsToMany(Team, { through: 'USER_TEAM', sourceKey: '_id', foreignKey: 'user_id', as: 'teams' });
  UserReviewResults = User.hasMany(Review, { sourceKey: '_id' ,foreignKey: 'receiver_id', as: 'reviews' });
  UserReviewSubmitted = User.hasMany(Review, { sourceKey: '_id', foreignKey: 'submitter_id', as: 'submissions' });
  return User;
}

export {
  User,
  sync,
  assosciate,
  UserTeam,
  UserReviewResults,
  UserReviewSubmitted
}