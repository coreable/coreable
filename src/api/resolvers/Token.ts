import { sequelize } from '../../lib/sequelize';
import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
} from 'graphql';

import { Token } from '../../models/Token';

export const TokenResolver: GraphQLObjectType<Token> = new GraphQLObjectType({
  name: 'TokenResolver',
  description: 'This represents a Token',
  fields: () => {
    return {
      'token': {
        type: GraphQLString,
        resolve(session, args, context) {
          return session.token;
        }
      }
    }
  }
});
