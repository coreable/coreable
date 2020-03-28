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
  description: 'This represents the API',
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
