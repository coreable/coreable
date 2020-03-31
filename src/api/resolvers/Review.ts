import { sequelize } from '../../lib/sequelize';
import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
} from 'graphql';

import { Review } from '../../models/Review';
import { UserResolver } from './User';

export const ReviewResolver: GraphQLObjectType<Review> = new GraphQLObjectType({
  name: 'ReviewResolver',
  description: 'The representation of a Review',
  fields: () => {
    return {
      'reviewID': {
        type: GraphQLString,
        resolve(review, args, context) {
          return review.reviewID;
        }
      },
      'userID': {
        type: GraphQLString,
        resolve(review, args, context) {
          return review.userID;
        }
      },
      'user': {
        type: UserResolver,
        resolve(review, args, context) {
          return review.User;
        }
      },
      'submittedByID': {
        type: GraphQLString,
        resolve(review, args, context) {
          return review.submittedByID;
        }
      },
      'submittedBy': {
        type: UserResolver,
        resolve(review, args, context) {
          return review.SubmittedBy;
        }
      },
      'emotionalResponse': {
        type: GraphQLInt,
        resolve(review, args, context) {
          return review.emotionalResponse;
        }
      },
      'empathy': {
        type: GraphQLInt,
        resolve(review, args, context) {
          return review.empathy;
        }
      },
      'managesOwn': {
        type: GraphQLInt,
        resolve(review, args, context) {
          return review.managesOwn;
        }
      },
      'faith': {
        type: GraphQLInt,
        resolve(review, args, context) {
          return review.faith;
        }
      },
      'cooperatively': {
        type: GraphQLInt,
        resolve(review, args, context) {
          return review.cooperatively;
        }
      },
      'positiveBelief': {
        type: GraphQLInt,
        resolve(review, args, context) {
          return review.positiveBelief;
        }
      },
      'calm': {
        type: GraphQLInt,
        resolve(review, args, context) {
          return review.calm;
        }
      },
      'change': {
        type: GraphQLInt,
        resolve(review, args, context) {
          return review.change;
        }
      },
      'newIdeas': {
        type: GraphQLInt,
        resolve(review, args, context) {
          return review.newIdeas;
        }
      },
      'workDemands': {
        type: GraphQLInt,
        resolve(review, args, context) {
          return review.workDemands;
        }
      },
      'proactive': {
        type: GraphQLInt,
        resolve(review, args, context) {
          return review.proactive;
        }
      },
      'influences': {
        type: GraphQLInt,
        resolve(review, args, context) {
          return review.proactive;
        }
      },
      'clearInstructions': {
        type: GraphQLInt,
        resolve(review, args, context) {
          return review.proactive;
        }
      },
      'preventsMisunderstandings': {
        type: GraphQLInt,
        resolve(review, args, context) {
          return review.preventsMisunderstandings;
        }
      },
      'easilyExplainsComplexIdeas': {
        type: GraphQLInt,
        resolve(review, args, context) {
          return review.easilyExplainsComplexIdeas;
        }
      },
      'openToShare': {
        type: GraphQLInt,
        resolve(review, args, context) {
          return review.openToShare;
        }
      },
      'tone': {
        type: GraphQLInt,
        resolve(review, args, context) {
          return review.tone;
        }
      },
      'crossTeam': {
        type: GraphQLInt,
        resolve(review, args, context) {
          return review.crossTeam;
        }
      },
      'distractions': {
        type: GraphQLInt,
        resolve(review, args, context) {
          return review.distractions;
        }
      },
      'eyeContact': {
        type: GraphQLInt,
        resolve(review, args, context) {
          return review.eyeContact;
        }
      },
      'signifiesInterest': {
        type: GraphQLInt,
        resolve(review, args, context) {
          return review.signifiesInterest;
        }
      },
      'verbalAttentiveFeedback': {
        type: GraphQLInt,
        resolve(review, args, context) {
          return review.verbalAttentiveFeedback;
        }
      }
    }
  }
});