import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean,
} from 'graphql';

import { User } from '../../models/User';
import { Manager } from '../../models/Manager';
import { TeamResolver } from './Team';
import { ReviewResolver } from './Review';
import { SubjectResolver } from './Subject';

export const UserResolver: GraphQLObjectType<User> = new GraphQLObjectType({
  name: 'UserResolver',
  description: 'This represents a User',
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
      'teams': {
        type: GraphQLList(TeamResolver),
        resolve(user: any, args, context) {
          if (user instanceof User) {
            return user.teams;
          }
          return null;
        }
      },
      'subjects': {
        type: new GraphQLList(SubjectResolver),
        resolve(user: any, args, context) {
          if (user instanceof Manager) {
            return user.subjects;
          }
          return null;
        }
      },
      'manager': {
        type: GraphQLBoolean,
        resolve(user: any, args, context) {
          return user instanceof Manager;
        }
      },
      'reviews': {
        type: new GraphQLList(ReviewResolver),
        resolve(user: any, args, context) {
          if (user instanceof User) {
            return user.reviews;
          }
          return null;
        }
      },
      'submissions': {
        type: new GraphQLList(ReviewResolver),
        resolve(user: any, args, context) {
          if (user instanceof User) {
            return user.submissions;
          }
          return null;
        }
      }
    }
  }
});
