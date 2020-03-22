import { sequelize } from '../../sequelize';
import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList
} from 'graphql';

import { IndustryResolver } from './Industry';
import { TeamResolver } from './Team';
import { ReviewResolver } from './Review';
import { User } from '../../models/User';

export const UserResolver: GraphQLObjectType<User> = new GraphQLObjectType({
  name: 'UserQuery',
  description: 'This represents a User',
  fields: () => {
    return {
      'userID': {
        type: GraphQLInt,
        resolve(user) {
          return user.userID;
        }
      },
      'firstName': {
        type: GraphQLString,
        resolve(user) {
          return user.firstName;
        }
      },
      'lastName': {
        type: GraphQLString,
        resolve(user) {
          return user.lastName;
        }
      },
      'email': {
        type: GraphQLString,
        resolve(user) {
          return user.email
        }
      },
      'industryID': {
        type: GraphQLInt,
        resolve(user) {
          return user.industryID;
        }
      },
      'cognitoID': {
        type: GraphQLString,
        resolve(user) {
          return user.cognitoID;
        }
      },
      'industry': {
        type: IndustryResolver,
        resolve(user: any) {
          return user.getIndustry();
        }
      },
      'team': {
        type: GraphQLList(TeamResolver),
        resolve(user: any) {
          return sequelize.models.Team.findAll({ where: { userID: user.dataValues.userID } });
        }
      },
      'reviewsFromPeers': {
        type: GraphQLList(ReviewResolver),
        resolve(user: any) {
          return sequelize.models.Review.findAll({ where: { subjectID: user.userID } });
        }
      },
      'reviewsForPeers': {
        type: GraphQLList(ReviewResolver),
        resolve(user: any) {
          return sequelize.models.Review.findAll({ where: { completedBy: user.userID } });
        }
      }
    }
  }
});