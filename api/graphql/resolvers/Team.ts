import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLFloat
} from 'graphql';

import { Team } from '../../models/Team';
import { SubjectResolver } from './Subject';
import { UserResolver } from './User';
import { ReviewResolver } from './Review';

export const TeamResolver: GraphQLObjectType<Team> = new GraphQLObjectType({
  name: 'TeamResolver',
  description: 'This represents a Team',
  fields: () => {
    return {
      '_id': {
        type: GraphQLString,
        resolve(team, args, context) {
          return team._id;
        }
      },
      'name': {
        type: GraphQLString,
        resolve(team, args, context) {
          return team.name;
        }
      },
      'inviteCode': {
        type: GraphQLString,
        resolve(team, args, context) {
          return team.inviteCode;
        }
      },
      'subject': {
        type: SubjectResolver,
        resolve(team, args, context) {
          return team.subject;
        }
      },
      'users': {
        type: new GraphQLList(UserResolver),
        resolve(team, args, context) {
          return team.users;
        }
      },
      'report': {
        type: new GraphQLObjectType({
          name: 'TeamAverageReport',
          fields: () => {
            return {
              'average': {
                type: ReviewResolver,
                resolve(average, args, context) {
                  return average;
                }
              },
              'sorted': {
                type: new GraphQLList(new GraphQLObjectType({
                  name: 'TeamSortedAverageArray',
                  fields: () => {
                    return {
                      'field': {
                        type: GraphQLString,
                        resolve(sortable, args, context) {
                          return sortable[0];
                        }
                      },
                      'value': {
                        type: GraphQLFloat,
                        resolve(sortable, args, context) {
                          return sortable[1];
                        }
                      }
                    }
                  }
                })),
                resolve(average, args, context) {
                  const sortable = [];
                  for (const field in average) {
                    sortable.push([field, average[field]]);
                  }
                  sortable.sort((a, b) => {
                    return a[1] - b[1]
                  });
                  return sortable;
                }
              }
            }
          }
        }),
        async resolve(team, args, context) {
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
          for (const user of team.users) {
            user.reviews = await (user as any).getReviews();
            for (const review of user.reviews) {
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
          }
          for (const key in averageReview) {
            averageReview[key] = averageReview[key] / counter;
          }
          return averageReview;
        }
      }
    }
  }
});
