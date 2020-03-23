import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
} from 'graphql';

import { Session } from '../../models/Session';

export const JsonWebTokenResolver: GraphQLObjectType<Session> = new GraphQLObjectType({
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
