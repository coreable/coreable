import { sequelize } from '../../sequelize';
import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList
} from 'graphql';

import { IndustryResolver } from './Industry';
import { TeamResolver } from './Team';

export const UserResolver: GraphQLObjectType = new GraphQLObjectType({
  name: 'User',
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
        resolve(user) {
          return user.getIndustry();
        }
      },
      'team': {
        type: GraphQLList(TeamResolver),
        resolve(user) {
          return sequelize.models.Team.findAll({ where: { userID: user.dataValues.userID } });
        }
      }
    }
  }
});