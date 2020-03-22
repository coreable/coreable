import { sequelize } from '../../sequelize';
import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList
} from 'graphql';

import { UserResolver } from './User';
import { TeamResolver } from './Team';
import { Session } from '../../models/Session';

export const SessionResolver: GraphQLObjectType<Session> = new GraphQLObjectType({
  name: 'SessionQuery',
  description: 'This represents a Group',
  fields: () => {
    return {
      'expiresAt': {
        type: GraphQLString,
        resolve(session) {
          return session.expiresAt;
        }
      },
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
