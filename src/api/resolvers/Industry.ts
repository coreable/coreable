import { sequelize } from '../../sequelize';
import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString
} from 'graphql';

export const IndustryResolver: GraphQLObjectType = new GraphQLObjectType({
  name: 'Industry',
  description: 'This represents a Industry',
  fields: () => {
    return {
      'industryID': {
        type: GraphQLInt,
        resolve(industry) {
          return industry.industryID;
        }
      },
      'industryName': {
        type: GraphQLString,
        resolve(industry) {
          return industry.industryName;
        }
      }
    }
  }
});