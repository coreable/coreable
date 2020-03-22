import { sequelize } from '../../lib/sequelize';
import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString
} from 'graphql';

import { Industry } from '../../models/Industry';

export const IndustryResolver: GraphQLObjectType<Industry> = new GraphQLObjectType({
  name: 'IndustryQuery',
  description: 'This represents an Industry',
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