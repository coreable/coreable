import { sequelize } from '../../lib/sequelize';
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
import { Op } from 'sequelize';
import { Team } from '../../models/Team';
import { Review } from '../../models/Review';

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
      },
      'pending': {
        type: new GraphQLList(UserResolver),
        async resolve(user, args, context) {
          if (user instanceof Manager) {
            return null;
          }
          // put all team members in a map
          let teamMembers: any = {};
          for (const teams of user.teams) {
            teams.users = await (teams as any).getUsers();
            for (const users of teams.users) {
              if (!teamMembers[users._id]) {
                teamMembers[users._id] = false;
              }
            }
          }
          // set the map value to true if we've reviewed them
          let reviews = await sequelize.models.Review.noCache().findAll({ where: { submitter_id: user._id } });
          for (const review of reviews) {
            if (teamMembers[review.receiver_id]) {
              teamMembers[review.receiver_id] = true;
            }
          }
          // if the map value is false, push the user ID to an array
          let pendingMemberIDs: string[] = [];
          for (const userID in teamMembers) {
            if (teamMembers[userID] !== true) {
              pendingMemberIDs.push(userID);
            }
          }
          return sequelize.models.User.findAll(
            {
              where: { _id: { [Op.in]: pendingMemberIDs } },
              include: [
                { model: Team, as: 'teams' },
                { model: Review, as: 'reviews', exclude: ['submitter_id'] },
                { model: Review, as: 'submissions', exclude: ['receiver_id'] }
              ]
            }
          );
        },
        'reflection': {
          type: ReviewResolver,
          resolve(user: any, args: any, context: any) {
            return sequelize.models.Review.findOne({ where: { submitter_id: user._id, receiver_id: user._id, state: 1 }});
          }
        }
      }
    }
  }
});
