import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
} from 'graphql';

import { JsonWebToken } from '../../../models/JsonWebToken';

export const JsonWebTokenResolver: GraphQLObjectType<JsonWebToken> = new GraphQLObjectType({
  name: 'JsonWebTokenResolver',
  description: 'This represents a JsonWebToken',
  fields: () => {
    return {
      'token': {
        type: GraphQLString,
        resolve(session) {
          return session.token;
        }
      },
      'userID': {
        type: GraphQLInt,
        resolve(session) {
          return session.userID;
        }
      }
    }
  }
});
