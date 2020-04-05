import { sequelize } from '../../lib/sequelize';
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} from 'graphql';

import { User } from '../../models/User';
import { Manager } from '../../models/Manager';
import { TeamResolver } from './Team';
import { ReviewResolver } from './Review';
import { Op } from 'sequelize';
import { Team } from '../../models/Team';
import { Subject } from '../../models/Subject';

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
          if (context.USER._id === user._id || context.USER instanceof Manager) {
            return user.teams;
          }
          return null;
        }
      },
      'reviews': {
        type: new GraphQLList(ReviewResolver),
        async resolve(user: any, args, context) {
          if (context.USER._id === user._id || context.USER instanceof Manager) {
            user.reviews = await sequelize.models.Review.findAll({ exclude: ['submitter_id'], where: { receiver_id: user._id, submitter_id: { [Op.not]: user._id } } });
            return user.reviews;
          }
          return null;
        }
      },
      'submissions': {
        type: new GraphQLList(ReviewResolver),
        async resolve(user: any, args, context) {
          if (context.USER._id === user._id || context.USER instanceof Manager) {
            user.submissions = await sequelize.models.Review.findAll({ exclude: ['receiver_id'], where: { submitter_id: user._id, receiver_id: { [Op.not]: user._id } } });
            return user.submissions;
          }
          return null;
        }
      },
      'pending': {
        type: new GraphQLList(UserResolver),
        async resolve(user, args, context) {
          // if the user retrieved is not the logged in user
          // and the logged in user is not manager
          // or the user being retrieved is a manager
          if ((context.USER._id !== user._id &&
            !(context.USER instanceof Manager)) ||
            user instanceof Manager) {
            return null;
          }

          // add all the users team members id's to a map
          const teams = await (user as any).getTeams({ model: Team, include: [{ model: Subject, as: 'subject' }, { model: User, as: 'users' }], exclude: ['inviteCode'] });
          let teamMembers: any = {};
          for (const team of teams) {
            for (const member of team.users) {
              if (!teamMembers[member._id]) {
                teamMembers[member._id] = member._id;
              }
            }
          }

          // if the user has reviewed a team member in the map
          // set the team members value to true
          const reviews = await sequelize.models.Review.findAll({ where: { submitter_id: user._id } });
          for (const review of reviews) {
            if (teamMembers[review.receiver_id]) {
              teamMembers[review.receiver_id] = true;
            }
          }

          // if the team member in a map isn't true
          // the team member hasnt been reviewed
          const pending = [];
          for (const member in teamMembers) {
            if (teamMembers[member] !== true) {
              pending.push(member);
            }
          }

          // return all the users needing review
          return sequelize.models.User.findAll(
            {
              where: { _id: { [Op.in]: pending } },
              include: [{ model: Team, as: 'teams', exclude: ['inviteCode'] }]
            }
          );
        }
      },
      'reflection': {
        type: ReviewResolver,
        async resolve(user: any, args: any, context: any) {
          user.reflection = await sequelize.models.Review.findOne({ where: { receiver_id: user._id, submitter_id: user._id } });
          if (!user.reflection) {
            return null;
          }
          return user.reflection;
        }
      }
    }
  }
});
