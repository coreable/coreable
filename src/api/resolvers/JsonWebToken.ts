import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
} from 'graphql';

import { JsonWebToken } from '../../models/JsonWebToken';

export const JsonWebTokenResolver: GraphQLObjectType<JsonWebToken> = new GraphQLObjectType({
  name: 'JsonWebTokenResolver',
  description: 'This represents a JsonWebTokenResolver',
  fields: () => {
    return {
      'token': {
        type: GraphQLString,
        resolve(authorization) {
          return authorization.token;
        }
      },
      'userID': {
        type: GraphQLInt,
        resolve(authorization) {
          return authorization.userID;
        }
      }
    }
  }
});
