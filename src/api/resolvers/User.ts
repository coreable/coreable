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
        type: new GraphQLObjectType({
          name: 'UserReviewSplit',
          fields: () => {
            return {
              'average': {
                type: ReviewResolver,
                resolve(reviews, args, context) {
                  const averageReview: any = {
                    calm: 0,
                    change: 0,
                    clearInstructions: 0,
                    cooperatively: 0,
                    crossTeam: 0,
                    distractions: 0,
                    easilyExplainsComplexIdeas: 0,
                    emotionalResponse: 0,
                    empathy: 0,
                    eyeContact: 0,
                    faith: 0,
                    influences: 0,
                    managesOwn: 0,
                    newIdeas: 0,
                    openToShare: 0,
                    positiveBelief: 0,
                    preventsMisunderstandings: 0,
                    proactive: 0,
                    resilienceFeedback: 0,
                    signifiesInterest: 0,
                    tone: 0,
                    verbalAttentiveFeedback: 0,
                    workDemands: 0
                  };
                  let counter = 0;
                  for (const review of reviews) {
                    averageReview.calm += review.calm;
                    averageReview.change += review.change;
                    averageReview.clearInstructions += review.clearInstructions;
                    averageReview.cooperatively += review.cooperatively;
                    averageReview.crossTeam += review.crossTeam;
                    averageReview.distractions += review.distractions;
                    averageReview.easilyExplainsComplexIdeas += review.easilyExplainsComplexIdeas;
                    averageReview.emotionalResponse += review.emotionalResponse;
                    averageReview.empathy += review.empathy;
                    averageReview.eyeContact += review.eyeContact;
                    averageReview.faith += review.faith;
                    averageReview.influences += review.influences;
                    averageReview.managesOwn += review.managesOwn;
                    averageReview.newIdeas += review.newIdeas;
                    averageReview.openToShare += review.openToShare;
                    averageReview.positiveBelief += review.positiveBelief;
                    averageReview.preventsMisunderstandings += review.preventsMisunderstandings;
                    averageReview.proactive += review.proactive;
                    averageReview.resilienceFeedback += review.resilienceFeedback;
                    averageReview.signifiesInterest += review.signifiesInterest;
                    averageReview.tone += review.tone;
                    averageReview.verbalAttentiveFeedback += review.verbalAttentiveFeedback;
                    averageReview.workDemands += review.workDemands;
                    counter++;
                  }
                  for (const key in averageReview) {
                    averageReview[key] = averageReview[key] / counter;
                  }
                  return averageReview;
                }
              },
              'default': {
                type: new GraphQLList(ReviewResolver),
                resolve(reviews, args, context) {
                  return reviews;
                }
              }
            }
          }
        }),
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
