import {
  GraphQLObjectType,
  GraphQLFloat,
  GraphQLString,
} from 'graphql';

import { Review } from '../../models/Review';
import { UserResolver } from './User';

export const ReviewResolver: GraphQLObjectType<Review> = new GraphQLObjectType({
  name: 'ReviewResolver',
  description: 'The representation of a Review',
  fields: () => {
    return {
      '_id': {
        type: GraphQLString,
        resolve(review, args, context) {
          return review._id;
        }
      },
      'receiver_id': {
        type: GraphQLString,
        resolve(review, args, context) {
          return review.receiver_id;
        }
      },
      'receiver': {
        type: UserResolver,
        resolve(review, args, context) {
          return review.receiver;
        }
      },
      'submitter_id': {
        type: GraphQLString,
        resolve(review, args, context) {
          return review.submitter_id;
        }
      },
      'submitter': {
        type: UserResolver,
        resolve(review, args, context) {
          return review.submitter;
        }
      },
      'emotionalResponse': {
        type: GraphQLFloat,
        resolve(review, args, context) {
          return review.emotionalResponse;
        }
      },
      'empathy': {
        type: GraphQLFloat,
        resolve(review, args, context) {
          return review.empathy;
        }
      },
      'managesOwn': {
        type: GraphQLFloat,
        resolve(review, args, context) {
          return review.managesOwn;
        }
      },
      'faith': {
        type: GraphQLFloat,
        resolve(review, args, context) {
          return review.faith;
        }
      },
      'cooperatively': {
        type: GraphQLFloat,
        resolve(review, args, context) {
          return review.cooperatively;
        }
      },
      'positiveBelief': {
        type: GraphQLFloat,
        resolve(review, args, context) {
          return review.positiveBelief;
        }
      },
      'calm': {
        type: GraphQLFloat,
        resolve(review, args, context) {
          return review.calm;
        }
      },
      'change': {
        type: GraphQLFloat,
        resolve(review, args, context) {
          return review.change;
        }
      },
      'newIdeas': {
        type: GraphQLFloat,
        resolve(review, args, context) {
          return review.newIdeas;
        }
      },
      'workDemands': {
        type: GraphQLFloat,
        resolve(review, args, context) {
          return review.workDemands;
        }
      },
      'proactive': {
        type: GraphQLFloat,
        resolve(review, args, context) {
          return review.proactive;
        }
      },
      'influences': {
        type: GraphQLFloat,
        resolve(review, args, context) {
          return review.proactive;
        }
      },
      'clearInstructions': {
        type: GraphQLFloat,
        resolve(review, args, context) {
          return review.proactive;
        }
      },
      'preventsMisunderstandings': {
        type: GraphQLFloat,
        resolve(review, args, context) {
          return review.preventsMisunderstandings;
        }
      },
      'easilyExplainsComplexIdeas': {
        type: GraphQLFloat,
        resolve(review, args, context) {
          return review.easilyExplainsComplexIdeas;
        }
      },
      'openToShare': {
        type: GraphQLFloat,
        resolve(review, args, context) {
          return review.openToShare;
        }
      },
      'tone': {
        type: GraphQLFloat,
        resolve(review, args, context) {
          return review.tone;
        }
      },
      'crossTeam': {
        type: GraphQLFloat,
        resolve(review, args, context) {
          return review.crossTeam;
        }
      },
      'resilienceFeedback': {
        type: GraphQLFloat,
        resolve(review, args, context) {
          return review.resilienceFeedback;
        }
      },
      'distractions': {
        type: GraphQLFloat,
        resolve(review, args, context) {
          return review.distractions;
        }
      },
      'eyeContact': {
        type: GraphQLFloat,
        resolve(review, args, context) {
          return review.eyeContact;
        }
      },
      'signifiesInterest': {
        type: GraphQLFloat,
        resolve(review, args, context) {
          return review.signifiesInterest;
        }
      },
      'verbalAttentiveFeedback': {
        type: GraphQLFloat,
        resolve(review, args, context) {
          return review.verbalAttentiveFeedback;
        }
      }
    }
  }
});