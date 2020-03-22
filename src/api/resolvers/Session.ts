import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
} from 'graphql';

import { Session } from '../../models/Session';

export const SessionResolver: GraphQLObjectType<Session> = new GraphQLObjectType({
  name: 'SessionResolver',
  description: 'This represents a Group',
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
