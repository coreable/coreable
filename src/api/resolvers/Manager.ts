import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
} from 'graphql';

import { Manager } from '../../models/Manager';
import { SubjectResolver } from './Subject';

export const ManagerResolver: GraphQLObjectType<Manager> = new GraphQLObjectType({
  name: 'ManagerResolver',
  description: 'This represents a Manger',
  fields: () => {
    return {
      '_id': {
        type: GraphQLString,
        resolve(user, args, context) {
          return user._id;
        }
      },
      'firstName': {
        type: GraphQLString,
        resolve(user, args, context) {
          return user.firstName;
        }
      },
      'lastName': {
        type: GraphQLString,
        resolve(user, args, context) {
          return user.lastName;
        }
      },
      'email': {
        type: GraphQLString,
        resolve(user, args, context) {
          return user.email
        }
      },
      'subjects': {
        type: new GraphQLList(SubjectResolver),
        async resolve(user: any, args, context) {
          if (context.USER._id === user._id || context.USER instanceof Manager) {
            return user.subjects;
          }
        }
      },
    }
  }
});

