import { sequelize } from '../../lib/sequelize';
import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLFloat,
} from 'graphql';

import { API } from '../../models/API';

export const APIResolver: GraphQLObjectType<API> = new GraphQLObjectType({
  name: 'APIResolver',
  description: 'This an API test/query point',
  fields: () => {
    return {
      'time': {
        type: GraphQLFloat,
        resolve(API, args, context) {
          return API.time;
        }
      },
      'env': {
        type: GraphQLString,
        resolve(API, args, context) {
          return API.env;
        }
      }
    }
  }
});
