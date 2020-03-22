import { sequelize } from '../../sequelize';
import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} from 'graphql';

import { Review } from '../../models/Review';

export const ReviewResolver: GraphQLObjectType<Review> = new GraphQLObjectType({
  name: 'ReviewQuery',
  description: 'The representation of a Review',
  fields: () => {
    return {
      'reviewID': {
        type: GraphQLInt,
        resolve(review) {
          return review.reviewID;
        }
      },
      'subjectID': {
        type: GraphQLInt,
        resolve(review) {
          return review.subjectID;
        }
      },
      'completedBy': {
        type: GraphQLInt,
        resolve(review) {
          return review.completedBy
        }
      },
      'emotionalResponse': {
        type: GraphQLInt,
        resolve(review) {
          return review.emotionalResponse;
        }
      },
      'empathy': {
        type: GraphQLInt,
        resolve(review) {
          return review.empathy;
        }
      },
      'managesOwn': {
        type: GraphQLInt,
        resolve(review) {
          return review.managesOwn;
        }
      },
      'faith': {
        type: GraphQLInt,
        resolve(review) {
          return review.faith;
        }
      },
      'cooperatively': {
        type: GraphQLInt,
        resolve(review) {
          return review.cooperatively;
        }
      },
      'positiveBelief': {
        type: GraphQLInt,
        resolve(review) {
          return review.positiveBelief;
        }
      },
      'calm': {
        type: GraphQLInt,
        resolve(review) {
          return review.calm;
        }
      },
      'change': {
        type: GraphQLInt,
        resolve(review) {
          return review.change;
        }
      },
      'newIdeas': {
        type: GraphQLInt,
        resolve(review) {
          return review.newIdeas;
        }
      },
      'workDemands': {
        type: GraphQLInt,
        resolve(review) {
          return review.workDemands;
        }
      },
      'proactive': {
        type: GraphQLInt,
        resolve(review) {
          return review.proactive;
        }
      },
      'influences': {
        type: GraphQLInt,
        resolve(review) {
          return review.proactive;
        }
      },
      'clearInstructions': {
        type: GraphQLInt,
        resolve(review) {
          return review.proactive;
        }
      },
      'preventsMisunderstandings': {
        type: GraphQLInt,
        resolve(review) {
          return review.preventsMisunderstandings;
        }
      },
      'easilyExplainsComplexIdeas': {
        type: GraphQLInt,
        resolve(review) {
          return review.easilyExplainsComplexIdeas;
        }
      },
      'openToShare': {
        type: GraphQLInt,
        resolve(review) {
          return review.openToShare;
        }
      },
      'tone': {
        type: GraphQLInt,
        resolve(review) {
          return review.tone;
        }
      },
      'crossTeam': {
        type: GraphQLInt,
        resolve(review) {
          return review.crossTeam;
        }
      },
      'distractions': {
        type: GraphQLInt,
        resolve(review) {
          return review.distractions;
        }
      },
      'eyeContact': {
        type: GraphQLInt,
        resolve(review) {
          return review.eyeContact;
        }
      },
      'signifiesInterest': {
        type: GraphQLInt,
        resolve(review) {
          return review.signifiesInterest;
        }
      },
      'verbalAttentiveFeedback': {
        type: GraphQLInt,
        resolve(review) {
          return review.verbalAttentiveFeedback;
        }
      }
    }
  }
});