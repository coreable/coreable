import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString
} from 'graphql';

import { Industry } from '../../models/Industry';

export const IndustryResolver: GraphQLObjectType<Industry> = new GraphQLObjectType({
  name: 'IndustryResolver',
  description: 'This represents an Industry',
  fields: () => {
    return {
      'industryID': {
        type: GraphQLInt,
        resolve(industry, args, context) {
          return industry.industryID;
        }
      },
      'industryName': {
        type: GraphQLString,
        resolve(industry, args, context) {
          return industry.industryName;
        }
      }
    }
  }
});